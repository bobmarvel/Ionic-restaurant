import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import {Api} from '../../providers/shared';
import {ItemdetailPage} from '../pages';

/*
  Generated class for the Item page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-item',
  templateUrl: 'item.html'
})
export class ItemPage {
   foods =  [];
   selectedCategory = this.navParams.data;
   
  constructor(public navCtrl: NavController, public navParams: NavParams, private api: Api, private loadCtrl: LoadingController) {
   
  }

  ionViewDidLoad() {
  
   

    let loader = this.loadCtrl.create({
        content: 'Загрузка данных',
        spinner: 'crescent'
      })
      loader.present().then(()=>{
       this.api.getFoodData(this.selectedCategory.id).subscribe((data) => {
     this.foods = data.foods;
     console.log(this.foods);
     loader.dismiss();
   })
      });
    }

  goToDetails($event, food) {
    this.navCtrl.push(ItemdetailPage, food);
  }

  goHome() {
    this.navCtrl.popToRoot();
  }
  }
  
