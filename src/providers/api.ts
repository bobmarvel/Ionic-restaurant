import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
// import * as _ from 'lodash';
import {BehaviorSubject, Observable} from 'rxjs';
import {TableID} from '../providers/shared';



@Injectable()
export class Api {

private posturl = "http://ec2-52-40-252-107.us-west-2.compute.amazonaws.com:443/order";

CurrentCategory : any = {}

IDStola: any;
  menu: any;
  idfoods: number;
  favitemarray :any[] = [];
  favitem: any;
  temparr =[];

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
     const temp = item;

    for (let i =0; i<temp.length; i++) {
      delete temp[i].descript;
      delete temp[i].picture;
      delete temp[i].price;
      delete temp[i].summary;
      delete temp[i].top;
    }
      console.log("Post function test AFTER" , temp);
   
    
    let options = new RequestOptions({ headers: headers });
    let body = {
      temp
     };
    return this.http.post(this.posturl, JSON.stringify(body), options)
     .map(res => res.json())
    

 }
  dayitem(){
    
     return this.http.get(`${this.menu}.json`).map((resp: Response) => {
       this.favitem = resp.json().foods;
       for(let i=0; i<this.favitem.length;i++){
         
         this.favitemarray.push(this.favitem[i].foods);
         
            this.favitemarray.forEach((array) => {
                array.forEach(element => {
                  if (element.top == true) {
                      if (this.temparr.indexOf(element) ==-1) {
                          this.temparr.push(element);
                      }
                      
                      
                  }
                });
            })
         
       }
       
      return this.temparr;
     })
  }

 }



