import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExchangeSettingsComponent } from './component/exchange-settings/exchange-settings.component';
import {FormsModule} from "@angular/forms";
import { BrokerListComponent } from './component/broker-list/broker-list.component';
import { ShareListComponent } from './component/share-list/share-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ExchangeSettingsComponent,
    BrokerListComponent,
    ShareListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
