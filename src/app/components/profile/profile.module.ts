import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { MatDialogModule } from '@angular/material/dialog';

const profileRoutes: Routes = [
  { path: 'user/:userId', component: UserPanelComponent },
];

@NgModule({
  declarations: [UserPanelComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MaterialModule,
    MatDialogModule,
    RouterModule.forChild(profileRoutes),
  ],
  exports: [UserPanelComponent],
})
export class ProfileModule {}
