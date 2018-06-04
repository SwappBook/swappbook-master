import { ImageProvider } from './../../service/image-provider-profile';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { ProductWithImage } from '../../models/product';
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

  prodList: Observable<ProductWithImage[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private productListService: ProductListService,
  private db: AngularFireDatabase,private image:ImageProvider) {
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
    image.getImage();
  }

  ionViewDidLoad() {}

  getImages(key:string): any[]{
    var items = []

    this.db.database.ref('productos/'+key+'/images_products').on('value', res => {
      res.forEach(itemSnap => {
        items.push(itemSnap.val())
        return false
      })
    })
    
    return items
  }
}
