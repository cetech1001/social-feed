import { Injectable } from '@angular/core';
import {WebService} from './web.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../interfaces/common';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public webService: WebService, public http: HttpClient) {
    this.usersSubject = new BehaviorSubject<User[]>(this.usersStore);
    this.users = this.usersSubject.asObservable();
  }

  public usersStore: User[] = [];
  private usersSubject: BehaviorSubject<User[]>;
  public users: Observable<User[]>;

  public getAllUsers(): void {
    this.http.get(`${WebService.baseUrl}/users`)
      .subscribe(
        (users: User[]) => {
          this.usersStore = users;
          this.usersSubject.next(this.usersStore);
        },
        error => {
          this.webService.log('Failed to get users!', error);
        }
      );
  }
}
