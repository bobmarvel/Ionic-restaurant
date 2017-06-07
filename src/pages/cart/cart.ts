import { Order } from './../order/order';
import { HomePage } from './../home/home';

import { CategoryPage } from './../category/category';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import {CartProvider, Api} from '../../providers/shared';
import {Observable} from 'rxjs';
import {of} from 'rxjs/observable/of';


@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})
export class CartPage {

  public shoppingCartItems$: Observable<any> = of([]);
  public shoppingCartItems = [];
  
  isToggled: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public cartprovdr: CartProvider, private globalvar: Api, private toast: ToastController, private alrt: AlertController) {
    
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

  post(item, toggled) {
      

      let confirm = this.alrt.create({
      title: 'Ваш заказ будет отправлен на сервер. Вы уверены?',
      message: 'Отправить заказ?',
      buttons: [
        {
          text: 'Нет',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Да',
          handler: () => {
            item = this.shoppingCartItems;
            this.globalvar.post(item, toggled).subscribe(
       (zakazs) => {   
       
            let alert = this.alrt.create({       
        subTitle: 'Спасибо за заказ! Сейчас вы будете перенаправлены на страницу с заказами.',
        buttons: [
          {
            text: `OK`,
            handler: () => {
               
            console.log("this is data", zakazs);
          this.navCtrl.push(Order, zakazs);
           
            }
          }
        ]  
                  
      });
      alert.present();
     
    
     }, (error) => {
        let alert = this.alrt.create({
          title: 'Error happened',
      subTitle: "Error code is " + error,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.navCtrl.popToRoot();
        }
      }]

        });
        alert.present();
        
     },
      () => {
          item.forEach(element => {
              this.cartprovdr.removeFromCart(element);
            }); 
     });

         
          }
        }
      ]
    });
    confirm.present();
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

   notify() {

     console.log("is toggled", this.isToggled);
   }
  }
