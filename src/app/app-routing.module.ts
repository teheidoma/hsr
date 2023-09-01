import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WishComponent} from "./wish/wish.component";
import {registrationRoutes} from './registartion/registration.module'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'wish/total',
    pathMatch: 'full'
  },
  {path: 'wish/standard', component: WishComponent, data: {gacha_type: 1}},
  {path: 'wish/event', component: WishComponent, data: {gacha_type: 11}},
  {path: 'wish/weapon', component: WishComponent, data: {gacha_type: 12}},
  {path: 'wish/new', component: WishComponent, data: {gacha_type: 2}},
  {path: 'wish/total', component: WishComponent, data: {gacha_type: -1}},
  ...registrationRoutes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
