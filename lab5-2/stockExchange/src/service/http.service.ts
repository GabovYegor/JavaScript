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
  sendData(body){
    return this.http.post('http://localhost:8080/', body, httpOptions)
  }
  getData(){
    const params = new HttpParams().set('number', 'some data');
    return this.http.get('http://localhost:8080/' + 456, httpOptions)
  }

  initExchangeSettings(){
    return this.http.get('http://localhost:8080/' + 'initExchangeSettings', httpOptions)
  }
}
