import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ZakazPage } from './zakaz';

@NgModule({
  declarations: [
    ZakazPage,
  ],
  imports: [
    IonicPageModule.forChild(ZakazPage),
  ],
  exports: [
    ZakazPage
  ]
})
export class ZakazModule {}
