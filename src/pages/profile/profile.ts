import { UserService } from './../../service/user-service';
import { ImageProvider } from './../../service/image-provider-profile';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { EditProfileService } from '../../service/edit-profile-service';
import { Observable } from 'rxjs/Observable';
import { ProductWithImage } from '../../models/product';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  prodList: Observable<ProductWithImage[]>;
  profilePhoto: String;
  userData = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private app:App,
  private afAuth: AngularFireAuth,
  private image: ImageProvider,
  private userdb: UserService,
  private profile: EditProfileService) {}

  ionViewDidLoad() {

    this.prodList = this.navParams.get('prodList')

    this.prodList = this.prodList.filter((v) => {
      v.forEach(element => {
          if (element.user_id == this.afAuth.auth.currentUser.uid) {
            return true;
          }
      });
      return false;
    });

    this.image.getImage().then( () => {
      this.profilePhoto = this.image.cameraImage;
    });
    //https://aiaa.nmsu.edu/files/2016/09/noprofile.gif
    this.userdb.getUserData().on('value', snap => {
      this.userData = snap.val();
    })
  }

  selectPhoto(){
    this.image.getImageGallery().then(res => {
      this.profilePhoto = this.image.cameraImage
    });
  }

  async logout(): Promise<any>{
    return this.afAuth.auth.signOut().then( () => {
      this.app.getRootNav().setRoot(HomePage)
    })
  }

}
