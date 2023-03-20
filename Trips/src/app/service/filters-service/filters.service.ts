import { Injectable } from '@angular/core';
import {FireBaseService} from "../fire-base-service/fire-base.service";
import { ChangeCurrencyService } from '../change-currency-service/change-currency.service';
import {Trip} from "../../TripExample";
import {FilterPipe} from "../../filter-pipe/filter.pipe";

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  filterPipe = new FilterPipe();
  trips: Trip[] = [];
  minPrice: number = 0;
  maxPrice: number = 0;
  countries: any[] = [];
  ratings: any[] = [];
  

  constructor( public chCur: ChangeCurrencyService, public firebase: FireBaseService) {
    this.firebase.trips.subscribe(data => {  this.trips = data;
      this.minPrice = data.sort((trip1: { price: number; }, trip2: { price: number; }) => 
      trip1.price - trip2.price)[0].price* this.chCur.money[this.chCur.moneyNow].multiply;
      this.maxPrice = data.sort((trip1: { price: number; }, trip2: { price: number; }) => 
      -trip1.price + trip2.price)[0].price* this.chCur.money[this.chCur.moneyNow].multiply;
  })
  }
  updatePrice() {
    this.minPrice = this.min();
    this.maxPrice = this.max(); 
  }
  
  max() {
    return Math.max((this.filterPipe.transform(this.trips, this.countries, this.ratings,0, 12500, 
      this.chCur.money[this.chCur.moneyNow].multiply).map(trip => 
        trip.price).sort((a, b) => b - a)[0] *this.chCur.money[this.chCur.moneyNow].multiply),0);
  }

  min() {
    return Math.max(( this.filterPipe.transform(this.trips, this.countries, this.ratings,0, 12500, 
        this.chCur.money[this.chCur.moneyNow].multiply).map(trip => 
          trip.price).sort((a, b) => a - b)[0] * this.chCur.money[this.chCur.moneyNow].multiply),0);
    
  }
  countriesList() {
    let countries = new Set();
    this.trips.forEach(trip => countries.add(trip.country));
    let countriesList = Array.from(countries);
    return countriesList;
  }
  filterCountry(checkedCountry: any) {
    if (this.countries.includes(checkedCountry))
      this.countries.splice(this.countries.indexOf(checkedCountry), 1);
    else 
      this.countries.push(checkedCountry);
    this.countries = Object.assign([], this.countries);
    this.minPrice = this.min();
    this.maxPrice = this.max();
  }

  ratingsList() {
    let ratings = new Set();
    this.trips.forEach(trip => ratings.add(trip.currentStars));
    let ratingsList = Array.from(ratings)
    return ratingsList.sort();
  }

  filterRating(checkedRating: any) {
    if (this.ratings.includes(checkedRating))
      this.ratings.splice(this.ratings.indexOf(checkedRating), 1);
    else
      this.ratings.push(checkedRating);
    this.ratings = Object.assign([], this.ratings);
    this.minPrice = this.min();
    this.maxPrice = this.max();
  }


  resetFilters() {
    this.minPrice = this.min();
    this.maxPrice =this.max();
    this.trips = this.trips;
    this.countries = [];
    this.ratings = [];
    
  }

}