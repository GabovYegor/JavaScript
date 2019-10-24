import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../../service/http.service";

@Component({
  selector: 'app-share-list',
  templateUrl: './share-list.component.html',
  styleUrls: ['./share-list.component.less']
})
export class ShareListComponent implements OnInit {

  constructor(private httpService: HttpService) { }
  tempData:any
  showShareMas:boolean = false
  shareMas: any[]
  shareNumber: number
  addShareCondition:boolean = false
  addedShareTitle:string
  addedSharePrice:string
  addedShareMaxChangeValue:string
  addedShareDistribution:string
  addedShareNumberOfShare:string
  shareIDToDelete:number

  ngOnInit() {
    this.httpService.initShareMas().subscribe((data) => this.tempData = {data})
  }

  getShareMas(){
    this.showShareMas = !this.showShareMas
    this.shareMas = this.tempData.data
    this.shareNumber = this.shareMas.length + 1
    console.log(this.shareMas)
  }

  addShare(){
    this.shareMas.push({ shareTitle: this.addedShareTitle, sharePrice: this.addedSharePrice, maxChangeValue: this.addedShareMaxChangeValue,
                         distribution: this.addedShareDistribution, numberOfShare: this.addedShareNumberOfShare, ID: this.shareNumber++})
    this.httpService.addShareToDataBase(
      { shareTitle: this.addedShareTitle, sharePrice: this.addedSharePrice, maxChangeValue: this.addedShareMaxChangeValue,
        distribution: this.addedShareDistribution, numberOfShare: this.addedShareNumberOfShare}).subscribe()
    this.addedShareTitle = null
    this.addedSharePrice = null
    this.addedShareMaxChangeValue = null
    this.addedShareDistribution = null
    this.addedShareNumberOfShare = null
  }

  deleteShareById(){
    this.httpService.deleteShareFromDataBaseByID(this.shareIDToDelete).subscribe()
    for(let i = 0; i < this.shareMas.length; ++i){
      if(this.shareMas[i].ID == this.shareIDToDelete)
        this.shareMas.splice(i, 1)
    }
    this.shareIDToDelete = null
  }

  showAddBrokerField(){
    this.addShareCondition = !this.addShareCondition
  }
}
