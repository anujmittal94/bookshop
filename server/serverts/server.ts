import bodyParser from "body-parser";
import express from "express";

const cors = require("cors");
const app: express.Application = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

const stripe = require("stripe")(process.env.stripe_secret);

app.post("/checkout", async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
      shipping_address_collection: { allowed_countries: ["US", "CA"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "usd" },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
      ],
      line_items: req.body.items.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.book.title,
          },
          unit_amount: item.book.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `http://localhost:4200/shop/checkout/success`,
      cancel_url: `http://localhost:4200/shop/checkout/cancel`,
    });
    res.status(200).json(session);
  } catch (error) {
    next(error);
  }
});

app.listen(4242, () => console.log(`Listening on port ${4242}!`));
