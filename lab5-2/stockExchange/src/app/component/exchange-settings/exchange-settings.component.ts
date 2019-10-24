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

  tempData:any
  ngOnInit() {
  }

  dateStartValue:string
  timeStartValue:string
  tradingDuration:string
  timeToRecountShare:string

  initExchangeSettings(){
    this.httpService.initExchangeSettings().subscribe((data) => this.tempData = {data})
    try {
      this.dateStartValue = this.tempData.data.dateStart
      this.timeStartValue = this.tempData.data.timeStart
      this.tradingDuration = this.tempData.data.tradingDuration
      this.timeToRecountShare = this.tempData.data.timeToRecountShare
    }
    catch (e) {
    }
  }

  dateCondition:boolean = false
  timeCondition:boolean = false
  tradingDurationCondition:boolean = false
  timeToRecountShareCondition:boolean = false

  sendExchangeSettings(){
    this.httpService.sendExchangeSettings(
      { dateStart: this.dateStartValue , timeStart: this.timeStartValue,
              tradingDuration: this.tradingDuration, timeToRecountShare: this.timeToRecountShare}).subscribe()
  }

  showDataStartChangeField(){ this.dateCondition = !this.dateCondition }
  showTimeStartChangeField(){ this.timeCondition = !this.timeCondition }
  showTradingDurationChangeField(){ this.tradingDurationCondition = !this.tradingDurationCondition }
  showTimeToRecountStoreChangeField(){ this.timeToRecountShareCondition = !this.timeToRecountShareCondition }
}
