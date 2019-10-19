import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {GuestGuard} from './helpers/guards/guest.guard';
import {AuthGuard} from './helpers/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
