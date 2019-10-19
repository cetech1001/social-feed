import { Injectable } from '@angular/core';
import {WebService} from './web.service';
import {HttpClient} from '@angular/common/http';
import {AuthResponse, User, UserLoginDetails} from '../interfaces/common';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public webService: WebService, public http: HttpClient, public router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  public register(user: User): void {
    user.status = 'online';
    this.http.post(`${WebService.baseUrl}/create/user`, user)
      .subscribe(
        (response: AuthResponse) => {
          if (response.error) {
            this.webService.log(response.error);
          } else {
            localStorage.setItem('user', JSON.stringify(response.user));
            this.currentUserSubject.next(response.user);
            this.router.navigate(['home'])
              .then(() => {
                this.webService.log(response.message);
              });
          }
        },
        error => {
          this.webService.log('Failed to Register', error);
        }
      );
  }

  public login(user: UserLoginDetails): void {
    this.http.post(`${WebService.baseUrl}/login`, user)
      .subscribe(
        (response: AuthResponse) => {
          if (response.error) {
            this.webService.log(response.error);
          } else {
            localStorage.setItem('user', JSON.stringify(response.user));
            this.currentUserSubject.next(response.user);
            this.router.navigate(['home'])
              .then(() => {
                this.webService.log(response.message);
              });
          }
        },
        error => {
          this.webService.log('Failed to Login', error);
        }
      );
  }

  public logout(): void {
    this.currentUser
      .subscribe((user: User) => {
        this.http.post(`${WebService.baseUrl}/logout`, user)
          .subscribe(
            (response: {message: string; }) => {
              localStorage.clear();
              return this.router.navigate(['/'])
                .then(() => {
                  this.webService.log(response.message);
                });
            },
            error => {
              this.webService.log('Failed to Logout', error);
            }
          );
      });
  }
}
