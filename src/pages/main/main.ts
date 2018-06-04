import { ImageProvider } from './../../service/image-provider-profile';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { ProductWithImage, Product, orderByDistance } from '../../models/product';
import { ProductListService } from '../../service/product-list.service';
import { Geolocation } from '@ionic-native/geolocation';
import { LatLng } from '@ionic-native/google-maps';

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
  

  locat: LatLng = new LatLng(0,0);
  prodList: Observable<Product[]>;
  treeMapItems: Array<orderByDistance> = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private productListService: ProductListService,
              private db: AngularFireDatabase,
              private image:ImageProvider,
              private geolocation: Geolocation
            ) {
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
  
  sortByDistance(loc: LatLng){

    this.prodList.forEach(element => {
      element.forEach(res => {
        let a = {
          distance:this.calculateDistance(loc.lat,res.latitude,loc.lng,res.longitude),
          prod: res
        }
        this.treeMapItems.push(a)
      });
    });

    this.treeMapItems.sort();
    console.log(this.treeMapItems)
  }



  ionViewDidLoad() {
    this.getLocate();
    this.sortByDistance(this.locat)
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

calculateDistance(lat1:number,lat2:number,long1:number,long2:number):number{
  let p = 0.017453292519943295;    // Math.PI / 180
  let c = Math.cos;
  let a = 0.5 - c((lat1-lat2) * p) / 2 + c(lat2 * p) *c((lat1) * p) * (1 - c(((long1- long2) * p))) / 2;
  let dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
  return dis;
}



  getLocate(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.locat = new LatLng(resp.coords.latitude,resp.coords.longitude);
      
}).catch((error) => {
      alert("Para un correcto funcionamiento, esta app necesita acceder a la ubicacion.")
     });
        }
 
}
