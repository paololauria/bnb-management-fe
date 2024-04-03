import { Component, Input, OnInit } from '@angular/core';
import { RoomsDto } from '../../../../model/rooms-dto';
import { RoomsService } from '../../../../services/rooms/rooms.service';
import { BookingDto } from '../../../../model/booking-dto';

@Component({
  selector: 'app-list-rooms-available',
  templateUrl: './list-rooms-available.component.html',
  styleUrls: ['./list-rooms-available.component.css']
})
export class ListRoomsAvailableComponent {
  @Input() availableRooms: RoomsDto[] = [];
  @Input() bookingRequest!: BookingDto;


  constructor() { }

}
