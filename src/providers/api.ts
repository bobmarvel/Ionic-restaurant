import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import "rxjs/add/operator/map";
// import * as _ from 'lodash';
import {Observable} from "rxjs";



@Injectable()
export class Api {

private posturl = "http://ec2-52-40-252-107.us-west-2.compute.amazonaws.com:443/order";

CurrentCategory : any = {};

IDStola: any;
  menu: any;
  idfoods: number;

   temparr: any[];

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
   let options = new RequestOptions({ headers: headers });
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:8100 ')
      this.temparr = [...item];

      console.log("THIS IS AFTER SLICE", this.temparr);


    // for (let i =0; i<this.temparr.length; i++) {
    //   delete this.temparr[i].descript;
    //   delete this.temparr[i].picture;
    //   delete this.temparr[i].price;
    //   delete this.temparr[i].summary;
    //   delete this.temparr[i].top;
    // }
      console.log("Post function test AFTER" , this.temparr);
      console.log("This is item", item);



    let body = item;

    return this.http.post(this.posturl, JSON.stringify(body), options)
     .map(res => res.json()).catch((error:any) =>{return Observable.throw(error);});


 }


  dayitem(){

    let favitem = [];
    let  favitemarray = [];

     return this.http.get(`${this.menu}.json`).map((resp: Response) => {
       favitem = resp.json().foods;
       for(let i=0; i<favitem.length;i++){
            if (favitemarray.indexOf(favitem[i]) == -1) {
      favitemarray.push(favitem[i].foods);
             }
       }
      let sett = new Set();

            favitemarray.forEach((array) => {
              array.forEach(element => {
                  if (element.top == true) {
                  sett.add(element);  // set is using to avoid duplicates without creating functions and arrays

                    }
                });
            })
        let sarray = Array.from(sett);
        console.log(sarray);
      return sarray;
     })
  }

 }



