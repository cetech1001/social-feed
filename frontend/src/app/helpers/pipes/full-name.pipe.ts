import { Pipe, PipeTransform } from '@angular/core';
import {UsersService} from '../services/users.service';
import {User} from '../interfaces/common';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {
  constructor(public usersService: UsersService) {}


  transform(value: string): string {
    let fullName = '';

    this.usersService.users
      .subscribe((users: User[]) => {
        users.forEach(user => {
          if (user.username === value) {
            fullName = `${user.firstName} ${user.lastName}`;
          }
        });
      });

    return fullName;
  }

}
