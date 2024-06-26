import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../authentication/login/login.component';
import { RegisterComponent } from '../../authentication/register/register.component';
import { User } from '../../../../model/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  user: User | null = null;
  returnUrl: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.authService.checkLocalStorage();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.returnUrl = event.url;
      }
    });
  }

  checkAdmin(): boolean {
    this.user = this.authService.checkStatus();
    return this.user !== null && this.user.role === 'ADMIN';
  }

  checkUser(): boolean {
    this.user = this.authService.checkStatus();
    return this.user !== null;
  }

  logout() {
    this.authService.logout();
  }

  navigateToUserPanel() {
    if (this.user && this.user.id) {
      this.router.navigate(['/user', this.user?.id]);
    }
  }

  openLoginModal() {
    const modalRef = this.modalService.open(LoginComponent, { centered: true });
    modalRef.componentInstance.loginSuccess.subscribe(() => {
      modalRef.close();
      if (this.returnUrl && this.returnUrl !== '/') {
        this.router.navigateByUrl(this.returnUrl);
      }
    });
  }

  openRegisterModal() {
    // Chiudi la modal del login prima di aprire quella di registrazione
    const loginModalRef = this.modalService.open(LoginComponent);
    loginModalRef.dismiss(); // Chiudi la modal del login
    const modalRef = this.modalService.open(RegisterComponent, {
      centered: true,
      size: 'lg',
    });
    // Gestisci l'evento di registrazione con successo dal componente di registrazione
    modalRef.componentInstance.registerSuccess.subscribe(() => {
      modalRef.close();
      // Naviga verso la pagina di destinazione dopo la registrazione
      if (this.returnUrl && this.returnUrl !== '/') {
        this.router.navigateByUrl(this.returnUrl);
      }
    });
  }

  toggleDarkMode() {
    const darkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';
    const newMode = !darkModeEnabled; // Inverti lo stato attuale

    // Salva lo stato della dark mode nell'archiviazione locale
    localStorage.setItem('darkModeEnabled', newMode ? 'true' : 'false');

    // Aggiungi o rimuovi la classe dark-mode dal corpo del documento
    if (newMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
