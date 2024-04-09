import { Component, Input } from '@angular/core';
import { RoomsDto } from '../../../../model/rooms-dto';
import { BookingDto } from '../../../../model/booking-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-rooms-available',
  templateUrl: './list-rooms-available.component.html',
  styleUrls: ['./list-rooms-available.component.css'],
})
export class ListRoomsAvailableComponent {
  @Input() availableRooms: RoomsDto[] = [];
  @Input() bookingRequest!: BookingDto;

  constructor(private router: Router) {}
  navigateToRoomDetails(roomId: number) {
    this.router.navigate(['camere', roomId]);
  }
}
