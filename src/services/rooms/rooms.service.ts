import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { RoomsDto } from '../../model/rooms-dto';
import { ReviewDto } from '../../model/review-dto';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  private baseUrl = 'http://localhost:8080/api/rooms';

  constructor(private http: HttpClient, private router: Router) {}

  getAllRooms(): Observable<RoomsDto[]> {
    return this.http.get<RoomsDto[]>(`${this.baseUrl}/all`);
  }

  getRoomById(roomId: number): Observable<RoomsDto> {
    return this.http.get<RoomsDto>(`${this.baseUrl}/${roomId}`);
  }

  getReviewsByRoomId(roomId: number): Observable<ReviewDto[]> {
    return this.http.get<ReviewDto[]>(`${this.baseUrl}/${roomId}/review`);
  }

}
