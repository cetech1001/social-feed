import { Component, OnInit } from '@angular/core';
import {User} from '../../helpers/interfaces/common';
import {AuthService} from '../../helpers/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  constructor(public authService: AuthService) { }

  public user: User = {
    username: '',
    lastName: '',
    firstName: '',
    password: ''
  };

  ngOnInit() {
  }

  submit(): void {
    this.authService.register(this.user);
  }
}
