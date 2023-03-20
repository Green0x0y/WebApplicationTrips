import { Component, Input, OnInit } from '@angular/core';
import { Trip} from 'src/app/TripExample';
import {FormBuilder, Validators, FormControl, FormArray} from "@angular/forms";
import { FiltersService } from 'src/app/service/filters-service/filters.service';
import { FireBaseService } from 'src/app/service/fire-base-service/fire-base.service';
@Component({
  selector: 'app-change-trip',
  templateUrl: './change-trip.component.html',
  styleUrls: ['./change-trip.component.css']
})
export class ChangeTripComponent implements OnInit{
  @Input() trip!: Trip;
  changedTrip = this.fb.group({
    name: ['', [Validators.pattern('[a-zA-Z ]*'), this.duplicateNameValidator.bind(this)]],
    country: ['', [Validators.pattern('[a-zA-Z ]*')]],
    price: [0, [Validators.min(0), Validators.max(12500)]],
    maxAmount: [0, [Validators.min(0)]],
    description: ['', [Validators.minLength(25)]],
    photo:[''],
  })
  constructor(public fb: FormBuilder, public filtersService: FiltersService, public fireBase: FireBaseService) { }
  ngOnInit(): void {
  }

  duplicateNameValidator(control: FormControl) {
    let name = control.value;
    if (name && this.filtersService.trips.map(trip => trip.name).includes(name)) {
      return { duplicateName : {name: name}};}
    return null;
  }

  updateTrip(changedTrip: any) {
    this.trip.name = changedTrip.name != null && changedTrip.name != '' ? changedTrip.name : this.trip.name;
    this.trip.country = changedTrip.country != null && changedTrip.country != '' ? changedTrip.country : this.trip.country;
    this.trip.max = changedTrip.maxAmount > 0 ? changedTrip.maxAmount : this.trip.max;
    this.trip.price = changedTrip.price >= 1 ? changedTrip.price : this.trip.price;
    this.trip.description = changedTrip.description != null && changedTrip.description != '' ? changedTrip.description : this.trip.description;
    this.fireBase.changeT(this.trip);
  }

  onSubmit() {
    this.updateTrip(this.changedTrip.value);
    this.changedTrip.reset();
    this.filtersService.updatePrice();
  }
}

