
import { Component, OnInit } from '@angular/core';
import {ChangeCurrencyService} from "../../service/change-currency-service/change-currency.service";
import {FireBaseService} from "../../service/fire-base-service/fire-base.service";
import {ActivatedRoute} from "@angular/router";
import { FiltersService } from "../../service/filters-service/filters.service";
import {FilterPipe} from "../../filter-pipe/filter.pipe";
import {Trip} from "../../TripExample"
import { User } from '../../UserExample';
import { AuthService } from '../../service/auth-service/auth.service';
import { UserService } from '../../service/user-service/user.service';
@Component({
  selector: 'app-single-trip',
  templateUrl: './single-trip.component.html',
  styleUrls: ['./single-trip.component.css']
})
export class SingleTripComponent implements OnInit {
  filterPipe = new FilterPipe;
  currentStars = 0;
  trip: any;
  possibleRatings = [1, 2, 3, 4, 5];
  ratedOnce = false;
  rating = 0;
  user!: User;
  error = 0;
  
  constructor(public changeCurrencyService: ChangeCurrencyService, public firestore: FireBaseService,
    public filtersService: FiltersService, public activatedRoute: ActivatedRoute, public auth : AuthService,
    public userService: UserService) { }

  ngOnInit(): void {
    this.firestore.trips.subscribe(data => {
      this.activatedRoute.paramMap.subscribe(parameters => {
        this.trip = data.filter((trip: { num: string; }) => 
        trip.num == parameters.get('num'))[0];
      })
    })
    this.auth.aboutUsers.subscribe(user => {
      if (user != null) {
        this.userService.users.subscribe(elem => {
          this.user = elem.filter((userT: { key: string; }) => userT.key == user.uid)[0];
          for (let el of this.user.history) {
            if (el.id == this.trip.num) {
              this.ratedOnce = el.rated;
              this.rating = el.rating;
            }
          }
        })
      }
    });
  }
  rate(trip:Trip, elem: number) {
    if (this.user.type == 1) {
      this.error = 1
      return; }
    if (this.user.banned) {
      this.error = 2
      return;}
      
    let Uhis= this.user.history.filter(el => el.id == trip.num);
    if (Uhis.length == 0) {
       this.error = 3;
       return;
     }
    if (Uhis[0].rated) {
      this.error = 4;
      return;
    }
    else {
      this.error = 0;
      this.firestore.rate(this.trip, elem);
      for (let el of this.user.history) {
        if (el.id == trip.num) {
          el.rated = true;
          el.rating = elem;
          this.currentStars = elem;
          this.userService.updateHistory(this.user);
        }
      }
    }
  }
  isInStock(trip: Trip) {return trip.max - trip.chosen > 0;}

  
}