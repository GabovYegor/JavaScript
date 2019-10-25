import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {
  }

  sendExchangeSettings(body){
    console.log('call send function')
    return this.http.post('http://localhost:8080/' + 'exchangeSettings', body, httpOptions)
  }

  initExchangeSettings(){
    return this.http.get('http://localhost:8080/' + 'initExchangeSettings', httpOptions)
  }

  initBrokerMas(){
    return this.http.get('http://localhost:8080/' + 'initBrokerMas', httpOptions)
  }

  initShareMas(){
    return this.http.get('http://localhost:8080/' + 'initShareMas', httpOptions)
  }

  addBrokerToDataBase(body){
    console.log('call add broker function')
    return this.http.post('http://localhost:8080/' + 'addBroker', body, httpOptions)
  }

  addShareToDataBase(body){
    console.log('call add share function')
    return this.http.post('http://localhost:8080/' + 'addShare', body, httpOptions)
  }

  deleteBrokerFromDataBaseByID(ID){
    return this.http.post('http://localhost:8080/' + 'deleteBroker', {ID: ID}, httpOptions)
  }

  deleteShareFromDataBaseByID(ID){
    return this.http.post('http://localhost:8080/' + 'deleteShare', {ID: ID}, httpOptions)
  }

  changeBrokerAmountOfMoneyByID(ID, newMoney){
    return this.http.post('http://localhost:8080/' + 'updateBroker', {ID: ID, newMoney: newMoney}, httpOptions)
  }
}
