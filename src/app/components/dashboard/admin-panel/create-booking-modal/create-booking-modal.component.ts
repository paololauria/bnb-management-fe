import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../../../../services/admin/admin.service';
import { RoomsService } from '../../../../../services/rooms/rooms.service';
import { RoomsDto } from '../../../../../model/rooms-dto';

@Component({
  selector: 'app-create-booking-modal',
  templateUrl: './create-booking-modal.component.html',
  styleUrls: ['./create-booking-modal.component.css'],
})
export class CreateBookingModalComponent implements OnInit {
  bookingForm: FormGroup; // Form per la creazione della prenotazione
  rooms: RoomsDto[] = []; // Lista delle stanze disponibili

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private roomService: RoomsService,
    public dialogRef: MatDialogRef<CreateBookingModalComponent>, // Riferimento alla modale di creazione prenotazione
    private snackBar: MatSnackBar // Servizio per le notifiche a comparsa
  ) {
    // Inizializza il form per la creazione della prenotazione
    this.bookingForm = this.fb.group({
      roomId: ['', Validators.required],
      userId: ['', Validators.required],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Carica la lista delle stanze disponibili all'avvio del componente
    this.loadRooms();
  }

  // Metodo per caricare la lista delle stanze disponibili
  loadRooms() {
    this.roomService.getAllRooms().subscribe(
      (rooms) => {
        this.rooms = rooms; // Aggiorna la lista delle stanze disponibili
      },
      (error) => {
        console.error('Errore nel recupero delle stanze: ', error);
      }
    );
  }

  // Metodo per creare una nuova prenotazione
  createBooking() {
    if (this.bookingForm.valid) {
      const bookingData = this.bookingForm.value; // Dati del form
      // Chiama il metodo di creazione della prenotazione dell'AdminService
      this.adminService.createBooking(bookingData).subscribe(
        (response) => {
          // Chiude la modale e mostra una notifica di successo
          this.dialogRef.close();
          this.snackBar.open('Prenotazione creata con successo', 'Chiudi', {
            duration: 3000,
          });
        },
        (error) => {
          console.error('Errore nella creazione della prenotazione: ', error);
        }
      );
    }
  }

  // Metodo per annullare la creazione della prenotazione e chiudere la modale
  onCancel(): void {
    this.dialogRef.close();
  }
}
