import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../../../../services/rooms/rooms.service';
import { ActivatedRoute } from '@angular/router';
import { RoomsDto } from '../../../../model/rooms-dto';
import { AuthService } from '../../../../services/auth/auth.service';
import { User } from '../../../../model/user';

@Component({
  selector: 'app-rooms-details',
  templateUrl: './rooms-details.component.html',
  styleUrls: ['./rooms-details.component.css']
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
    this.route.params.subscribe((params) => {
      const roomId = +params['roomId'];
      this.loadRoomDetails(roomId);
    });
  }

  checkUser(): boolean {
    this.user = this.authService.checkStatus();
    return this.user !== null;
  }

  loadRoomDetails(roomId: number) {
    this.roomsService.getRoomById(roomId).subscribe({
      next: (r) => {
        this.roomDto = r;
      },
      error: (err) => console.log(err),
    });
  }
}
