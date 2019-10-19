import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../helpers/services/auth.service';
import {User} from '../../helpers/interfaces/common';
import {UsersService} from '../../helpers/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public authService: AuthService, public usersService: UsersService) { }

  public user: User;

  ngOnInit() {
    this.usersService.getAllUsers();
    this.authService.currentUser
      .subscribe((user: User) => {
        this.user = user;
      });
  }

  public get fullName(): string {
    return `${this.user.firstName} ${this.user.lastName}`;
  }

}
