import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {CartPage, CategoryPage, ItemPage, HomePage, ItemdetailPage, WelcomePage, ZakazPage} from '../pages/pages';
import {Api, CartProvider} from '../providers/shared';
import {HttpModule} from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    CartPage,
    CategoryPage,
    ItemPage,
    HomePage,
    ItemdetailPage,
    WelcomePage,
    ZakazPage

  ],
  imports: [
    IonicModule.forRoot(MyApp),   //IonicModule.forRoot(MyApp, {mode: 'ios'}), for ios
    HttpModule,
    BrowserModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CartPage,
    CategoryPage,
    ItemPage,
    HomePage,
    ItemdetailPage,
    WelcomePage,
    ZakazPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Api,
    CartProvider,
    BarcodeScanner,

  ]
})
export class AppModule {}
