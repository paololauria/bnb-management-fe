import { NgModule } from '@angular/core';
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
import { ProfileModule } from './components/profile/dashboard.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material/material.module';
import { MatNativeDateModule } from '@angular/material/core';
import { SearchBarComponent } from './components/shared/search-bar/search-bar.component';
import { ListRoomsAvailableComponent } from './components/shared/list-rooms-available/list-rooms-available.component';
import { BookingSummaryComponent } from './components/rooms/booking-summary/booking-summary.component';




@NgModule({
  declarations: [
    AppComponent
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
    MatNativeDateModule
  ],
  providers: [ 
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }, provideAnimationsAsync(),
],
  bootstrap: [AppComponent]
})
export class AppModule { }
