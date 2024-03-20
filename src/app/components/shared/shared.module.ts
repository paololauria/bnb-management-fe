import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { SwitchModeComponent } from './switch-mode/switch-mode.component';

@NgModule({
  declarations: [MenuComponent, FooterComponent, SwitchModeComponent],
  imports: [
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
  ],
  exports: [MenuComponent, FooterComponent, SwitchModeComponent],
})
export class SharedModule {}
