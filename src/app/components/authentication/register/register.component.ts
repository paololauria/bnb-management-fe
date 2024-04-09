import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  // EventEmitter per notificare il successo della registrazione
  @Output() registerSuccess: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private modalService: NgbModal
  ) {}

  // Metodo per registrare un nuovo utente
  register(form: NgForm) {
    // Verifica se il form è valido
    if (!form.valid) {
      this.openSnackBar('Errore: Compila tutti i campi');
      return;
    }

    // Recupera i dati dal form
    const firstname = form.value.firstname;
    const lastname = form.value.lastname;
    const email = form.value.email;
    const password = form.value.password;
    const birthdate = form.value.birthdate;

    // Chiamata al metodo di registrazione dell'AuthService
    this.authService
      .register(firstname, lastname, email, password, birthdate)
      .subscribe({
        next: (resData) => {
          // Emette l'evento registerSuccess e mostra una notifica
          this.registerSuccess.emit();
          this.openSnackBar('Registrazione completata con successo!');
        },
        error: (error) => {
          // Gestione degli errori durante la registrazione
          this.openSnackBar('Errore durante la registrazione: ' + error);
        },
      });
  }

  // Metodo per aprire la modal di login
  openLoginModal() {
    // Chiude eventuali modal aperte
    this.modalService.dismissAll();

    // Apre la modal di login
    const modalRef = this.modalService.open(LoginComponent, {
      centered: true,
      size: 'lg',
    });

    // Gestisce l'evento di login con successo dal componente di login
    modalRef.componentInstance.loginSuccess.subscribe(() => {
      modalRef.close();
    });
  }

  // Metodo per mostrare una notifica
  openSnackBar(message: string) {
    this._snackBar.open(message, '🏡', {
      duration: 2000,
    });
  }
}
