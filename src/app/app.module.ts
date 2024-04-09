import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationModule } from './components/authentication/authentication.module';
import { AuthInterceptorService } from '../services/auth/auth-interceptor.service';
import { HomeModule } from './components/home/home.module';
import { SharedModule } from './components/shared/shared.module';
import { RoomsModule } from './components/rooms/rooms.module';
import { ProfileModule } from './components/profile/profile.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material/material.module';
import { MatNativeDateModule } from '@angular/material/core';
import { AdminModule } from './components/dashboard/admin-panel/admin.module';
import { CreateBookingModalComponent } from './components/dashboard/admin-panel/create-booking-modal/create-booking-modal.component';
import { UpdateBookingModalComponent } from './components/dashboard/admin-panel/update-booking-modal/update-booking-modal.component';


const darkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';
if (darkModeEnabled) {
  document.body.classList.add('dark-mode');
}


@NgModule({
  declarations: [
    AppComponent,
    CreateBookingModalComponent,
    UpdateBookingModalComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationModule,
    HomeModule,
    RoomsModule,
    ProfileModule,
    SharedModule,
    MaterialModule,
    MatNativeDateModule,
    AdminModule
  ],
  providers: [ 
    {
      provide: LOCALE_ID,
      useValue: 'it-IT'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
