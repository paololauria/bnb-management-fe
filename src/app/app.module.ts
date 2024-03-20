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
import { RoomsComponent } from './components/rooms/rooms.component';
import { RoomsModule } from './components/rooms/rooms.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material/material.module';
import { FaqComponent } from './components/home/faq/faq.component';
import { SwitchModeComponent } from './components/shared/switch-mode/switch-mode.component';
import { ImagesRoomPreviewComponent } from './components/rooms/images-room-preview/images-room-preview.component';


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
    DashboardModule,
    SharedModule,
    MaterialModule
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
