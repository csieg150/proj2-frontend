import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../services/user.service';

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

  constructor(private userService: UserService) {
    this.firstName = '';
    this.lastName = '';
    this.username = '';
    this.password = '';
    this.email = '';
   }

  ngOnInit(): void {
  }

  signup(): void{

    // this.signupAccess.emit(true);
  }

}
