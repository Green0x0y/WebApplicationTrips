import { Component, OnInit } from '@angular/core';
import { ChangeCurrencyService } from '../../service/change-currency-service/change-currency.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  constructor( public changeCurrencyService : ChangeCurrencyService) { }
  ngOnInit(): void {} 
}
