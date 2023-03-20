import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTripComponent } from './change-trip.component';

describe('ChangeTripComponent', () => {
  let component: ChangeTripComponent;
  let fixture: ComponentFixture<ChangeTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeTripComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
