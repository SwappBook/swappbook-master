import { ImageProviderProduct } from './../../service/image-provider-products';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
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

  product = {} as Product;
  userid:string;
  public hide : boolean = false;
  slideData = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private productListService: ProductListService,
              private aut: AngularFireAuth,
              private image: ImageProviderProduct) {
  }

  ionViewDidLoad() {
    this.product.user_id = this.aut.auth.currentUser.uid;
  }

  selectPhoto(){
    this.image.getImageGallery().then(res => {
      this.hide = true;
      this.slideData.push(this.image.cameraImage);
    })
  }

  addProduct(prod: Product) {
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
