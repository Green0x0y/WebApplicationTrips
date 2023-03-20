import { Component, OnInit } from '@angular/core';
import { FireBaseService } from 'src/app/service/fire-base-service/fire-base.service';
import { ActivatedRoute } from '@angular/router';
import { ChangeCurrencyService } from 'src/app/service/change-currency-service/change-currency.service';
@Component({
  selector: 'app-single-trip-manager',
  templateUrl: './single-trip-manager.component.html',
  styleUrls: ['./single-trip-manager.component.css']
})
export class SingleTripManagerComponent implements OnInit {

  trip: any;
  

  constructor(public dbService: FireBaseService, public route: ActivatedRoute,
              public changeCurrencyService: ChangeCurrencyService) { }

  ngOnInit(): void {
    this.dbService.trips.subscribe(e => {
      this.route.paramMap.subscribe(parameters => {
        this.trip = e.filter((trip: { num: string | null; }) => trip.num == parameters.get('num'))[0];
      })
    })
  }


}
