import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  AuthService,
  AuthResponseData,
} from '../../../../services/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  login(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;
    authObs = this.authService.login(email, password);

    authObs.subscribe({
      next: (resData) => {
        this.router.navigate(['/']);
      },
      error: (errorMessage) => {
        console.log(errorMessage);
      },
    });

    form.reset();
  }
}
