import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsReviewsComponent } from './rooms-reviews.component';

describe('RoomsReviewsComponent', () => {
  let component: RoomsReviewsComponent;
  let fixture: ComponentFixture<RoomsReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomsReviewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomsReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
