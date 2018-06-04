import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { SavedListService } from '../../service/saved-list-service';
import { ProductWithImage } from '../../models/product';

/**
 * Generated class for the SavedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-saved',
  templateUrl: 'saved.html',
})
export class SavedPage {

  savedList: Observable<any[]>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private saved: SavedListService,
    private db:AngularFireDatabase) {
    this.savedList = saved.getSavedList()
    .snapshotChanges()
    .map(
      changes => {
        return changes.map(
          c => ({
            key: c.payload.key
          })
        )
      }
    );
  }

  ionViewDidLoad() {}

  getData(key:string): ProductWithImage{
    var items = {} as ProductWithImage

    this.db.database.ref('productos/'+key).on('value', res => {
      items = res.val();
    })

    return items
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
