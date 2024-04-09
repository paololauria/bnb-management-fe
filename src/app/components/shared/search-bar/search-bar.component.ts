import { Component } from '@angular/core';
import { RoomsService } from '../../../../services/rooms/rooms.service';
import { RoomsDto } from '../../../../model/rooms-dto';
import { formatDate } from '@angular/common';
import { BookingDto } from '../../../../model/booking-dto';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  // Oggetto per la richiesta di prenotazione
  bookingRequest: BookingDto = {
    bookingId: 0,
    roomName: '',
    roomId: 0,
    userId: null,
    checkInDate: new Date(),
    checkOutDate: new Date(),
    totalPrice: 0,
    roomCover: '',
    maxGuestRoom: 0,
  };

  maxGuests: number | null = null; // Numero massimo di ospiti
  availableRooms: RoomsDto[] = []; // Camere disponibili
  minDate = new Date(); // Data minima per il calendario (oggi)

  constructor(private roomsService: RoomsService) {}

  // Metodo per cercare camere disponibili
  searchRooms() {
    if (
      this.bookingRequest.checkInDate &&
      this.bookingRequest.checkOutDate &&
      this.maxGuests !== null
    ) {
      const today = new Date();

      // Verifica se la data di check-in è successiva o uguale alla data odierna
      if (this.bookingRequest.checkInDate >= today) {
        // Formattazione delle date nel formato richiesto dal backend
        const formattedCheckInDate = formatDate(
          this.bookingRequest.checkInDate,
          'yyyy-MM-dd',
          'en'
        );
        const formattedCheckOutDate = formatDate(
          this.bookingRequest.checkOutDate,
          'yyyy-MM-dd',
          'en'
        );

        // Chiamata al servizio per cercare camere disponibili
        this.roomsService
          .searchAvailableRooms(
            formattedCheckInDate,
            formattedCheckOutDate,
            this.maxGuests
          )
          .subscribe(
            (rooms: RoomsDto[]) => {
              // Assegnamento delle camere disponibili
              this.availableRooms = rooms;
              // Calcolo del prezzo totale
              this.calculateTotalPrice();
            },
            (error) => {
              console.error(error); // Gestione degli errori
            }
          );
      } else {
        console.error(
          'Il check-in non può essere antecedente alla data odierna.'
        ); // Messaggio di errore
      }
    } else {
      console.error(
        'Inserisci le date di check-in e check-out e il numero di ospiti.'
      ); // Messaggio di errore
    }
  }

  // Metodo per calcolare il prezzo totale della prenotazione
  calculateTotalPrice() {
    const selectedDates = this.bookingRequest;
    if (
      selectedDates &&
      selectedDates.checkInDate &&
      selectedDates.checkOutDate &&
      this.availableRooms.length > 0
    ) {
      // Calcolo del numero di notti
      const nights = Math.ceil(
        (selectedDates.checkOutDate.getTime() -
          selectedDates.checkInDate.getTime()) /
          (1000 * 60 * 60 * 24)
      );
      // Calcolo del prezzo totale
      this.bookingRequest.totalPrice =
        nights * this.availableRooms[0].pricePerNight;
    } else {
      this.bookingRequest.totalPrice = 0; // Se non ci sono camere disponibili, il prezzo totale è 0
    }
  }
}
