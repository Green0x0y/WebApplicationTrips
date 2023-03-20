import { Component, OnInit}  from '@angular/core';
import { ChangeCurrencyService } from '../../service/change-currency-service/change-currency.service';
import { FiltersService } from '../../service/filters-service/filters.service';
import { AuthService } from '../../service/auth-service/auth.service';
import { User } from 'src/app/UserExample';
import { UserService } from '../../service/user-service/user.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  noLogin = new User('noLogin', 'none', -1, [], false);
  user!: User;

  constructor(public chCurr: ChangeCurrencyService, public filtersService: FiltersService,
    public authService: AuthService, public userService: UserService) { }
  ngOnInit() {
    this.authService.aboutUsers.subscribe(user => {
      if (user != null) {
        this.userService.users.subscribe(elem => {
          this.user = elem.filter((userT: { key: string; }) => userT.key == user.uid)[0];
        })
      }
      else 
        this.user = this.noLogin;
    });
  }

}
