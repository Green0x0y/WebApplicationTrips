import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/compat/database";
import {map, Observable} from "rxjs";
import {Trip} from "../../TripExample";

@Injectable({
  providedIn: 'root'
})
export class FireBaseService {
  trips!: Observable<any>;

  constructor(private firebase: AngularFireDatabase) {
    this.trips = this.getData();
  }

  getData(): Observable<any> {
    return this.firebase.list('trips').snapshotChanges().pipe(map(actions =>
      {
      return actions.map(ac => {
        let data : any = ac.payload.val();
        
        return new Trip(
          ac.payload.key, 
          data.num, 
          data.name, 
          data.country,  
          data.price, 
          data.max,
          data.description,  
          data.currentStars, 
          data.ratings, 
          data.chosen, 
          data.photo, 
          data.reviews);
      })
    }));
  }

  add(trip: Trip) {this.firebase.list('trips').push(trip)}

  removeT(trip: Trip) {this.firebase.list('trips').remove(trip.key)}

  rate(trip: Trip, numGrade: number) {
    trip.ratings.push(numGrade);
    trip.currentStars = Math.round(trip.ratings.reduce((a, b) => a + b) / trip.ratings.length);
    this.firebase.list('trips').update(trip.key, 
      {
        currentStars: trip.currentStars,
        ratings: trip.ratings
      });
  }

  review(trip: Trip) {this.firebase.list('trips').update(trip.key, {reviews: trip.reviews});
}
changeT(trip: Trip){
  this.firebase.list('trips').update(trip.key, 
    {name: trip.name, 
    country: trip.country, 
    price: trip.price,  
    max: trip.max, 
    description: trip.description, 
  })
}
}