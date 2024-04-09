import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BookingDto } from '../../model/booking-dto';
import { Observable } from 'rxjs';
import { RoomAvailabilityDto } from '../../model/room-availability-dto';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private baseUrl = 'http://localhost:8080/api/bookings';

  constructor(private http: HttpClient, private router: Router) {}

  getAllBookings(): Observable<BookingDto[]> {
    return this.http.get<BookingDto[]>(`${this.baseUrl}/all`);
  }

  makeBooking(bookingRequest: any): Observable<BookingDto> {
    return this.http.post<BookingDto>(`${this.baseUrl}/make`, bookingRequest);
  }
  getBookedDates(): Observable<RoomAvailabilityDto[]> {
    return this.http.get<RoomAvailabilityDto[]>(`${this.baseUrl}/booked-dates`);
  }
  getAllBookingsByUser(userId: number): Observable<BookingDto[]> {
    return this.http.get<BookingDto[]>(`${this.baseUrl}/${userId}/confirm`);
  }
  cancelBooking(bookingId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/cancel/${bookingId}`, null);
  }

  getBookingById(bookingId: number): Observable<BookingDto> {
    return this.http.get<BookingDto>(`${this.baseUrl}/${bookingId}`);
  }
}
