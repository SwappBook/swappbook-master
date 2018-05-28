import { ProductListService } from './../../service/product-list.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductWithImage } from '../../models/product';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the SearcherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-searcher',
  templateUrl: 'searcher.html',
})
export class SearcherPage {

  prodList: Observable<ProductWithImage[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private db: AngularFireDatabase,
              private product:ProductListService) {
  }

  ionViewDidLoad() {
  }

  initializeItems(): void {
    this.prodList = this.product.getProductList()
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

  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();
  
    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;
  
  
    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }
  
    this.prodList = this.prodList.filter((v) => {
      v.forEach(element => {
        if(element.titulo && q) {
          if (element.titulo.toLowerCase().indexOf(q.toLowerCase()) > -1) {
            return true;
          }
        }
      });
      return false;
    });

    alert(this.prodList.forEach(element => {
      element.forEach(r => {
        r.titulo;
      })
    }))
  }
}
