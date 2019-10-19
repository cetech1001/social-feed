import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home.component';
import {UsersComponent} from './users/users.component';
import {FeedsComponent} from './feeds/feeds.component';
import {ProfileComponent} from './profile/profile.component';
import {SearchComponent} from './search/search.component';
import {HomeRoutingModule} from './home-routing.module';
import {FormsModule} from '@angular/forms';
import {FullNamePipe} from '../helpers/pipes/full-name.pipe';
import {MatButtonModule} from '@angular/material';



@NgModule({
  declarations: [
    HomeComponent,
    UsersComponent,
    FeedsComponent,
    ProfileComponent,
    SearchComponent,
    FullNamePipe
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    MatButtonModule,
  ]
})
export class HomeModule { }
