import { Component, OnInit } from '@angular/core';
import { UserDto } from '../../../../model/user-dto';
import { UserService } from '../../../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../../services/auth/auth.service'; // Importa AuthService
import { BookingService } from '../../../../services/booking/booking.service';
import { BookingDto } from '../../../../model/booking-dto';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';
@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css'],
})
export class UserPanelComponent implements OnInit {
  userDto!: UserDto;
  profileImageUrl: string = '';
  selectedImageKey: string | null = null;
  predefinedImageKeys: string[] = [];
  predefinedImages: Record<string, string> = {
    'image1': 'url1.jpg',
    'image2': 'url2.jpg',
    'image3': 'url3.jpg'
  };
  currentUserID: number = 0; 
  bookings: BookingDto[] = []; 
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private authService: AuthService,
    private bookingService: BookingService,
    public dialog: MatDialog
      ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getUser();
    if (currentUser) {
      this.currentUserID = currentUser.id; 
    }

    this.route.params.subscribe((params) => {
      const userId = +params['userId'];
      this.loadUserDetails(userId);
      this.loadUserBookings(userId); 
    });

    this.predefinedImageKeys = Object.keys(this.predefinedImages);
  
  }

  openDialog(bookingId: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.cancelBooking(bookingId);
      }
    });
  }
  
  loadUserBookings(userId: number) {
    this.bookingService.getAllBookingsByUser(userId).subscribe({
      next: (bookings) => {
        this.bookings = bookings;
      },
      error: (err) => console.error(err),
    });
  }

  loadUserDetails(userId: number) {
    this.userService.getUserById(userId).subscribe({
      next: (u) => {
        this.userDto = u;
        this.profileImageUrl = u.image;

      },
      error: (err) => console.error(err),
    });
  }

  openImageSelectionModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  saveProfileImage() {
    if (!this.selectedImageKey) {
      console.error('Nessuna immagine selezionata');
      return;
    }

    const selectedImageUrl = this.predefinedImages[this.selectedImageKey];
    this.userService.uploadUserProfileImage(this.userDto.id, selectedImageUrl).subscribe(
      (response) => {
        console.log('Immagine del profilo caricata con successo');
        this.loadUserDetails(this.userDto.id);
      },
      (error) => {
        this.loadUserDetails(this.userDto.id);
        console.error('Errore durante il caricamento dell\'immagine del profilo', error);
      }
    );
  }

  selectPredefinedImage(imageKey: string) {
    this.selectedImageKey = imageKey;
  }


  cancelBooking(bookingId: number) {
    this.bookingService.cancelBooking(bookingId).subscribe(
        () => {
            this.bookings = this.bookings.filter(booking => booking.bookingId !== bookingId);
        },
        error => {
          alert("Impossibile cancellare. Per informazioni contattare l'host.")
            console.error('Errore durante la cancellazione della prenotazione', error);
        }
    );
}
}
