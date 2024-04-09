import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewDto } from '../../../../model/review-dto'; // Importa il modello ReviewDto
import { RoomsService } from '../../../../services/rooms/rooms.service'; // Importa il servizio RoomsService
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Importa FormGroup, FormBuilder e Validators per la gestione dei form
import { UserService } from '../../../../services/user/user.service'; // Importa il servizio UserService
import { AuthService } from '../../../../services/auth/auth.service'; // Importa il servizio AuthService per la gestione dell'autenticazione
import { MatSnackBar } from '@angular/material/snack-bar'; // Importa MatSnackBar per le notifiche a comparsa

@Component({
  selector: 'app-rooms-reviews',
  templateUrl: './rooms-reviews.component.html',
  styleUrls: ['./rooms-reviews.component.css']
})
export class RoomsReviewsComponent implements OnInit {
  @Input() roomId: number = 2; // Input: ID della camera
  reviewsResult: ReviewDto[] = [];  // Array delle recensioni, inizializzato come array vuoto
  reviewForm!: FormGroup; // Form per l'aggiunta di una recensione
  reviewData: ReviewDto = { // Dati della recensione da aggiungere
    userName: '',
    roomName: '',
    rating: 0,
    comment: '',
    timestamp: new Date(),
  };
  isLoggedIn: boolean = false; // Flag che indica se l'utente è autenticato o meno

  constructor(
    private roomsService: RoomsService, 
    private route: ActivatedRoute,
    private userService: UserService, 
    private authService: AuthService, 
    private fb: FormBuilder, 
    public _snackBar: MatSnackBar 
  ) {}

  ngOnInit() {
    // Sottoscrizione all'utente autenticato e caricamento delle recensioni al caricamento del componente
    this.authService.user.subscribe(user => {
      this.isLoggedIn = !!user; // Imposta isLoggedIn in base allo stato dell'utente autenticato
      // Sottoscrizione ai parametri dell'URL per ottenere l'ID della camera e caricare le recensioni corrispondenti
      this.route.params.subscribe((params) => {
        const roomId = +params['roomId']; // Ottiene l'ID della camera dall'URL
        this.loadAllReviewById(roomId); // Carica tutte le recensioni della camera specificata
      });
    });

    // Inizializzazione del form per l'aggiunta di una recensione con validazioni
    this.reviewForm = this.fb.group({
      comment: ['', Validators.required], // Campo commento richiesto
      rating: ['', [Validators.required, Validators.min(1), Validators.max(10)]], // Campo valutazione richiesto con valore minimo e massimo
    });
  }

  // Metodo per caricare tutte le recensioni di una camera
  loadAllReviewById(roomId: number) {
    this.roomsService.getReviewsByRoomId(roomId).subscribe({
      next: (r) => {
        this.reviewsResult = r; // Imposta le recensioni ricevute dal servizio
      },
      error: (err) => {
        console.log('Errore recupero reviews', err); // Gestisce eventuali errori durante il recupero delle recensioni
      },
    });
  }

  // Metodo per aggiungere una nuova recensione
  addReview() {
    if (this.reviewForm.valid) { // Controlla se il form è valido
      this.reviewData = { ...this.reviewData, ...this.reviewForm.value}; // Aggiorna i dati della recensione con quelli dal form
      // Chiamata al servizio per creare una nuova recensione
      this.userService.createReview(this.reviewData, this.roomId).subscribe({
        next: (fd) => {
          this.openSnackBar('Grazie! Recensione aggiunta con successo ✅', 'OK'); // Mostra una notifica di successo
          this.loadAllReviewById(this.roomId); // Ricarica tutte le recensioni dopo l'aggiunta di una nuova recensione
          this.reviewForm.reset();  // Resetta il form dopo l'invio della recensione
        },
        error: (error) => {
          console.log('Error:', error); // Gestisce eventuali errori durante l'aggiunta della recensione
          this.openSnackBar('Non puoi aggiungere una recensione ❌', 'OK'); // Mostra una notifica di errore
        },
      });
    } else {
      alert('Completa correttamente tutti i campi del modulo.'); // Avvisa l'utente di compilare correttamente tutti i campi del form
    }
  }

  // Metodo per aprire una notifica a comparsa
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
