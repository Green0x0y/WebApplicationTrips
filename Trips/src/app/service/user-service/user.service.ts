import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { User } from '../../UserExample';
import {Observable, map} from "rxjs";
import { Trip } from '../../TripExample';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  users!: Observable<any>;
  currentUser!: Observable<User>;
  constructor(public angularFireDatabase : AngularFireDatabase) { 
    this.users = this.angularFireDatabase.list('users').snapshotChanges().pipe(map(actions => {
      return actions.map(act => {
        let data = act.payload.val();
        // @ts-ignore
        let history = data.history;
        if (!history) {
          history = [];
        }
        // @ts-ignore
        return new User(act.payload.key, data.email, data.type, history, data.banned);
      })
    }));

  }
  addUser(user: User) {
    this.angularFireDatabase.list('users').set(user.key, 
      { email: user.email, 
        type: user.type,
      history: user.history, 
      banned: user.banned});
  }

  makeClient(user: User) {
    this.angularFireDatabase.list('users').update(
      user.key, 
      {type: 0});
  }

  makeManager(user: User) {
    this.angularFireDatabase.list('users').update(
      user.key, 
      {type: 1});
  }

  makeAdmin(user: User) {
    this.angularFireDatabase.list('users').update(
      user.key, 
      {type: 2});
  }

  updateHistory(user: User) {
    this.angularFireDatabase.list('users').update(
      user.key, 
      {history: user.history});
  }

  onOfBan(user: User, sentence: boolean) {
    this.angularFireDatabase.list('users').update(
      user.key, 
      {banned: sentence});
  }

  deleteTrip(trip: Trip) {
    this.users.subscribe(e => {
      for (let user of e) {
        for (let entry of user.history) {
          if (entry.id == trip.num) {
            user.history.splice(user.history.indexOf(entry), 1);
          }
        }
      }
      for (let user of e) {
        this.updateHistory(user);
      }
    })
  }
  
  
}