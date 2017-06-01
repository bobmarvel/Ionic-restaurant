import { CategoryPage } from './../category/category';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import {CartProvider, Api} from '../../providers/shared';
import {Observable} from 'rxjs';
import {of} from 'rxjs/observable/of';

/*
  Generated class for the Cart page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})
export class CartPage {

  public shoppingCartItems$: Observable<any> = of([]);
  public shoppingCartItems = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public cartprovdr: CartProvider, private globalvar: Api, private toast: ToastController) {
    
  }

  ionViewWillEnter() {
     if (this.globalvar.IDStola == undefined) {
      this.navCtrl.popToRoot();
    }  
    else {
      this.shoppingCartItems$ = this
      .cartprovdr
      .getItems();

    this.shoppingCartItems$.subscribe(data => {
        console.log(data);

      let i: number =0 ;
      for(i; i< data.length; i++) {
        let j: number =0;
            for (j; j < this.cartprovdr.newmassive.length; j++ ) {
              if (data[i].id == this.cartprovdr.newmassive[j].id) {
                    data[i].qty = this.cartprovdr.newmassive[j].qty;
                    data[i].idstola = this.globalvar.IDStola;
              }
            }
              
      }
      
      this.shoppingCartItems = data;
      console.log(data);
     
    });
    }
   
  }

 public getTotal(): Observable<number> {
    return this.cartprovdr.getTotalAmount();
  }

  public removeItem(item) {
    this.cartprovdr.removeFromCart(item);
     let toast = this.toast.create({
    message: 'Блюдо удалено ',
    duration: 1333,
    position: 'bottom',
  });

  ;

  toast.present();
  }

  post(item) {
      item = this.shoppingCartItems;
      console.log(item);
  }

  plusqty(item) {
      let i: number =0 ; 
    for (i; i< this.cartprovdr.newmassive.length; i++) {
      if (item.id == this.cartprovdr.newmassive[i].id) {
        this.cartprovdr.newmassive[i].qty++;
        item.qty++;
        
      }
    }
  }

  minusqty(item) {
    let i: number =0 ; 
    for (i; i< this.cartprovdr.newmassive.length; i++) {
      if (item.id == this.cartprovdr.newmassive[i].id) {
        if (this.cartprovdr.newmassive[i].qty == 1) {
          this.cartprovdr.removeFromCart(item);
        }
        else {
            this.cartprovdr.newmassive[i].qty--;
                    item.qty--;
        }
        
      }
    }
  }
  goHome() {
    this.navCtrl.popToRoot();
   }
}
