import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewDto } from '../../../../model/review-dto';
import { RoomsService } from '../../../../services/rooms/rooms.service';

@Component({
  selector: 'app-rooms-reviews',
  templateUrl: './rooms-reviews.component.html',
  styleUrl: './rooms-reviews.component.css'
})
export class RoomsReviewsComponent implements OnInit {
  @Input() roomId: number = 2;
  reviewsResult!: ReviewDto[];

  constructor(private roomsService: RoomsService, private route: ActivatedRoute) {}
  
    ngOnInit() {
      this.route.params.subscribe((params) => {
        const roomId = +params['roomId'];
        this.loadAllReviewById(roomId);
      });
    }

  loadAllReviewById(roomId: number) {
    this.roomsService.getReviewsByRoomId(roomId).subscribe({
      next: (r) => {
        this.reviewsResult = r;
      },
      error: (err) => {
        console.log('Error fetching feedback details:', err);
      },
    });
  }
}
