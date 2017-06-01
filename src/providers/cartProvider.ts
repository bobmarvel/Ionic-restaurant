import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {BehaviorSubject, Observable} from 'rxjs';
import {Massive} from '../pages/interface.model';

@Injectable()
export class CartProvider {

  public newmassive: Massive[] = [
    {id: 0, qty: 0}
    ];

  public itemsInCartSubject = new BehaviorSubject([]);
  public itemsInCart = [];

  constructor(public http: Http) {
    this.itemsInCartSubject.subscribe(data => {
        this.itemsInCart = data;

    });
  }

   addToCart(item) {
      let i: number = 0;
      let j: number = 0;

    while (i < this.newmassive.length) {
      if (item.id == this.newmassive[i].id) {
        this.newmassive[i].qty++;
        j++;

      }
      i++;
    }
    if (j ==0 ) {
      this.newmassive.push({id: item.id, qty: 1})
      this.itemsInCartSubject.next([...this.itemsInCart, item]);

  }
  console.log(this.newmassive);






  }

public removeFromCart(item) {

    let i: number =0 ;
    for (i; i< this.newmassive.length; i++) {
      if (item.id == this.newmassive[i].id) {
        this.newmassive[i].qty = 0 ;
        this.newmassive[i].id = 0;

      }
    }
    const currentItems = [...this.itemsInCart];
    const itemsWithoutRemoved = currentItems.filter(_ => _.id !== item.id);
    this.itemsInCartSubject.next(itemsWithoutRemoved);

  }

  public getItems(): Observable<any> {
    return this.itemsInCartSubject.asObservable();
  }

  public getTotalAmount(): Observable<number> {

    return this.itemsInCartSubject.map((items) => {
      return items.reduce((prev, curr) => {
    let i: number =0 ;
    for (i; i< this.newmassive.length; i++) {
      if (curr.id == this.newmassive[i].id) {
       return prev + curr.price*this.newmassive[i].qty;
      }
    }

      }, 0);
    });
  }
}
