import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './rooms.component';
import { RoomsDetailsComponent } from './rooms-details/rooms-details.component';
import { MaterialModule } from '../../material/material.module';
import { ImagesRoomPreviewComponent } from './images-room-preview/images-room-preview.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ConfirmBookingComponent } from './confirm-booking/confirm-booking.component';
import { RoomsReviewsComponent } from './rooms-reviews/rooms-reviews.component';

const roomsRoutes: Routes = [
  { path: 'camere', component: RoomsComponent },
  { path: 'camere/:roomId', component: RoomsDetailsComponent },
  { path: 'camere/:roomId/booking', component: ConfirmBookingComponent },
];

  @NgModule({
    declarations: [
      RoomsComponent,
      RoomsDetailsComponent,
      ImagesRoomPreviewComponent,
      CalendarComponent,
      ConfirmBookingComponent,
      RoomsReviewsComponent
      
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
      ImagesRoomPreviewComponent,
      CalendarComponent,
      ConfirmBookingComponent,
      RoomsReviewsComponent
    ],
  })
  export class RoomsModule {}
