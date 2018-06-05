import { UserService } from './../../service/user-service';
import { ImageProvider } from './../../service/image-provider-profile';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { EditProfileService } from '../../service/edit-profile-service';
import { Observable } from 'rxjs/Observable';
import { ProductWithImage } from '../../models/product';
import { ProductListService } from '../../service/product-list.service';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the PerfilPublicoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil-publico',
  templateUrl: 'perfil-publico.html',
})
export class PerfilPublicoPage {

  prodList: Observable<ProductWithImage[]>;
  userLista: ProductWithImage[] = [];
  profilePhoto: String;
  userData = {};
  prod = {} as ProductWithImage;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private app:App,
    private afAuth: AngularFireAuth,
    private productListService: ProductListService,
    private db: AngularFireDatabase,
    private image: ImageProvider,
    private userdb: UserService,
    private profile: EditProfileService) {
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

    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.ionViewDidLoad();
    }

  ionViewDidLoad() {
  
    this.prod = this.navParams.get('prod');
    this.userdb.getUserDataId(this.prod.user_id).on('value', snap => {
    this.userData = snap.val();
    });
    
    this.image.getPublicImage(this.prod.user_id);
    if (this.image.publicImage == null){
      this.profilePhoto = 'https://aiaa.nmsu.edu/files/2016/09/noprofile.gif';
    } else {
      this.profilePhoto = this.image.publicImage
    }
  }

  selectPhoto(){
    this.image.getImageGallery().then(res => {
      this.profilePhoto = this.image.cameraImage
    });
  }

  getLibrosUser(){
    this.prodList.forEach(element => {
      element.forEach(res => {
        if (res.user_id == this.prod.user_id){
          this.userLista.push(res)
        }
      });
    });
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
