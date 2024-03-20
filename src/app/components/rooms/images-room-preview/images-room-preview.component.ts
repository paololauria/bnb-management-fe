import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-images-room-preview',
  templateUrl: './images-room-preview.component.html',
  styleUrl: './images-room-preview.component.css'
})
export class ImagesRoomPreviewComponent {
  constructor(private _bottomSheet: MatBottomSheet) {}

  openBottomSheet(): void {

  }
}


