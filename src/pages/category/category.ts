import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import {ItemPage} from '../pages';
import {Api} from '../../providers/shared';

/*
  Generated class for the Category page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {

  categories: any;
  /*images: any =  [
    "https://www.colourbox.com/preview/8477922-set-with-different-drinks-on-black-background.jpg",
    "http://medias.photodeck.com/e987f240-5703-45d9-a98c-12d2ed4e853f/29LN0615-7_xlarge.jpg",
    "https://ak5.picdn.net/shutterstock/videos/8441167/thumb/1.jpg",
    "https://ak3.picdn.net/shutterstock/videos/12293912/thumb/4.jpg"
  ];*/

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private api: Api, private loadCtrl: LoadingController) {}

  

  ionViewDidLoad() {
    
    


    if (this.api.IDStola == undefined) {
      this.navCtrl.popToRoot();
    } 
    else {
      let loader = this.loadCtrl.create({
        content: 'Загрузка данных',
        spinner: 'crescent'
      })
      loader.present().then(()=>{
        this.api.getCategory().then(data => {
        this.categories = data.categorys;
        loader.dismiss();
        console.log(this.categories);

         /*for(let i =0; i<this.categories.length; i++) {
          this.categories[i].image = this.images[i];
        }*/
      })
    });
    
       
  }
  

  }

  categoryTapped($event, category) {
    this.navCtrl.push(ItemPage, category);
  }

  

  
}
