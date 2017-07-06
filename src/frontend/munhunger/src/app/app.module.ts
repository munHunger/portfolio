import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {EventComponent} from "./event/event.component";
import {StockComponent} from "./stock/stock.component";
import {WunderbarService} from "./wunderbar.service";
import {ItemComponent} from "./stock/item/item.component";
import {LoginComponent} from "./login/login.component";
import {CookieService} from "angular2-cookie/core";
import {UserService} from "./user.service";

@NgModule({
  declarations: [
    EventComponent,
    StockComponent,
    ItemComponent,
    LoginComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [WunderbarService, CookieService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
