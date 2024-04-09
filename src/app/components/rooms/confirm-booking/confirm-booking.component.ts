import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookingDto } from '../../../../model/booking-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.component.html',
  styleUrls: ['./confirm-booking.component.css'],
})
export class ConfirmBookingComponent {
  @Input() bookingRequest!: BookingDto; // Input che riceve i dettagli della prenotazione da confermare
  @Output() confirmBookingEvent: EventEmitter<void> = new EventEmitter<void>(); // Output che emette un evento quando la prenotazione viene confermata

  showSpinner: boolean = false; // Flag che indica se mostrare lo spinner durante la conferma della prenotazione

  constructor(private router: Router) {}

  // Metodo chiamato quando viene confermata la prenotazione
  confirmBooking() {
    this.showSpinner = true; // Mostra lo spinner durante il processo di conferma

    // Simula un ritardo di 1 secondo prima di emettere l'evento di conferma
    setTimeout(() => {
      this.showSpinner = false; // Nasconde lo spinner dopo il ritardo
      this.confirmBookingEvent.emit(); // Emette l'evento per confermare la prenotazione
    }, 1000);
  }
}
