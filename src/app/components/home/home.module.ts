import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { FaqComponent } from './faq/faq.component';
import { SharedModule } from '../shared/shared.module';
import { ListRoomsAvailableComponent } from '../shared/list-rooms-available/list-rooms-available.component';

const homeRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'lista-camere', component: ListRoomsAvailableComponent },
];

@NgModule({
  declarations: [HomeComponent, FaqComponent],
  exports: [HomeComponent, FaqComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(homeRoutes),
    SharedModule,
  ],
})
export class HomeModule {}
