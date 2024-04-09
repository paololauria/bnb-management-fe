import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BookingDto } from '../../model/booking-dto';
import { UpdateBookingRequest } from '../../model/update-booking-request-dto';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/admin'; // Aggiorna l'URL con il tuo endpoint API

  constructor(private http: HttpClient) {}

  createBooking(bookingData: BookingDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/createBooking`, bookingData).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  deleteBooking(bookingId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${bookingId}`).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
  updateBooking(
    bookingId: number,
    updateBookingRequest: UpdateBookingRequest
  ): Observable<any> {
    return this.http.put(`${this.apiUrl}/${bookingId}`, updateBookingRequest);
  }
}
