import { Component ,OnInit} from '@angular/core';
import { User } from 'src/app/UserExample';
import { UserService } from 'src/app/service/user-service/user.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(public userService: UserService) {
    this.userService.users.subscribe(elem => {
      this.users = elem;
    })
  }

  ngOnInit(): void {
  }

}