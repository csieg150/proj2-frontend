import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../services/user.service';
import { LoginForm } from '../models/LoginForm';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() loginAccess: EventEmitter<string> = new EventEmitter();
  username: string;
  password: string;
  error: boolean;


  constructor(private userService: UserService) {
    this.username = '';
    this.password = '';
    this.error = false;
  }

  ngOnInit(): void {
  }

  login(): void{
    this.error = false;
    const login: LoginForm = {
      username: this.username,
      password: this.password
    };
    console.log(login);
    this.userService.login(login).subscribe(
      data => {
        console.log(data);
        this.loginAccess.emit(data.firstName + ' ' + data.lastName);
      },
      error => {
        console.log(error);
        this.error = true;
      }
    );
  }

}
