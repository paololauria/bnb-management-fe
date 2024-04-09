import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { BookingService } from '../../../../services/booking/booking.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { RoomAvailabilityDto } from '../../../../model/room-availability-dto';
import { BookingDto } from '../../../../model/booking-dto';
import { RoomsDto } from '../../../../model/rooms-dto';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  @Input() roomId: number = 2; // ID della stanza passato dall'elemento genitore
  @Input() roomDto: RoomsDto | null = null; // Dati della stanza passati dall'elemento genitore

  // Oggetto che rappresenta la prenotazione in corso
  bookingRequest: BookingDto = {
    roomName: '',
    roomId: this.roomId,
    userId: null,
    checkInDate: new Date(),
    checkOutDate: new Date(),
    totalPrice: 0,
    roomCover: '',
    bookingId: 0,
    maxGuestRoom: 0,
  };

  bookingDate!: FormGroup; // Form per la selezione delle date di check-in e check-out
  bookedDates: RoomAvailabilityDto[] = []; // Array delle date già prenotate per questa stanza
  showConfirmBooking: boolean = false; 

  constructor(
    private router: Router,
    private bookingService: BookingService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Inizializzazione del form per le date di check-in e check-out
    this.bookingDate = new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    });

    // Imposta l'ID dell'utente corrente dalla sessione di autenticazione
    this.setUserIdFromAuth();

    // Ottiene le date già prenotate per questa stanza
    this.getBookedDates();

    // Aggiorna il prezzo totale e il flag per la conferma della prenotazione quando cambiano le date selezionate
    this.bookingDate.valueChanges.subscribe(() => {
      this.calculateTotalPrice();
      this.bookingRequest.checkInDate = this.bookingDate.value.start;
      this.bookingRequest.checkOutDate = this.bookingDate.value.end;
      this.showConfirmBooking = this.bookingDate.valid;
    });
  }

  // Funzione chiamata quando la conferma della prenotazione viene inviata dal componente figlio
  confirmBookingFromChild() {
    this.makeBooking();
  }

  // Imposta l'ID dell'utente corrente dalla sessione di autenticazione
  setUserIdFromAuth() {
    const user = this.authService.getUser();
    if (user) {
      this.bookingRequest.userId = user.id;
    } else {
      console.log('Utente non autenticato');
    }
  }

  // Ottiene le date già prenotate per questa stanza
  getBookedDates() {
    this.bookingService.getBookedDates().subscribe(
      (dates: RoomAvailabilityDto[]) => {
        this.bookedDates = dates.filter((date) => date.roomId === this.roomId);
      },
      (error) => {
        console.error('Errore durante il recupero delle date prenotate', error);
      }
    );
  }

  // Funzione di filtro per disabilitare le date già prenotate nel calendario
  dateFilter = (date: Date) => {
    if (date < new Date()) {
      return false; // Disabilita le date passate
    }
    return !this.bookedDates.some((bookedDate) => {
      return (
        date >= new Date(bookedDate.checkInDate) &&
        date <= new Date(bookedDate.checkOutDate)
      );
    });
  };

  // Effettua la prenotazione
  makeBooking() {
    if (this.bookingRequest.userId !== null && this.bookingDate.valid) {
      this.bookingRequest.checkInDate = this.bookingDate.value.start;
      this.bookingRequest.checkOutDate = this.bookingDate.value.end;
      this.bookingRequest.roomId = this.roomId;

      this.bookingService.makeBooking(this.bookingRequest).subscribe(
        (response) => {
          this.router.navigate(['conferma-prenotazione', response.bookingId]);
        },
        (error) => {
          alert(
            'Non è possibile prenotare date passate o già prenotate! Riprova con date valide'
          );
          console.error('Errore durante la prenotazione', error);
        }
      );
    } else {
      console.error(
        'Impossibile effettuare la prenotazione. Utente non autenticato o dati di prenotazione non validi.'
      );
      this.authService.openLoginModal();
    }
  }

  // Validatore custom per verificare che la data selezionata sia compresa tra la data minima e massima
  dateRangeValidator(minDate: Date, maxDate: Date) {
    return (control: AbstractControl<any, any>) => {
      const selectedDate = new Date(control.value);
      if (selectedDate < minDate || selectedDate > maxDate) {
        return { invalidDate: true };
      }
      return null;
    };
  }

  // Calcola il prezzo totale in base alle date selezionate e al prezzo per notte della stanza
  calculateTotalPrice() {
    const selectedDates = this.bookingDate.value;

    if (
      selectedDates &&
      selectedDates.start &&
      selectedDates.end &&
      this.roomDto
    ) {
      const nights = Math.ceil(
        (selectedDates.end.getTime() - selectedDates.start.getTime()) /
          (1000 * 60 * 60 * 24)
      );
      this.bookingRequest.totalPrice = nights * this.roomDto.pricePerNight;
    } else {
      this.bookingRequest.totalPrice = 0;
    }
  }
}
