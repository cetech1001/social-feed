import { Component, OnInit } from '@angular/core';
import {UserLoginDetails} from '../../helpers/interfaces/common';
import {AuthService} from '../../helpers/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(public authService: AuthService) { }

  public userLoginDetails: UserLoginDetails = {
    username: '',
    password: ''
  };

  ngOnInit() {
  }

  submit(): void {
    this.authService.login(this.userLoginDetails);
  }

}
