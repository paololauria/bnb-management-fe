import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookingDto } from '../../../../model/booking-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.component.html',
  styleUrls: ['./confirm-booking.component.css']
})
export class ConfirmBookingComponent {
  @Input() bookingRequest!: BookingDto;
  @Output() confirmBookingEvent: EventEmitter<void> = new EventEmitter<void>();

  showSpinner: boolean = false;

  constructor(private router: Router) {}

  confirmBooking() {
    this.showSpinner = true;

    setTimeout(() => {
      this.showSpinner = false;

      this.confirmBookingEvent.emit();
    }, 1000);
  }
}
