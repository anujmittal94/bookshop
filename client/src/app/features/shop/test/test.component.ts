import { Component, OnInit } from '@angular/core';
import { PgsService } from 'src/app/core/services/pgs.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  options = {
    key: environment.razorpay, // Enter the Key ID generated from the Dashboard
    amount: '50000', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: 'INR',
    name: 'Acme Corp',
    description: 'Test Transaction',
    image: 'https://example.com/your_logo',
    order_id: '', //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    // callback_url: 'https://eneqd3r9zrjok.x.pipedream.net/',
    handler: function (response: any) {
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature);
    },
    prefill: {
      name: 'Gaurav Kumar',
      email: 'gaurav.kumar@example.com',
      contact: '9999999999',
    },
    notes: {
      address: 'Razorpay Corporate Office',
    },
    theme: {
      color: '#3399cc',
    },
  };

  constructor(private pgsService: PgsService) {}

  ngOnInit(): void {}

  rzp1: any;
  checkoutrp() {
    this.rzp1 = new this.pgsService.nativeWindow.Razorpay(this.options);
    this.rzp1.open();
  }
}
