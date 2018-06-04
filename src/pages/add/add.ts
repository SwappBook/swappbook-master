import { ApiGoogleBooks } from './../../service/api-google-service';
import { ImageProviderProduct } from './../../service/image-provider-products';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { ProductListService } from '../../service/product-list.service';
import { Product } from '../../models/product';
import { Geolocation } from '@ionic-native/geolocation';
import { UserService } from '../../service/user-service';
import { UserLoged } from '../../models/user';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

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

  product = {} as Product;
  prod = []
  userid:string;
  public hide : boolean = false;
  slideData = []
  userData = {} as UserLoged

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private userdb:UserService,
              private productListService: ProductListService,
              private aut: AngularFireAuth,
              private image: ImageProviderProduct,
              private geolocation: Geolocation,
              private barcodeScanner: BarcodeScanner,
              private googleBooks: ApiGoogleBooks
            ) {            
  }

 ionViewDidLoad() {
    this.product.user_id = this.aut.auth.currentUser.uid;

    this.userdb.getUserData().on('value', snap => {
      this.userData = snap.val();
    })
  }

  readBarcode(){
    this.barcodeScanner.scan().then(barcodeData => {
      //barcodeData.text -> Devuelve el codigo ISBN
      this.googleBooks.getBooks(barcodeData.text).subscribe(
        data => {
          this.prod = data['items'];
        }
      )
     }).catch(err => {
         console.log('Error', err);
     });
     
  }

  selectPhoto(){
    this.image.getImageGallery().then(res => {
      this.hide = true;
      this.slideData.push(this.image.cameraImage);
    })
  }

  addProduct(prod: Product) {
    prod.latitude = this.userData.latitude
    prod.longitude = this.userData.longitude
    this.productListService.addProduct(prod).then(ref => {
      var i = 1;
      this.slideData.forEach(element => {
        this.image.uploadProductPhoto(ref.key,element,i);
        i++;
      });
      this.navCtrl.parent.select(0);
    })
  }

}
