import {Component, OnInit} from '@angular/core';

import {Trip} from '../../TripExample';
import { FiltersService } from '../../service/filters-service/filters.service';
import {ChangeCurrencyService} from "../../service/change-currency-service/change-currency.service";
import { FireBaseService } from '../../service/fire-base-service/fire-base.service';

@Component({
  selector: 'app-list-of-trips',
  templateUrl: './list-of-trips.component.html',
  styleUrls: ['./list-of-trips.component.css']
})
export class ListOfTripsComponent implements OnInit {
  constructor(public fltS: FiltersService, public chCurrS: ChangeCurrencyService,
    public fire: FireBaseService){}
  ngOnInit(): void {}
  
  delete(trip: Trip) {
    this.fire.removeT(trip);
    this.chCurrS.cancelT(trip);
    this.fltS.resetFilters();
  }
}
