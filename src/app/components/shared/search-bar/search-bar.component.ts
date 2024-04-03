import { Component } from '@angular/core';
import { RoomsService } from '../../../../services/rooms/rooms.service';
import { RoomsDto } from '../../../../model/rooms-dto';
import { formatDate } from '@angular/common';
import { BookingDto } from '../../../../model/booking-dto';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  bookingRequest: BookingDto = {
    bookingId: 0,
    roomName: '',
    roomId: 0,
    userId: null,
    checkInDate: new Date(),
    checkOutDate: new Date(),
    totalPrice: 0,
    roomCover: '',
    maxGuestRoom: 0
  };
  
  maxGuests: number | null = null;
  availableRooms: RoomsDto[] = [];
  minDate = new Date(); 

  constructor(private roomsService: RoomsService) {}

  searchRooms() {
    if (this.bookingRequest.checkInDate && this.bookingRequest.checkOutDate && this.maxGuests !== null) {
      const today = new Date();
      
      if (this.bookingRequest.checkInDate >= today) {
        const formattedCheckInDate = formatDate(this.bookingRequest.checkInDate, 'yyyy-MM-dd', 'en');
        const formattedCheckOutDate = formatDate(this.bookingRequest.checkOutDate, 'yyyy-MM-dd', 'en');
        
        this.roomsService.searchAvailableRooms(formattedCheckInDate, formattedCheckOutDate, this.maxGuests)
          .subscribe((rooms: RoomsDto[]) => {
            this.availableRooms = rooms;
            this.calculateTotalPrice();
          }, error => {
            console.error(error);
          });
      } else {
        console.error("Il check-in non può essere antecedente alla data odierna."); 
      }
    } else {
      console.error("Inserisci le date di check-in e check-out e il numero di ospiti.");
    }
  }


  calculateTotalPrice() {
    const selectedDates = this.bookingRequest;
    console.log('Selected dates:', selectedDates);
    console.log('Room DTO:', this.availableRooms);
    if (selectedDates && selectedDates.checkInDate && selectedDates.checkOutDate && this.availableRooms.length > 0) {
      const nights = Math.ceil((selectedDates.checkOutDate.getTime() - selectedDates.checkInDate.getTime()) / (1000 * 60 * 60 * 24));
      console.log('Number of nights:', nights);
      console.log('Price per night:', this.availableRooms[0].pricePerNight); 
      this.bookingRequest.totalPrice = nights * this.availableRooms[0].pricePerNight; 
      console.log('Total price:', this.bookingRequest.totalPrice);
    } else {
      this.bookingRequest.totalPrice = 0;
      console.log('Total price:', this.bookingRequest.totalPrice);
    }
}
 


}
