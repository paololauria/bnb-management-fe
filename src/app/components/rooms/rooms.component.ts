import { Component, OnInit } from '@angular/core';
import { RoomsDto } from '../../../model/rooms-dto';
import { RoomsService } from '../../../services/rooms/rooms.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent implements OnInit{
  allRooms: RoomsDto[] = [];

  constructor(
    private roomsService: RoomsService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.fetchAllRooms();
  }

  fetchAllRooms() {
    this.roomsService.getAllRooms().subscribe({
      next: (rooms) => {
        this.allRooms = rooms;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  navigateToRoomDetails(roomId: number) {
    this.router.navigate(['/camere', roomId]);
  }

}
