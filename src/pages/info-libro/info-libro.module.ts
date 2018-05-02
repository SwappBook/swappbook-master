import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoLibroPage } from './info-libro';

@NgModule({
  declarations: [
    InfoLibroPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoLibroPage),
  ],
})
export class InfoLibroPageModule {}
