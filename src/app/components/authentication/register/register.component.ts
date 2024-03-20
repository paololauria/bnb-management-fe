import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AuthService
} from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}

  register(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const firstname = form.value.firstname;
    const lastname = form.value.lastname;
    const email = form.value.email;
    const password = form.value.password;
    const birthdate = form.value.birthdate;

    this.authService
      .register(firstname, lastname, email, password, birthdate)
      .subscribe({
        next: (resData) => {
          console.log(resData);
          this.router.navigate(['/']);
        },
        error: (error) => {
          alert(error);
          console.log(error);
        },
      });
  }
}
