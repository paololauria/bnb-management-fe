import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'], // Aggiunge gli stili CSS al componente
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>, // Riferimento al dialog
    @Inject(MAT_DIALOG_DATA) public data: any // Dati passati al dialog
  ) {}

  onDelete(): void {
    // Chiude il dialog e restituisce 'delete' come risultato
    this.dialogRef.close('delete');
  }

  onCancel(): void {
    // Chiude il dialog e restituisce 'cancel' come risultato
    this.dialogRef.close('cancel');
  }
}
