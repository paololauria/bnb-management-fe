import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRoomsAvailableComponent } from './list-rooms-available.component';

describe('ListRoomsAvailableComponent', () => {
  let component: ListRoomsAvailableComponent;
  let fixture: ComponentFixture<ListRoomsAvailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListRoomsAvailableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListRoomsAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
