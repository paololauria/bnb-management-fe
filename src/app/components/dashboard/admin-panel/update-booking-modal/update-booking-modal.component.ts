import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from '../../../../../services/admin/admin.service';
import { UpdateBookingRequest } from '../../../../../model/update-booking-request-dto';
import { BookingDto } from '../../../../../model/booking-dto';

@Component({
  selector: 'app-update-booking-modal',
  templateUrl: './update-booking-modal.component.html',
  styleUrls: ['./update-booking-modal.component.css'],
})
export class UpdateBookingModalComponent implements OnInit {
  updateBookingForm!: FormGroup; // Form per l'aggiornamento della prenotazione

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    public dialogRef: MatDialogRef<UpdateBookingModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { booking: BookingDto } // Accetta direttamente la prenotazione
  ) {}

  ngOnInit(): void {
    // Inizializza il form per l'aggiornamento della prenotazione con i dati della prenotazione esistente
    this.updateBookingForm = this.fb.group({
      checkInDate: [this.data.booking.checkInDate, Validators.required],
      checkOutDate: [this.data.booking.checkOutDate, Validators.required],
    });
  }

  // Metodo per inviare il form di aggiornamento
  onSubmit(): void {
    if (this.updateBookingForm.invalid) {
      return;
    }

    // Costruisce l'oggetto UpdateBookingRequest con i dati dal form
    const updateBookingRequest: UpdateBookingRequest = {
      checkInDate: this.updateBookingForm.value.checkInDate,
      checkOutDate: this.updateBookingForm.value.checkOutDate,
    };

    // Chiama il metodo di aggiornamento della prenotazione dell'AdminService
    this.adminService
      .updateBooking(this.data.booking.bookingId, updateBookingRequest)
      .subscribe(
        () => {
          // Chiude la modale e indica che l'aggiornamento è avvenuto con successo
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Errore aggiornamento prenotazione: ', error);
        }
      );
  }
}
