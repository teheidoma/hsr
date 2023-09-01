import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegistrationStartComponent} from "./registration-start/registration-start.component";
import {RegistrationTokenComponent} from "./registration-token/registration-token.component";
import {RegistrationImportComponent} from "./registration-import/registration-import.component";
import {RegistrationFinishComponent} from "./registration-finish/registration-finish.component";
import {RegistrationErrortokenComponent} from './registration-errortoken/registration-errortoken.component';
import {Route} from "@angular/router";


export const registrationRoutes: Route[] = [
  {component: RegistrationStartComponent, path: 'registration'},
  {component: RegistrationTokenComponent, path: 'registration/token'},
  {component: RegistrationErrortokenComponent, path: 'registration/errortoken'},
  {component: RegistrationImportComponent, path: 'registration/import'},
  {component: RegistrationFinishComponent, path: 'registration/finish'},
]

@NgModule({
  declarations: [
    RegistrationStartComponent,
    RegistrationTokenComponent,
    RegistrationImportComponent,
    RegistrationFinishComponent,
    RegistrationErrortokenComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class RegistrationModule {
}
