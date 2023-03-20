import { Pipe, PipeTransform } from '@angular/core';
import {Trip} from "../TripExample";
@Pipe({
  name: 'filterTrips'
})
export class FilterPipe implements PipeTransform {

  transform(trips: Trip[], 
    country: string[], 
    rating: number[], 
    minPrice: number, 
    maxPrice: number, 
    currency: number): 
    Trip[] {
    let res = trips;
    if (res ){
      if (country.length > 0) {
        let rightCountries1 = [];
        for (let oneCountry of country) {
          oneCountry = oneCountry.toLowerCase();
          rightCountries1.push(...res.filter(trip => 
            trip.country.toLowerCase().includes(oneCountry)));
        }
        res = rightCountries1;
      }
    }
    if (res){
      if (rating.length > 0) {
        let rightCountries2 = [];
        for (let star of rating) {
          rightCountries2.push(...res.filter(trip => 
            trip.currentStars == star));
        }
        res = rightCountries2;
      }
    }
    if (res){
      if (minPrice >= 0 && maxPrice >= 0) {
        res = res.filter(trip => minPrice <= Math.round(100 * trip.price * currency)/100 &&
          Math.round(100*trip.price)/100 * currency <= maxPrice)
      }
    }
      res.sort((a, b) => a.name.localeCompare(b.name))
      return res;
    }

}
