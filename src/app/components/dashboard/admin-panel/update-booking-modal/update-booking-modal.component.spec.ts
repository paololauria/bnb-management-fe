import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBookingModalComponent } from './update-booking-modal.component';

describe('UpdateBookingModalComponent', () => {
  let component: UpdateBookingModalComponent;
  let fixture: ComponentFixture<UpdateBookingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateBookingModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateBookingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
