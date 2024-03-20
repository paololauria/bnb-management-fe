import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesRoomPreviewComponent } from './images-room-preview.component';

describe('ImagesRoomPreviewComponent', () => {
  let component: ImagesRoomPreviewComponent;
  let fixture: ComponentFixture<ImagesRoomPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImagesRoomPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImagesRoomPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
