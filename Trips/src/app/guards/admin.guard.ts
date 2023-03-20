import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { map, Observable, of, switchMap, take} from 'rxjs';
import { AuthService } from '../service/auth-service/auth.service';
import { UserService } from '../service/user-service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(public authService: AuthService, public userService: UserService, public router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.firebaseAuth.authState.pipe(
take(1),switchMap(user => {
        if (user != null) 
          return this.userService.angularFireDatabase.object('users/' + user.uid).valueChanges().pipe(take(1))
        else{
          this.router.navigate(['']);
          return of(null);}}), // zwraca typ null
      
      map(userT => {
        // @ts-ignore
        if (userT.type >= 2) return true;
        else {
          this.router.navigate(['']);
          return false;
        };})
    )}
  
}
