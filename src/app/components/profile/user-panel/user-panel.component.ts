import { Component, OnInit } from '@angular/core';
import { UserDto } from '../../../../model/user-dto';
import { UserService } from '../../../../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../../services/auth/auth.service'; // Importa AuthService
import { BookingService } from '../../../../services/booking/booking.service';
import { BookingDto } from '../../../../model/booking-dto';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css'],
})
export class UserPanelComponent implements OnInit {
  userDto!: UserDto; // Dati dell'utente corrente
  profileImageUrl: string = ''; // URL dell'immagine del profilo
  selectedImageKey: string | null = null; // Chiave dell'immagine selezionata
  predefinedImageKeys: string[] = []; // Array delle chiavi delle immagini predefinite
  predefinedImages: Record<string, string> = { // Immagini predefinite con le rispettive chiavi
    'image1': 'url1.jpg',
    'image2': 'url2.jpg',
    'image3': 'url3.jpg'
  };
  currentUserID: number = 0; // ID dell'utente corrente
  bookings: BookingDto[] = []; // Array delle prenotazioni dell'utente

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private authService: AuthService, // Servizio di autenticazione
    private bookingService: BookingService,
    public dialog: MatDialog,
    public _snackBar: MatSnackBar,
    private router: Router
  ) {   
  }

  ngOnInit(): void {
    // Recupera l'utente corrente dal servizio di autenticazione al momento dell'inizializzazione del componente
    const currentUser = this.authService.getUser();
    if (currentUser) {
      this.currentUserID = currentUser.id; // Imposta l'ID dell'utente corrente se presente
    }

    // Sottoscrizione ai parametri dell'URL per ottenere l'ID dell'utente e caricare i dettagli e le prenotazioni dell'utente
    this.route.params.subscribe((params) => {
      const userId = +params['userId']; // Ottieni l'ID dell'utente dall'URL
      this.loadUserDetails(userId); // Carica i dettagli dell'utente
      this.loadUserBookings(userId); // Carica le prenotazioni dell'utente
    });

    // Ottieni le chiavi delle immagini predefinite
    this.predefinedImageKeys = Object.keys(this.predefinedImages);
  }

  // Apre una finestra modale per confermare l'eliminazione di una prenotazione
  openDialog(bookingId: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.cancelBooking(bookingId); // Cancella la prenotazione se confermato dall'utente
      }
    });
  }
  
  // Carica le prenotazioni dell'utente dal servizio di prenotazione
  loadUserBookings(userId: number) {
    this.bookingService.getAllBookingsByUser(userId).subscribe({
      next: (bookings) => {
        this.bookings = bookings; // Imposta le prenotazioni ricevute dal servizio
      },
      error: (err) => console.error(err),
    });
  }

  // Carica i dettagli dell'utente dal servizio utente
  loadUserDetails(userId: number) {
    this.userService.getUserById(userId).subscribe({
      next: (u) => {
        this.userDto = u; // Imposta i dettagli dell'utente ricevuti dal servizio
        this.profileImageUrl = u.image; // Imposta l'URL dell'immagine del profilo
      },
      error: (err) => console.error(err),
    });
  }

  // Apre una finestra modale per selezionare un'immagine predefinita come immagine del profilo
  openImageSelectionModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  // Salva l'immagine del profilo selezionata
  saveProfileImage() {
    if (!this.selectedImageKey) {
      console.error('Nessuna immagine selezionata');
      return;
    }

    const selectedImageUrl = this.predefinedImages[this.selectedImageKey];
    this.userService.uploadUserProfileImage(this.userDto.id, selectedImageUrl).subscribe(
      (response) => {
        console.log('Immagine del profilo caricata con successo');
        this.loadUserDetails(this.userDto.id); // Ricarica i dettagli dell'utente dopo il caricamento dell'immagine del profilo
      },
      (error) => {
        this.loadUserDetails(this.userDto.id); // Ricarica i dettagli dell'utente in caso di errore
        console.error('Errore durante il caricamento dell\'immagine del profilo', error);
      }
    );
  }

  // Seleziona un'immagine predefinita come immagine del profilo
  selectPredefinedImage(imageKey: string) {
    this.selectedImageKey = imageKey;
  }

  // Cancella una prenotazione utilizzando il servizio di prenotazione
  cancelBooking(bookingId: number) {
    this.bookingService.cancelBooking(bookingId).subscribe(
      () => {
        this.bookings = this.bookings.filter(booking => booking.bookingId !== bookingId); // Rimuove la prenotazione dalla lista delle prenotazioni
        this.openSnackBar('Prenotazione cancellata con successo ✅', 'OK'); // Mostra una notifica di successo
      },
      error => {
        this.openSnackBar('Impossibile cancellare la prenotazione. Per informazioni contattare l\'host. 📞', 'OK'); // Mostra una notifica di errore
        console.error('Errore durante la cancellazione della prenotazione', error);
      }
    );
  }

  // Apre una notifica a comparsa con un messaggio e un'azione
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  // Naviga alla pagina di dettagli della prenotazione
  navigateToBookingDetails(bookingId: number) {
    this.router.navigate(['conferma-prenotazione', bookingId]);
  }

}
