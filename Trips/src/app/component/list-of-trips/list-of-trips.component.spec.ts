import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfTripsComponent } from './list-of-trips.component';


describe('ListOfTripsComponent', () => {
  let component: ListOfTripsComponent;
  let fixture: ComponentFixture<ListOfTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfTripsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
