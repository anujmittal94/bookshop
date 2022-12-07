import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/core/models/address.model';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  addressForm: FormGroup = this.formBuilder.group({
    first: ['', Validators.required],
    last: ['', Validators.required],
    mobile: ['', Validators.required],
    address1: ['', Validators.required],
    address2: [''],
    city: ['', Validators.required],
    state: ['', Validators.required],
    address3: [''],
    pin: ['', Validators.required],
  });

  @Output() addressSubmitEvent: EventEmitter<Address> =
    new EventEmitter<Address>();
  constructor(private formBuilder: FormBuilder) {}

  submitted: boolean = false;
  states: string[] = [
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Andaman and Nicobar Islands',
    'Chandigarh',
    'Dadra & Nagar Haveli and Daman & Diu',
    'Delhi',
    'Jammu and Kashmir',
    'Lakshadweep',
    'Puducherry',
    'Ladakh',
  ];

  ngOnInit(): void {}

  onSubmit(): void {
    let address: Address = {
      name:
        this.addressForm.controls['first'].value +
        ' ' +
        this.addressForm.controls['last'].value,
      mobile: this.addressForm.controls['mobile'].value,
      address:
        this.addressForm.controls['address1'].value +
        '\n' +
        this.addressForm.controls['address2'].value +
        '\n' +
        this.addressForm.controls['address3'].value,
      city: this.addressForm.controls['city'].value,
      state: this.addressForm.controls['state'].value,
      pin: this.addressForm.controls['pin'].value,
    };
    this.addressSubmitEvent.emit(address);
    this.submitted = true;
  }
}
