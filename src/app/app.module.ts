import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BasicAuthInterceptor} from "./service/auth.interceptor";
import { WishComponent } from './wish/wish.component';
import {SharedModule} from "./shared/shared.module";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {RegistrationModule} from "./registartion/registration.module";

@NgModule({
  declarations: [
    AppComponent,
    WishComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    RegistrationModule,
    FontAwesomeModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
