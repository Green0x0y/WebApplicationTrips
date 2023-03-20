import { Component, OnInit  } from '@angular/core';
import { FormBuilder, Validators} from "@angular/forms";
import { AuthService } from '../../service/auth-service/auth.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{
  signIn = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });
  constructor(public formBuilder: FormBuilder, public authService: AuthService
    ) { }

  ngOnInit(): void {}
  submit() {
    this.authService.signIn(this.signIn.value.email!, this.signIn.value.password!);
  }
}
