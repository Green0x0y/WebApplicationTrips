import { Component, OnInit } from '@angular/core';
import { Trip } from '../../TripExample';
import { FiltersService } from "../../service/filters-service/filters.service";
import { FormBuilder} from '@angular/forms';
import { Validators } from "@angular/forms";
import { FireBaseService } from '../../service/fire-base-service/fire-base.service';

@Component({
  selector: 'app-add-new-trip',
  templateUrl: './add-new-trip.component.html',
  styleUrls: ['./add-new-trip.component.css']
})
export class AddNewTripComponent implements OnInit {
  addTripForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.pattern('[A-Za-z ]*'), Validators.minLength(10)]],
    country: ['', [Validators.required, Validators.pattern('[A-Za-z ]*')]],
    max: [0, [ Validators.min(0), Validators.required,]],
    price: [0, [Validators.min(0), Validators.max(12500),Validators.required]],
    description: ['', [Validators.required ,Validators.minLength(25)]],
    photo: ['', [Validators.required]]
  });
  trips : Trip[] = [];
  constructor(public formBuilder: FormBuilder,public filtersService: FiltersService,
    public firebase: FireBaseService) {}
  ngOnInit(): void {
    this.firebase.trips.subscribe(data =>{
        this.trips = data;
    })
  }
  submit() {
    this.add(this.addTripForm.value);
    this.addTripForm.reset();
    this.filtersService.updatePrice();
  }
  add(trip: any) {
    const addTrip: Trip = {
      key: "",
      num :  this.trips.map(trip => trip.num).sort((a, b) => b - a)[0] + 1,
      name: trip.name,
      country: trip.country,
      max: trip.max,
      chosen: 0,
      price: trip.price,
      currentStars: 0,
      ratings: [],
      description: trip.description,
      photo: trip.photo,
      reviews: []};

    this.firebase.add(addTrip);}

 
}