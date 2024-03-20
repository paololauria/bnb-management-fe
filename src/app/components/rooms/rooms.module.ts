import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { RoomsComponent } from './rooms.component';
import { RoomsDetailsComponent } from './rooms-details/rooms-details.component';
import { MaterialModule } from '../../material/material.module';
import { ImagesRoomPreviewComponent } from './images-room-preview/images-room-preview.component';


const roomsRoutes: Routes = [{ path: 'camere', component: RoomsComponent },
{path: 'camere/:roomId', component: RoomsDetailsComponent}];

@NgModule({
  declarations: [
   RoomsComponent,
    RoomsDetailsComponent,
  ImagesRoomPreviewComponent],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(roomsRoutes),
    CalendarComponent,

  ],
  exports: [
   RoomsComponent,
    CalendarComponent,
    RoomsDetailsComponent,
    ImagesRoomPreviewComponent
  ],
})
export class RoomsModule {}
