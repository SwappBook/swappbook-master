import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductListService } from '../../service/product-list.service';
import { Product } from '../../models/product';

/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  product = {} as Product

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private productListService: ProductListService) {
  }

  ionViewDidLoad() {
  }

  addProduct(prod: Product) {
    this.productListService.addProduct(prod).then(ref => {
      this.navCtrl.parent.select(0);
    })
  }

}
