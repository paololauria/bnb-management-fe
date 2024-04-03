import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AuthService,
  AuthResponseData,
} from '../../../../services/auth/auth.service';
import { RegisterComponent } from '../register/register.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @Output() loginSuccess: EventEmitter<void> = new EventEmitter<void>();
  returnUrl: string = '';

  constructor(private authService: AuthService, 
    private router: Router,
    private modalService: NgbModal) {}

  login(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.authService.login(email, password).subscribe({
      next: (resData: AuthResponseData) => {
        this.loginSuccess.emit();

      },
      error: (errorMessage) => {
        console.log(errorMessage);
      },
    });

    form.reset();
  }

  openRegisterModal() {
    const modalRef = this.modalService.open(RegisterComponent, { centered: true, size: 'lg'});
    modalRef.componentInstance.registerSuccess.subscribe(() => {
      modalRef.close(); 
      if (this.returnUrl && this.returnUrl !== '/') {
        this.router.navigateByUrl(this.returnUrl);
      }
    });
  }
}
