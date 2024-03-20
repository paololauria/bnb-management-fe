import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BookingService } from '../../../../services/booking/booking.service';
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
    guestName: '',
    checkInDate: new Date(),
    checkOutDate: new Date()
  };
  bookingDate!: FormGroup;

  

  constructor(private bookingService: BookingService) {}
  ngOnInit() {
    // Inizializza il form
    this.bookingDate = new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    });
  }

  makeBooking() {
    if (this.bookingDate.valid) {
      this.bookingRequest.checkInDate = this.bookingDate.value.start;
      this.bookingRequest.checkOutDate = this.bookingDate.value.end;

      this.bookingService.makeBooking(this.bookingRequest).subscribe(
        (response) => {
          console.log('Prenotazione effettuata con successo', response);
        },
        (error) => {
          console.error('Errore durante la prenotazione', error);
        }
      );
    } else {
      console.error('Form non valido');
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
}