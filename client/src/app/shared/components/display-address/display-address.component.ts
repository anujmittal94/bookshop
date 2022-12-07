import { Component, Input, OnInit } from '@angular/core';
import { Address } from 'src/app/core/models/address.model';

@Component({
  selector: 'app-display-address',
  templateUrl: './display-address.component.html',
  styleUrls: ['./display-address.component.scss'],
})
export class DisplayAddressComponent implements OnInit {
  @Input() address?: Address;

  constructor() {}

  ngOnInit(): void {}
}
