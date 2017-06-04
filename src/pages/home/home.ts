import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { CategoryPage, ItemdetailPage } from '../pages';
import {Api} from '../../providers/shared';


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
       let loader = this.loadCtrl.create({
        content: 'Загрузка данных',
        spinner: 'crescent'
      })
      loader.present().then(()=>{
       this.api.dayitem().subscribe((data) =>{
        
        this.favitem = data;
       loader.dismiss();
      }),
      (error) => {
        alert(error);
        loader.dismiss();
      }
      });
     
    
  }
   
    

  MoveToCat() {
      this.navCtrl.push(CategoryPage);
  }

goToDetails($event, item) {
    this.navCtrl.push(ItemdetailPage, item);
  }
}
