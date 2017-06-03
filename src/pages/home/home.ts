import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { CategoryPage } from '../pages';
import {Api} from '../../providers/shared';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  favitem: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public api: Api, public loadCtrl: LoadingController) {}


    ionViewDidLoad() {
    if (this.api.IDStola == undefined) {
      this.navCtrl.popToRoot();
    } 
      console.log(this.api.menu);
      this.api.dayitem().subscribe((data) =>{
        this.favitem = data;
        console.log(data);
       
      })
    
  }

  MoveToCat() {
      this.navCtrl.push(CategoryPage);
  }

goToDetails() {
  
}

}
