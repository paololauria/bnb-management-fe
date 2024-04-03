import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewDto } from '../../../../model/review-dto';
import { RoomsService } from '../../../../services/rooms/rooms.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user/user.service';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-rooms-reviews',
  templateUrl: './rooms-reviews.component.html',
  styleUrls: ['./rooms-reviews.component.css']
})
export class RoomsReviewsComponent implements OnInit {
  @Input() roomId: number = 2;
  reviewsResult: ReviewDto[] = [];  // Initialize as an empty array
  reviewForm!: FormGroup;
  reviewData: ReviewDto = {
    userName: '',
    roomName: '',
    rating: 0,
    comment: '',
    timestamp: new Date(),
  };
  isLoggedIn: boolean = false;

  constructor(
    private roomsService: RoomsService,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.isLoggedIn = !!user;
      this.route.params.subscribe((params) => {
        const roomId = +params['roomId'];
        this.loadAllReviewById(roomId);
      });
    });

    this.reviewForm = this.fb.group({
      comment: ['', Validators.required],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
    });
  }

  loadAllReviewById(roomId: number) {
    this.roomsService.getReviewsByRoomId(roomId).subscribe({
      next: (r) => {
        this.reviewsResult = r;
      },
      error: (err) => {
        console.log('Errore recupero reviews', err);
      },
    });
  }

  addReview() {
    if (this.reviewForm.valid) {
      this.reviewData = { ...this.reviewData, ...this.reviewForm.value};
      this.userService.createReview(this.reviewData, this.roomId).subscribe({
        next: (fd) => {
          alert('Recensione aggiunta con successo! (' + this.reviewData.rating + ')');
          this.loadAllReviewById(this.roomId);
          this.reviewForm.reset(); 
        },
        error: (error) => {
          console.log('Error:', error);
          alert('Si è verificato un errore. Riprova.');
        },
      });
    } else {
      alert('Completa correttamente tutti i campi del modulo.');
    }
  }
}
