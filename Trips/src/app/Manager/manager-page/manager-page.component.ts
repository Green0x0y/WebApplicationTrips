import { Component, OnInit } from '@angular/core';
import { FireBaseService } from 'src/app/service/fire-base-service/fire-base.service';
import { FiltersService } from 'src/app/service/filters-service/filters.service';
import { ChangeCurrencyService } from 'src/app/service/change-currency-service/change-currency.service';

@Component({
  selector: 'app-manager-page',
  templateUrl: './manager-page.component.html',
  styleUrls: ['./manager-page.component.css']
})
export class ManagerPageComponent implements OnInit {
constructor(public filtersService: FiltersService,public fireBaseService: FireBaseService, public changeCurrencyService: ChangeCurrencyService ){}
ngOnInit(): void {
}
}