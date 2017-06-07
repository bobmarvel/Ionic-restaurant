import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Order } from './order';

@NgModule({
  declarations: [
    Order,
  ],
  imports: [
    IonicPageModule.forChild(Order),
  ],
  exports: [
    Order
  ],
  entryComponents: [
    Order
  ]
})
export class OrderModule {}
