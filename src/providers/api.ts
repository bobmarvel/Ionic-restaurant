import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
// import * as _ from 'lodash';
import {Observable} from 'rxjs/Observable';
import {TableID} from '../providers/shared';



@Injectable()
export class Api {

private BaseUrl = "https://food-71485.firebaseio.com";

CurrentCategory : any = {}

IDStola: any;
  menu: any;

  constructor(public http: Http, ) {

  }
  getCategory():Promise<any> {
    return new Promise(resolve => {
      this.http.get(`${this.BaseUrl}/categorys.json`)
      .subscribe(res => {
        resolve(res.json());
      })
    })
  }

 getFoodData(catID): Observable<any> {
   catID = catID-1;
    return this.http.get(`${this.BaseUrl}/foods/${catID}.json`)
    .map((res: Response) => {
      this.CurrentCategory = res.json();
      return this.CurrentCategory;
    })
 }


}
