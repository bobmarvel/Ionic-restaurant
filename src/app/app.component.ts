import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {CartPage, CategoryPage,  HomePage, WelcomePage, Order} from '../pages/pages';
import {Api} from '../providers/shared';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = WelcomePage;



  constructor(public globalvar: Api ,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

 
  goHome() {
    if (this.globalvar.IDStola !== undefined) {
      this.nav.setRoot(HomePage);
      this.nav.popToRoot;
    }
    else  {
      this.nav.popToRoot;
    }
  }

  goToCategory() {
    this.nav.push(CategoryPage);
  }
  
  goToCart(){
    this.nav.push(CartPage);
  }
 
  goToZakaz() {
    this.nav.push(Order);
  }
}
