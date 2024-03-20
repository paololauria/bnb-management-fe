import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { PartnersComponent } from './partners/partners.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { FaqComponent } from './faq/faq.component';

const homeRoutes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [
    HomeComponent,
    PartnersComponent,
    FaqComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(homeRoutes),
  ],
  exports: [
    HomeComponent,
    PartnersComponent,
    FaqComponent

  ],
})
export class HomeModule {}
