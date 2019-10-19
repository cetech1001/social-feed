import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(public snackBar: MatSnackBar) { }

  public static baseUrl = 'http://localhost:3000';

  public log(message: string, error?: string): void {
    if (error) {
      console.error(error);
    }
    this.snackBar.open(message, 'CLOSE');
  }
}
