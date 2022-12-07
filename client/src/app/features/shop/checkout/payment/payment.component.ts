import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  @Output() paymentSubmitEvent: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  cardForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    number: ['', Validators.required],
    month: ['', Validators.required, Validators.min(1), Validators.max(12)],
    year: ['', Validators.required],
    cvv: ['', Validators.required, Validators.minLength(3)],
  });
  codForm: FormGroup = this.formBuilder.group({});
  submitted: boolean = false;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {
    this.paymentSubmitEvent.emit(true);
    this.submitted = true;
  }
}
