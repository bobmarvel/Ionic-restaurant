import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/*@IonicPage()*/
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

}
