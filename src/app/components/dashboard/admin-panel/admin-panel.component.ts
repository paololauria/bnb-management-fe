import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { AdminService } from '../../../../services/admin/admin.service';
import { BookingDto } from '../../../../model/booking-dto';
import { BookingService } from '../../../../services/booking/booking.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateBookingModalComponent } from './create-booking-modal/create-booking-modal.component';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';
import { UpdateBookingModalComponent } from './update-booking-modal/update-booking-modal.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort; // Riferimento al componente MatSort

  bookingForm: FormGroup; // Form per la creazione di una nuova prenotazione
  bookingList: BookingDto[] = []; // Lista delle prenotazioni
  displayedColumns: string[] = [
    'bookingId',
    'roomName',
    'userId',
    'checkInDate',
    'checkOutDate',
    'totalPrice',
    'actions',
  ]; // Colonne visualizzate nella tabella
  dataSource = new MatTableDataSource<BookingDto>(); // DataSource per la tabella delle prenotazioni

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private bookingService: BookingService,
    private dialog: MatDialog
  ) {
    // Inizializzazione del form per la creazione di una nuova prenotazione
    this.bookingForm = this.fb.group({
      roomId: ['', Validators.required],
      userId: ['', Validators.required],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Carica la lista delle prenotazioni all'avvio del componente
    this.loadBookingList();
  }

  // Metodo per cancellare una prenotazione
  deleteBooking(bookingId: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: {},
    });

    // Gestisce l'azione dopo la chiusura del dialog
    dialogRef.afterClosed().subscribe((result) => {
      // Se il risultato è 'delete', cancella la prenotazione
      if (result === 'delete') {
        this.adminService.deleteBooking(bookingId).subscribe(
          (response) => {
            console.log('Booking deleted successfully:', response);
            this.loadBookingList(); // Ricarica la lista delle prenotazioni dopo la cancellazione
          },
          (error) => {
            console.error('Failed to delete booking:', error);
          }
        );
      }
    });
  }

  // Metodo per aprire la modale di creazione di una prenotazione
  openCreateModal() {
    // Apri la modale di creazione della prenotazione
    const dialogRef = this.dialog.open(CreateBookingModalComponent, {
      width: '700px', // Imposta la larghezza della modale
      data: {}, // Eventuali dati da passare alla modale
    });

    // Gestisce eventuali azioni dopo la chiusura della modale (ad esempio, aggiornare la tabella delle prenotazioni)
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The create booking modal was closed');
      // Aggiorna la tabella delle prenotazioni
      this.loadBookingList();
    });
  }

  // Metodo per aprire la modale di aggiornamento di una prenotazione
  openUpdateModal(booking: BookingDto) {
    const dialogRef = this.dialog.open(UpdateBookingModalComponent, {
      width: '500px',
      data: { booking }, // Passa direttamente l'intero oggetto della prenotazione
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadBookingList(); // Ricarica la lista delle prenotazioni dopo l'aggiornamento
    });
  }

  // Metodo privato per caricare la lista delle prenotazioni
  private loadBookingList() {
    this.bookingService.getAllBookings().subscribe(
      (bookings) => {
        // Ordina gli elementi in base al prezzo totale della prenotazione
        bookings.sort((a, b) => (b?.totalPrice ?? 0) - (a?.totalPrice ?? 0));

        this.bookingList = bookings; // Aggiorna la lista delle prenotazioni
        this.dataSource.data = bookings; // Aggiorna il dataSource della tabella
        this.dataSource.sort = this.sort; // Imposta il MatSort sul dataSource
      },
      (error) => {
        console.error('Failed to load booking list:', error);
      }
    );
  }
}
