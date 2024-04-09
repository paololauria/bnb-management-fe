import { Component, Input } from '@angular/core';
import { BookingDto } from '../../../../model/booking-dto';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../../../../services/booking/booking.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-booking-summary',
  templateUrl: './booking-summary.component.html',
  styleUrls: ['./booking-summary.component.css'],
})
export class BookingSummaryComponent {
  bookingId!: number;
  bookingRequest: BookingDto | null = null;

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    // Ottieni l'ID della prenotazione dai parametri dell'URL e carica i dettagli della prenotazione
    this.route.params.subscribe((params) => {
      this.bookingId = params['bookingId'];
      this.getBookingDetails(this.bookingId);
    });
  }

  // Ottieni i dettagli della prenotazione dal servizio di prenotazione
  getBookingDetails(bookingId: number) {
    this.bookingService.getBookingById(bookingId).subscribe(
      (booking: BookingDto) => {
        this.bookingRequest = booking;
      },
      (error) => {
        console.error(
          'Errore durante il recupero dei dettagli della prenotazione',
          error
        );
      }
    );
  }
}
