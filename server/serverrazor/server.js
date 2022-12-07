require("dotenv").config();

const Razorpay = require("razorpay");
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
//const { nanoid } = require("nanoid");

var razorpayInstance = new Razorpay({
  key_id: process.env.key,
  key_secret: process.env.secret,
});

function handleOrder(items) {
  return {
    amount: items.reduce(
      (total, item) => total + item.book.price * item.quantity,
      0
    ),
    currency: "INR",
    receipt: "random",
  };
}

const app = express();
const PORT = process.env.PORT || "4242";

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors({ origin: true, credentials: true }));

// var options = {
//   amount: 50000, // amount in the smallest currency unit
//   currency: "INR",
//   receipt: "order_rcptid_11",
// };
// instance.orders.create(options, function (err, order) {
//   console.log(order);
// });
//Inside app.js
// app.post("/createOrder2", (req, res) => {
//   // STEP 1:
//   const { amount, currency, receipt, notes } = req.body;

//   // STEP 2:
//   razorpayInstance.orders.create(
//     { amount, currency, receipt, notes },
//     (err, order) => {
//       //STEP 3 & 4:
//       if (!err) res.json(order);
//       else res.send(err);
//     }
//   );
// });

app.post("/createOrder", (req, res) => {
  // STEP 1:
  let options = handleOrder(req.body);
  const { amount, currency, receipt } = options;
  // STEP 2:
  razorpayInstance.orders.create(
    { amount, currency, receipt },
    (err, order) => {
      //STEP 3 & 4:
      if (!err) res.json(order);
      else res.send(err);
    }
  );
});

app.listen(PORT, () => {
  console.log("Server is Listening on Port ", PORT);
});
