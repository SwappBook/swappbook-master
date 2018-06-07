import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { orderByDistance, Product } from '../../models/product';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {

  tabBarElement: any;
  treeMapItems: Array<Product> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,private db: AngularFireDatabase) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  ionViewDidLoad() {
    this.treeMapItems = this.navParams.get('prodList')
    this.tabBarElement.style.display = 'none'
  
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

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
