import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BookingDto } from '../../model/booking-dto';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private baseUrl = 'http://localhost:8080/api/bookings';

  constructor(private http: HttpClient, private router: Router) {}

  makeBooking(bookingRequest: any): Observable<BookingDto> {
   return this.http.post<BookingDto>(`${this.baseUrl}/make`, bookingRequest);
 }

}
