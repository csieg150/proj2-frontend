import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../services/user.service';
import { SignupForm } from '../models/SignupForm';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @Output() signupAccess: EventEmitter<string> = new EventEmitter();
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  error: boolean;
  errorEmptyField: boolean;

  constructor(private userService: UserService) {
    this.firstName = '';
    this.lastName = '';
    this.username = '';
    this.password = '';
    this.email = '';
    this.error = false;
    this.errorEmptyField = false;
   }

  ngOnInit(): void {
  }

  signup(): void{
    if (this.username === '' || this.password === '' || this.email === '' || this.firstName === '' || this.lastName === '' ){
      this.errorEmptyField = true;
      return;
    }
    this.errorEmptyField = false;
    this.error = false;
    const signUp: SignupForm = {
      username: this.username,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email
    };
    this.userService.signup(signUp).subscribe(
      data => {
        this.signupAccess.emit(data.firstName + ' ' + data.lastName);
      },
      error => {
        this.error = true;
      }
    );

    // this.signupAccess.emit(true);
  }

}
