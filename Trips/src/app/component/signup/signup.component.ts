import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import { AuthService } from '../../service/auth-service/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  signup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirm: ['', [Validators.required, this.confirmPasswordValidator.bind(this)]]
  });

  constructor(public fb: FormBuilder, public authService: AuthService) { }
  submit() {
    this.authService.signUp( this.signup.value.email!, this.signup.value.password!);
  }
  ngOnInit(): void {
  }

  confirmPasswordValidator(control: FormControl) {
    if (!this.signup) {
      return null;
    }
    let password = this.signup.value.password;
    let confirm = control.value;
    if (password != confirm) {
      return {
        confirmPassword: {
          confirmPassword: confirm
        }
      };
    }
    return null;
  }

  

};
