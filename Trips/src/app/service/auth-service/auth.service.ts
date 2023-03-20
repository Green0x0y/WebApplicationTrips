import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import {Observable} from "rxjs";
import { PersistanceService } from '../persistence-service/persistance.service';
import { UserService } from '../user-service/user.service';
import { User } from '../../UserExample';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  aboutUsers!: Observable<any>;
  
  constructor(public firebaseAuth : AngularFireAuth, public router: Router, public userSv: UserService, public persServ: PersistanceService) {
    this.aboutUsers = firebaseAuth.authState;
    this.persServ.persistence.subscribe(elem => {
      this.persServ.setPersistence(elem);
    })
   }
  signIn(email: string, password: string){
  this.firebaseAuth.signInWithEmailAndPassword(email,password)
    .then(() =>{
      this.router.navigate(['mainpage']);
  })
  }
  signUp(email: string, password: string){
  this.firebaseAuth.createUserWithEmailAndPassword(email,password)
    .then(res=>{
       this.router.navigate(['mainpage']);
        let user = new User(res.user!.uid, email, 0,  [],  false);
        this.userSv.addUser(user);
  })
  }
  logout(){
    this.firebaseAuth.signOut();
  }
}