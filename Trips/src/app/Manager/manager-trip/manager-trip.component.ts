import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ChangeCurrencyService } from 'src/app/service/change-currency-service/change-currency.service';
import { Trip } from 'src/app/TripExample';
import { FiltersService } from 'src/app/service/filters-service/filters.service';
import { FireBaseService } from 'src/app/service/fire-base-service/fire-base.service';

@Component({
  selector: 'app-manager-trip',
  templateUrl: './manager-trip.component.html',
  styleUrls: ['./manager-trip.component.css']
})
export class ManagerTripComponent  implements OnInit{
  @Input() trip!: Trip;
    @Output() deleteEvent = new EventEmitter<any>();
    possibleRating = [1, 2, 3, 4, 5];
    
    constructor( public changeCurrencyService: ChangeCurrencyService, public firebase: FireBaseService,
       public filtersService: FiltersService) {}
    ngOnInit(): void {}
    
    last(trip: Trip){return trip.max - trip.chosen <= 0;};
    
    deleteTrip() {this.deleteEvent.emit(this.trip);}
}
