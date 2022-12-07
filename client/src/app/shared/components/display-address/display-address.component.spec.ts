import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAddressComponent } from './display-address.component';

describe('DisplayAddressComponent', () => {
  let component: DisplayAddressComponent;
  let fixture: ComponentFixture<DisplayAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
