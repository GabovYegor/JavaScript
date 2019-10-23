import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExchangeSettingsComponent } from './component/exchange-settings/exchange-settings.component';
import { BrokerListComponent } from './component/broker-list/broker-list.component';
import { ShareListComponent } from './component/share-list/share-list.component';

const routes: Routes = [
  {path: 'exchangeSettings', component: ExchangeSettingsComponent},
  {path: 'brokerList', component: BrokerListComponent},
  {path: 'shareList', component: ShareListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
