import {Component, OnInit} from '@angular/core';
import {ChangeCurrencyService} from "../../service/change-currency-service/change-currency.service";
import {FiltersService} from "../../service/filters-service/filters.service";
import { Options} from "@angular-slider/ngx-slider";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})

export class NavMenuComponent implements OnInit {
  
  avilableMoney: Options = {
    floor: 0,
    ceil: 12500,
    step: 10,
    translate: (value: number) => {
        return value + this.changeCurrencyService.money[this.changeCurrencyService.moneyNow].sign;
    }
  }
  constructor(public filtersService: FiltersService,
              public changeCurrencyService: ChangeCurrencyService) { }

  ngOnInit(): void {}
}
