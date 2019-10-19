import { Component, OnInit } from '@angular/core';
import {AuthService} from '../helpers/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthService) { }

  public search: string;

  ngOnInit() {
  }

  logout(): void {
    this.authService.logout();
  }

}
