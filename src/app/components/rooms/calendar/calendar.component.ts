import { MatDatepickerModule } from '@angular/material/datepicker';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BookingService } from '../../../../services/booking/booking.service';

import { AuthService } from '../../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { RoomAvailabilityDto } from '../../../../model/room-availability-dto';
import { BookingDto } from '../../../../model/booking-dto';

const today = new Date();

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule],
})
export class CalendarComponent {

  @Input() roomId: number = 2;
  bookingRequest: BookingDto = {
    roomId: this.roomId,
    userId: null,
    checkInDate: new Date(),
    checkOutDate: new Date(),
    totalPrice: 0
  };
  bookingDate!: FormGroup;
  bookedDates: RoomAvailabilityDto[] = [];

  constructor(private router: Router, private bookingService: BookingService, private authService: AuthService) {}

  ngOnInit() {
    this.bookingDate = new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    });
    this.setUserIdFromAuth();
    this.getBookedDates();
  }

  setUserIdFromAuth() {
    const user = this.authService.getUser();
    if (user) {
      this.bookingRequest.userId = user.id;
    } else {
      console.error('Utente non autenticato');
    }
  }

  getBookedDates() {
    this.bookingService.getBookedDates().subscribe(
      (dates: RoomAvailabilityDto[]) => {
        this.bookedDates = dates;
      },
      (error) => {
        console.error('Errore durante il recupero delle date prenotate', error);
      }
    );
  }
  makeBooking() {
    if (this.bookingRequest.userId !== null && this.bookingDate.valid) { 
      this.bookingRequest.checkInDate = this.bookingDate.value.start;
      this.bookingRequest.checkOutDate = this.bookingDate.value.end;

      this.bookingService.makeBooking(this.bookingRequest).subscribe(
        (response) => {
          alert("Prenotazione effettuata con successo dal giorno " + this.bookingRequest.checkInDate + " al giorno " + this.bookingRequest.checkOutDate + "! Al prezzo totale di " + this.bookingRequest.totalPrice + "😁")
          console.log('Prenotazione effettuata con successo', response);
        },
        (error) => {
          console.error('Errore durante la prenotazione', error);
        }
      );
    } else {
      console.error('Impossibile effettuare la prenotazione. Utente non autenticato.');
      this.authService.openLoginModal();
    }
  }

  dateRangeValidator(minDate: Date, maxDate: Date) {
    return (control: AbstractControl<any, any>) => {
      const selectedDate = new Date(control.value);
      if (selectedDate < minDate || selectedDate > maxDate) {
        return { invalidDate: true };
      }
      return null;
    };
  } 

  dateFilter = (date: Date) => {
    if (date < new Date()) {
      return false;
    }
    return !this.bookedDates.some((bookedDate) => {
      return date >= new Date(bookedDate.checkInDate) && date <= new Date(bookedDate.checkOutDate);
    });
  };
}
