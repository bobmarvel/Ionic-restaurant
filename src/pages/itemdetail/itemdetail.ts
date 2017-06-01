import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import {CartPage} from '../pages';
import {CartProvider} from '../../providers/shared';
import {Observable} from 'rxjs';

/*
  Generated class for the Itemdetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-itemdetail',
  templateUrl: 'itemdetail.html'
})
export class ItemdetailPage {
  public item = {};
  


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public cartProvider: CartProvider, public toast: ToastController) {
                
  }

  ionViewDidLoad() {  
   this.item = this.navParams.data;
    //  console.log(this.item);
    
  }
  
  addToCart(item) {
      this.cartProvider.addToCart(item);

      let toast = this.toast.create({
    message: 'Блюдо добавлено в корзину ',
    duration: 2000,
    position: 'bottom'
  });

  ;

  toast.present();
    
  }
    
  

  goToCart() {
    this.navCtrl.push(CartPage);
  }

}
