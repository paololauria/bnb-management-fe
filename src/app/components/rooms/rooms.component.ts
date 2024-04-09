import { Component, OnInit } from '@angular/core';
import { RoomsDto } from '../../../model/rooms-dto';
import { RoomsService } from '../../../services/rooms/rooms.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css',
})
export class RoomsComponent implements OnInit {
  allRooms: RoomsDto[] = [];

  constructor(private roomsService: RoomsService, private router: Router) {}

  ngOnInit() {
    this.fetchAllRooms();
  }

  fetchAllRooms() {
    // Recupera tutte le camere disponibili utilizzando il servizio RoomsService
    this.roomsService.getAllRooms().subscribe({
      next: (rooms) => {
        // Assegna le camere recuperate alla variabile allRooms
        this.allRooms = rooms;
      },
      error: (error) => {
        // Gestisce gli errori stampandoli nella console
        console.log(error);
      },
    });
  }

  navigateToRoomDetails(roomId: number) {
    // Naviga alla pagina dei dettagli della camera utilizzando il servizio Router
    this.router.navigate(['/camere', roomId]);
  }
}
