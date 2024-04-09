import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../../../../services/rooms/rooms.service';
import { ActivatedRoute } from '@angular/router';
import { RoomsDto } from '../../../../model/rooms-dto';
import { AuthService } from '../../../../services/auth/auth.service';
import { User } from '../../../../model/user';

@Component({
  selector: 'app-rooms-details',
  templateUrl: './rooms-details.component.html',
  styleUrls: ['./rooms-details.component.css'],
})
export class RoomsDetailsComponent implements OnInit {
  roomDto!: RoomsDto; 
  user!: User | null; 

  constructor(
    private roomsService: RoomsService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Recupera l'ID della stanza dai parametri dell'URL e carica i dettagli della stanza corrispondente
    this.route.params.subscribe((params) => {
      const roomId = +params['roomId'];
      this.loadRoomDetails(roomId);
    });
  }

  // Controlla se l'utente è autenticato
  checkUser(): boolean {
    this.user = this.authService.checkStatus(); // Verifica lo stato dell'utente tramite il servizio di autenticazione
    return this.user !== null; // Restituisce true se l'utente è autenticato, altrimenti false
  }

  // Carica i dettagli della stanza utilizzando il servizio di stanze
  loadRoomDetails(roomId: number) {
    this.roomsService.getRoomById(roomId).subscribe({
      next: (room) => {
        this.roomDto = room; // Imposta i dettagli della stanza
      },
      error: (err) => console.log(err),
    });
  }
}
