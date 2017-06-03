import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
// import * as _ from 'lodash';
import {Observable} from 'rxjs/Observable';
import {TableID} from '../providers/shared';



@Injectable()
export class Api {

private posturl = "http://ec2-52-40-252-107.us-west-2.compute.amazonaws.com:443/order";

CurrentCategory : any = {}

IDStola: any;
  menu: any;
  idfoods: number;

  constructor(public http: Http, ) {

  }
  getCategory():Promise<any> {
    return new Promise(resolve => {
      this.http.get(`${this.menu}.json`)
      .subscribe(res => {
        resolve(res.json());
      })
    })
  }

 getFoodData(catID): Observable<any> {
   
   
 
    return this.http.get(`${this.menu}.json`)
    .map((res: Response) => {
      
      this.CurrentCategory = res.json();
      /*this.CurrentCategory.foods.forEach(element => {
       
        if (element.id == catID) {
            console.log("ELEGIGGLE :" , element.id)
        }
      });*/

      for(let i = 0; i<this.CurrentCategory.foods.length; i++ ) {
          if(this.CurrentCategory.foods[i].id == catID){
             this.idfoods = i;
          }
      }
      console.log(this.CurrentCategory.foods[this.idfoods].foods);
      return this.CurrentCategory.foods[this.idfoods];
    })
 }

 post(item) {

  console.log("Post function test PRE" , item);
   let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:8100 ')

    for (let i =0; i<item.length; i++) {
      delete item[i].descript;
      delete item[i].picture;
      delete item[i].price;
      delete item[i].summary;
      delete item[i].top;
    }
      console.log("Post function test AFTER" , item);
   
    
    let options = new RequestOptions({ headers: headers });
    let body = {
      item
     };
     this.http.post(this.posturl, JSON.stringify(body), options)
     .map(res => res.json())
     .subscribe(
       (data) => {
       console.log(data);
     }, (error) => {
       alert("Error has been happened! Please, retry again. The error is: " + error);
     }, () => {
        /*this.globalvar.IDStola = this.results;*/
        
       
     })

 }


}
