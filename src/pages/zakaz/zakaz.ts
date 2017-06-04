import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-zakaz',
  templateUrl: 'zakaz.html',
})
export class ZakazPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Zakaz');
  }

goHome() {
      this.navCtrl.setRoot(HomePage);
      this.navCtrl.popToRoot;
  }


}
