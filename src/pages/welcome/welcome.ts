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
        alert("QR успешно отсканирован, нажмите кнопку 'Отправить', чтобы проверить его")
      }
      else {
        alert("Please, rescan the QR");
        this.navCtrl.popToRoot;
      }
        
      }, 
      (error) => {
        alert(`Error scanning: ${error}`);
        this.results = null;
      })
           
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
     if (data.success == false ) {
            alert(data.info);
             }
          else {
            
       this.globalvar.menu = data.url;
        
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot;
          }

     }, (error) => {
       alert("Ошибка " + error);
     }, () => {
        this.globalvar.IDStola = this.results.text;
    
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
         
          if (data.success == false ) {
            alert(data.info);
             }
          else {
            alert("rofolmao");
          console.log(data);
       this.globalvar.menu = data.url;
         this.globalvar.IDStola = 123; 
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot;
          }
             
     }, (error) => {
       alert("Error has been happened! Please, retry again. The error is: " + error);
     }, () => {
        
        
    //    this.globalvar.IDStola = 123; 
    // this.navCtrl.setRoot(HomePage);
    // this.navCtrl.popToRoot;
     })


    
  }

}



