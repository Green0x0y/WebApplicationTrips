import { Injectable } from '@angular/core';
//import {Trip} from "../fake-data";
import {Trip} from "../../TripExample";
import  {FireBaseService} from '../fire-base-service/fire-base.service'
export interface InCart {no: number; num: number; name: string; }

@Injectable({
  providedIn: 'root'})
export class ChangeCurrencyService {
  moneyNow = "zloty"
  cart: InCart[] = [];
  money: { [name: string]: { multiply: number, sign: string } } =
  {'dollar': {multiply: 1, sign: '$'},'euro': {multiply: 1.2, sign: '€'},'zloty': {multiply: 5, sign: 'zl'}};
  trips: Trip[] = [];

  constructor(public firebase: FireBaseService) {
    this.firebase.trips.subscribe(data => {
      this.trips = data;
    })
  }
  current(toChange: any) {this.moneyNow = toChange;}
  count = 0;
  sumCount() {
    let num = 0;
    for (let inCart of this.cart)  num += inCart.num;
    this.count = num;
    return num;
  }

  sumCost() {
    let sum = 0;
    for (let inCart of this.cart) {
      let elemCost = this.trips.filter(trip => trip.num == inCart.no).map(trip => trip.price)[0];
      sum += (inCart.num * elemCost);
    }
    return sum;
  }

  buy(trip: Trip) {
    if (this.cart.filter(inCart => inCart.no == trip.num).length > 0) 
      this.cart.forEach(inCart =>{ inCart.no == trip.num ? inCart.num++ : inCart.num;})
    else this.cart.push({no: trip.num, name: trip.name, num: 1});
    trip.chosen++;
    this.sumCount();}
    

  delete(trip: Trip) {
    this.cart.forEach(inCart => {if (inCart.no == trip.num) {
        if (this.isInStock(inCart.num)) {inCart.num--; trip.chosen--}
        else {this.cart.splice(this.cart.indexOf({no: trip.num, name: trip.name, num: 1}), 1);
        trip.chosen--; }}})
    this.sumCount();
  }
  isInStock(num: number){
    return num > 1;
  }
  
  cancelT(trip: Trip) {
    let itIn = this.cart.filter(inCart => inCart.no == trip.num)[0];
    if (itIn) {
      this.cart.splice(this.cart.indexOf(itIn), 1);
    }
  }
}
