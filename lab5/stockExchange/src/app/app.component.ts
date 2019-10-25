import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'stockExchange';
  constructor(private router:Router) {
    this.router.navigate(['exchangeSettings']);
  }
  redirectOnLoad(){
    console.log('navigate work !!!')
    this.router.navigate(['exchangeSettings']);
  }
}
