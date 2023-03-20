import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTripManagerComponent } from './single-trip-manager.component';

describe('SingleTripManagerComponent', () => {
  let component: SingleTripManagerComponent;
  let fixture: ComponentFixture<SingleTripManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleTripManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleTripManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
