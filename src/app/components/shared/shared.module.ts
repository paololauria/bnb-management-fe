import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { AuthenticationModule } from "../authentication/authentication.module";

@NgModule({
    declarations: [MenuComponent, FooterComponent],
    exports: [MenuComponent, FooterComponent],
    imports: [
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        HttpClientModule,
        CommonModule,
        RouterModule,
        AuthenticationModule
    ]
})
export class SharedModule {}
