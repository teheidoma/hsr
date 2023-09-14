import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {NavbarItemComponent} from "./components/navbar-item/navbar-item.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RouterLink} from "@angular/router";
import {WishFeaturedComponent} from "./components/wish/wish-featured/wish-featured.component";
import {WishBannerComponent} from "./components/wish/wish-banner/wish-banner.component";
import {WishLastLegendaryComponent} from "./components/wish/wish-last-legendary/wish-last-legendary.component";
import {WishTableComponent} from "./components/wish/wish-table/wish-table.component";
import { WishRatioComponent } from './components/wish/wish-ratio/wish-ratio.component';
import { WishCardComponent } from './components/wish/wish-card/wish-card.component';



@NgModule({
  declarations: [
    HeaderComponent,
    NavbarComponent,
    NavbarItemComponent,
    WishFeaturedComponent,
    WishBannerComponent,
    WishLastLegendaryComponent,
    WishTableComponent,
    WishRatioComponent,
    WishCardComponent
  ],
    exports: [
        HeaderComponent,
        NavbarComponent,
        NavbarItemComponent,
        WishFeaturedComponent,
        WishBannerComponent,
        WishLastLegendaryComponent,
        WishTableComponent,
        WishRatioComponent,
        WishCardComponent,
    ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterLink
  ]
})
export class SharedModule { }
