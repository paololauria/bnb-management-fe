import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './rooms.component';
import { RoomsDetailsComponent } from './rooms-details/rooms-details.component';
import { MaterialModule } from '../../material/material.module';
import { CalendarComponent } from './calendar/calendar.component';
import { ConfirmBookingComponent } from './confirm-booking/confirm-booking.component';
import { RoomsReviewsComponent } from './rooms-reviews/rooms-reviews.component';
import { BookingSummaryComponent } from './booking-summary/booking-summary.component';

const roomsRoutes: Routes = [
  { path: 'camere', component: RoomsComponent },
  { path: 'camere/:roomId', component: RoomsDetailsComponent },
  { path: 'camere/:roomId/booking', component: ConfirmBookingComponent },
  {
    path: 'conferma-prenotazione/:bookingId',
    component: BookingSummaryComponent,
  },
];

@NgModule({
  declarations: [
    RoomsComponent,
    RoomsDetailsComponent,
    CalendarComponent,
    ConfirmBookingComponent,
    RoomsReviewsComponent,
    BookingSummaryComponent,
  ],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(roomsRoutes),
  ],
  exports: [
    RoomsComponent,
    RoomsDetailsComponent,
    CalendarComponent,
    ConfirmBookingComponent,
    RoomsReviewsComponent,
    BookingSummaryComponent,
  ],
})
export class RoomsModule {}
