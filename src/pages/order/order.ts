import { CategoryPage } from './../category/category';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class Order {
  public orders: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  
  ionViewDidLoad() {
   
    //  this.orders = this.navParams.data;
      console.log("this is 123", this.orders);
  }
  goHome(){
    this.navCtrl.popToRoot();
  }
  goToCategory() {
    this.navCtrl.push(CategoryPage);
  }
  

}
