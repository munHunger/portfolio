import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ExpandModalComponent } from './expand_modal/expandModal.component';
import {CookieService} from "angular2-cookie/core";

@NgModule({
  declarations: [
    AppComponent,
    ExpandModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
