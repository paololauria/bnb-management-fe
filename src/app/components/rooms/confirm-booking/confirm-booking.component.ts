import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BookingDto } from '../../../../model/booking-dto';

@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.component.html',
  styleUrl: './confirm-booking.component.css'
})
export class ConfirmBookingComponent {
  @Input() bookingRequest!: BookingDto; 
  
  constructor() {}
}
