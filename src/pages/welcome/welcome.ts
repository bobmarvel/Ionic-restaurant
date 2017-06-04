import { Component } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { NavController, NavParams , MenuController} from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import {HomePage} from '../pages';
import {Api} from '../../providers/shared';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
  results: any;
  
  private BaseUrlTRUE = "http://ec2-52-40-252-107.us-west-2.compute.amazonaws.com:443/rest/login";


  constructor(public navCtrl: NavController, public navParams: NavParams,
  private QRscan: BarcodeScanner, public globalvar: Api, 
  private http: Http, private menu: MenuController) {}


ionViewDidEnter() {
   
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    
    this.menu.enable(true);
  }
  scan() {
      this.QRscan.scan().then((data) => {
        if (data.format == "QR_CODE") {
          this.results = data;
        alert("QR успешно отсканирован, нажмите кнопку Test, чтобы проверить его")
      }
      else {
        alert("Please, rescan the QR");
        this.navCtrl.popToRoot;
      }
        
      }, 
      (error) => {
        alert(`Error scannig: ${error}`);
        this.results = null;
      })
      /*.then(
      () => {
        if (this.results != null) {
          let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // let body = this.results.text;
    let body = this.results.text; 
     this.http.post('https://food-71485.firebaseio.com/.json', JSON.stringify(body), {headers: headers})
     .map(res => res.json())
     .subscribe((data) => {
       alert(data.name);
     })
             this.globalvar.IDStola = this.results;
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot;
        }
      }
      ) */
      
  }


test(){
  
     let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    let options = new RequestOptions({ headers: headers });
    let body = {
      "qr": this.results.text
    }
    
     this.http.post(this.BaseUrlTRUE, JSON.stringify(body), options)
     .map(res => res.json())
     .subscribe(
       (data) => {
       alert("Добро пожаловать");
      
       this.globalvar.menu = data.url;

     }, (error) => {
       alert("Ошибка " + error);
     }, () => {
        this.globalvar.IDStola = this.results.text;
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot;
     })

  }





 dev() {
      

       let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:8100 ')

    
   
    
    let options = new RequestOptions({ headers: headers });
    let body = {
      "qr": 123  
     };
     this.http.post(this.BaseUrlTRUE, JSON.stringify(body), options)
     .map(res => res.json())
     .subscribe(
       (data) => {
       alert(data.success);
       console.log(data);
       this.globalvar.menu = data.url;
     }, (error) => {
       alert("Error has been happened! Please, retry again. The error is: " + error);
     }, () => {
        
        
       this.globalvar.IDStola = 123; 
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot;
     })


    
  }

}



