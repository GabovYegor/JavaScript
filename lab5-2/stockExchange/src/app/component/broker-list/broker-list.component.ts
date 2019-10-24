import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../../service/http.service";

@Component({
  selector: 'app-broker-list',
  templateUrl: './broker-list.component.html',
  styleUrls: ['./broker-list.component.less']
})
export class BrokerListComponent implements OnInit {
  constructor(private httpService: HttpService) { }
  tempData:any
  brokerMas: any[]
  brokerNumber: number
  brokerIDToDelete: number
  brokerIDToChangeMoney: number
  brokerNewAmountOfMoney: string
  addBrokerCondition:boolean = false
  showBrokerMas:boolean = false
  addedBrokerUserName: string = ''
  addedBrokerAmountOfMoney: string = ''

  ngOnInit() {
    this.httpService.initBrokerMas().subscribe((data) => this.tempData = {data})
  }

  addBroker(){
    this.brokerMas.push({ userName: this.addedBrokerUserName, amountOfMoney: this.addedBrokerAmountOfMoney, ID: this.brokerNumber++})
    this.httpService.addBrokerToDataBase(
      { userName: this.addedBrokerUserName, amountOfMoney: this.addedBrokerAmountOfMoney }).subscribe()
    this.addedBrokerAmountOfMoney = ''
    this.addedBrokerUserName = ''
  }

  changeBrokerAmountOfMoneyByID(){
    for(let i = 0; i < this.brokerMas.length; ++i){
      if(this.brokerMas[i].ID == this.brokerIDToChangeMoney)
        this.brokerMas[i].amountOfMoney = this.brokerNewAmountOfMoney
    }
    this.httpService.changeBrokerAmountOfMoneyByID(this.brokerIDToChangeMoney, this.brokerNewAmountOfMoney).subscribe()
    console.log(this.brokerIDToChangeMoney, this.brokerNewAmountOfMoney)
    this.brokerNewAmountOfMoney = null
    this.brokerIDToChangeMoney = null
  }

  deleteBrokerById(){
    this.httpService.deleteBrokerFromDataBaseByID(this.brokerIDToDelete).subscribe()
    for(let i = 0; i < this.brokerMas.length; ++i){
      if(this.brokerMas[i].ID == this.brokerIDToDelete)
        this.brokerMas.splice(i, 1)
    }
    this.brokerIDToDelete = null
  }

  getBrokerMas(){
    this.showBrokerMas = !this.showBrokerMas
    this.brokerMas = this.tempData.data
    this.brokerNumber = this.brokerMas.length + 1
  }

  showAddBrokerField(){ this.addBrokerCondition = !this.addBrokerCondition }
}
