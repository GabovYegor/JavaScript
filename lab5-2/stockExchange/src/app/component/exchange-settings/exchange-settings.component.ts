import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../../service/http.service";

@Component({
  selector: 'app-exchange-settings',
  templateUrl: './exchange-settings.component.html',
  styleUrls: ['./exchange-settings.component.less'],
  providers: [HttpService]
})

export class ExchangeSettingsComponent implements OnInit {
  constructor(private httpService: HttpService){}

  ngOnInit() {
    this.httpService.initExchangeSettings().subscribe(this.initExchangeSettings)
  }

  initExchangeSettings(data){
    this.dateStartValue = data.dateStart
    this.timeStartValue = data.timeStart
    this.tradingDuration = data.tradingDuration
    this.timeToRecountShare = data.timeToRecountShare
  }

  dateCondition:boolean = false
  timeCondition:boolean = false
  tradingDurationCondition:boolean = false
  timeToRecountShareCondition:boolean = false

  dateStartValue:string = '01.01.2020'
  timeStartValue:string = '10:00'
  tradingDuration:string = '100'
  timeToRecountShare:string = '200'

  print(){
    console.log('kekes')
  }

  showDataStartChangeField(){ this.dateCondition = !this.dateCondition }
  showTimeStartChangeField(){ this.timeCondition = !this.timeCondition }
  showTradingDurationChangeField(){ this.tradingDurationCondition = !this.tradingDurationCondition }
  showTimeToRecountStoreChangeField(){ this.timeToRecountShareCondition = !this.timeToRecountShareCondition }
}
