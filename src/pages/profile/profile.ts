import { UserService } from './../../service/user-service';
import { UserLoged } from './../../models/user';
import { ImageProvider } from './../../service/image-provider';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';

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

  profilePhoto: String;
  userData = {} as UserLoged;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private app:App,
  private afAuth: AngularFireAuth,
  private image: ImageProvider,
  private userdb: UserService) {
  }

  ionViewDidLoad() {
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
