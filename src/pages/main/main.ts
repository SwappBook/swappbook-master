import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../models/product';
import { ProductListService } from '../../service/product-list.service';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  prodList: Observable<Product[]>

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private productListService: ProductListService) {
    this.prodList = this.productListService.getProductList()
    .snapshotChanges()
    .map(
      changes => {
        return changes.map(
          c => ({
            key: c.payload.key, ... c.payload.val()
          })
        )
      }
    );
  }

  ionViewDidLoad() {
  }

}
