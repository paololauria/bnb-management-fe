import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ListRoomsAvailableComponent } from './list-rooms-available/list-rooms-available.component';

@NgModule({
  declarations: [MenuComponent, FooterComponent, DeleteDialogComponent, SearchBarComponent, ListRoomsAvailableComponent],
  exports: [MenuComponent, FooterComponent, DeleteDialogComponent, SearchBarComponent, ListRoomsAvailableComponent],
  imports: [
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    AuthenticationModule,
  ],
})
export class SharedModule {}
