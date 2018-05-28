import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/product';

/**
 * Generated class for the InfoLibroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-libro',
  templateUrl: 'info-libro.html',
})
export class InfoLibroPage {

  prod = {} as Product;
  slideData = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.prod = this.navParams.get('prod');
    this.slideData = this.navParams.get('slideData');
  }

}
