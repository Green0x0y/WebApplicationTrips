import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import {map, Observable, take} from "rxjs";
import firebase from "firebase/compat/app";

@Injectable({
  providedIn: 'root'
})
export class PersistanceService {
  persistence!: Observable<any>;

  constructor(public auth: AngularFireAuth, public angularFireDatabase: AngularFireDatabase) {
    this.persistence = this.getPersistence();
  }

  getPersistence(): Observable<any> {
    return this.angularFireDatabase.object('persistence').valueChanges().pipe(take(1), 
    map(persistence => {
        // @ts-ignore
        return persistence.state;
      }
    ))
  }

  setPersistence(type: string) {
    let accepted = ['local', 'session', 'none'];
    if (!accepted.includes(type)) {
      return;
    }
    this.angularFireDatabase.object('persistence').update({state: type});
    switch (type) {
      case 'session':
        return this.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
      case 'local':
        return this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      case 'none':
        return this.auth.setPersistence(firebase.auth.Auth.Persistence.NONE);
      default:
        return;
    }
  }
}
