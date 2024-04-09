import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';
import { AuthResponseData } from '../../../../model/auth-response-dto';
import { RegisterComponent } from '../register/register.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // EventEmitter per notificare il successo del login
  @Output() loginSuccess: EventEmitter<void> = new EventEmitter<void>();

  // Variabile per memorizzare l'URL di reindirizzamento dopo il login
  returnUrl: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal,
    private _snackBar: MatSnackBar
  ) {}

  // Metodo per eseguire il login
  login(form: NgForm) {
    // Verifica se il form è valido
    if (form.valid) {
      const email = form.value.email;
      const password = form.value.password;

      // Chiamata al metodo di login dell'AuthService
      this.authService.login(email, password).subscribe({
        next: (resData: AuthResponseData) => {
          // Emette l'evento loginSuccess e mostra una notifica
          this.loginSuccess.emit();
          this.openSnackBar('Login completato con successo!');
        },
        error: (errorMessage) => {
          // Gestione degli errori
          console.log(errorMessage);
        },
      });

      // Reset del form dopo il login
      form.reset();
    } else {
      // Mostra una notifica se il form non è valido
      this.openSnackBar('Email o password non validi');
    }
  }

  // Metodo per aprire la modal di registrazione
  openRegisterModal() {
    // Chiude eventuali modal aperte
    this.modalService.dismissAll();

    // Apre la modal di registrazione
    const modalRef = this.modalService.open(RegisterComponent, {
      centered: true,
      size: 'lg',
    });

    // Gestisce l'evento di registrazione con successo dal componente di registrazione
    modalRef.componentInstance.registerSuccess.subscribe(() => {
      modalRef.close();

      // Reindirizza l'utente all'URL di reindirizzamento dopo la registrazione
      if (this.returnUrl && this.returnUrl !== '/') {
        this.router.navigateByUrl(this.returnUrl);
      }
    });
  }

  // Metodo per mostrare una notifica
  openSnackBar(message: string) {
    this._snackBar.open(message, '🏡', {
      duration: 2000,
    });
  }
}
