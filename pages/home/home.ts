import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MainPage } from '../main/main';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  mainPage = MainPage;
  audioList: any[] = [];
  constructor(public navCtrl: NavController) {

  }
  ionViewDidEnter(){
    this.audioList = [];
    localStorage.removeItem('audiolist');
  }
}
