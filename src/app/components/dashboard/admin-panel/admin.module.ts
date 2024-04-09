import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel.component';
import { MaterialModule } from '../../../material/material.module';

const adminRoutes: Routes = [
  { path: 'dashboard', component: AdminPanelComponent },
];

@NgModule({
  declarations: [AdminPanelComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MaterialModule,
    RouterModule.forChild(adminRoutes),
  ],
  exports: [AdminPanelComponent],
})
export class AdminModule {}
