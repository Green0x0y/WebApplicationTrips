import {Component, Input, OnInit} from '@angular/core';
import {Trip} from "../../TripExample";
import {FormBuilder, Validators} from "@angular/forms";
import {FireBaseService} from "../../service/fire-base-service/fire-base.service";
import { User } from '../../UserExample';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  @Input() trip!: Trip;
  @Input() user!: User;
  review = this.formBuilder.group({
    yourNick: ['', [Validators.required]],
    tripName: ['', [Validators.required]],
    opinion: ['', [ Validators.minLength(50), Validators.maxLength(500), Validators.required]],
    date: ['']
  })
  error = 0;

  constructor(public formBuilder: FormBuilder, public firebase: FireBaseService) { }

  ngOnInit(): void { }
  
  send() {
  // if (this.user.banned) {
  //     this.error = 1;
  //     return;}
    // let uHis = this.user.history.filter(el => el.id == this.trip.num);
    // if (uHis.length == 0) {
    //   this.error = 2;
    //   return;}
    // else{  
    this.error = 0
    this.trip.reviews.push({
      yourNick: this.review.value.yourNick, 
      tripName: this.review.value.tripName,
      opinion: this.review.value.opinion, 
      date: this.review.value.date});
    this.review.reset();
    this.firebase.review(this.trip);
  // }
}
}
