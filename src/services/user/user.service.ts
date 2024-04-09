import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDto } from '../../model/user-dto';
import { ReviewDto } from '../../model/review-dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) {}

  getAllUser(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.baseUrl}/all`);
  }

  getUserById(userId: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.baseUrl}/${userId}`);
  }

  uploadUserProfileImage(userId: number, imageUrl: string): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/${userId}/profile-image`,
      imageUrl,
      { observe: 'response' }
    );
  }

  createReview(reviewData: ReviewDto, roomId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${roomId}/review`, reviewData);
  }
}
