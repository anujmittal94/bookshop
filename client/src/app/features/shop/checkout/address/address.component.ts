import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/core/models/address.model';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  @Input() address?: Address;
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

  ngOnInit(): void {
    if (this.address) {
      this.addressForm.patchValue({
        first: this.address.first,
        last: this.address.last,
        mobile: this.address.mobile,
        address1: this.address.address1,
        address2: this.address.address2,
        city: this.address.city,
        state: this.address.state,
        address3: this.address.address3,
        pin: this.address.pin,
      });
    }
  }

  onSubmit(): void {
    let address: Address = this.addressForm.value;
    this.addressSubmitEvent.emit(address);
  }
}
