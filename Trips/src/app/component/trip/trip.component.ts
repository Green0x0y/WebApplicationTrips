import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ChangeCurrencyService} from "../../service/change-currency-service/change-currency.service";
import {Trip} from "../../TripExample";
import { FiltersService } from '../../service/filters-service/filters.service';
import { FireBaseService } from '../../service/fire-base-service/fire-base.service';
@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})

export class TripComponent implements OnInit {
  @Input() trip!: Trip;
  @Output() deleteEvent = new EventEmitter<any>();
  possibleRating = [1, 2, 3, 4, 5];
  
  constructor( public changeCurrencyService: ChangeCurrencyService, public firebase: FireBaseService,
     public filtersService: FiltersService) {}
  ngOnInit(): void {}
  
  last(trip: Trip){return trip.max - trip.chosen <= 0;};
  
  deleteTrip() {this.deleteEvent.emit(this.trip);}
}
