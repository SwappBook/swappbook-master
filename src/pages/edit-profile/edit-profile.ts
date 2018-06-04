import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditProfile } from '../../models/editPerfil';
import { AngularFireAuth } from 'angularfire2/auth';
import { EditProfileService } from '../../service/edit-profile-service';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'Edit-ProfilePage',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  tabBarElement: any;
  editProfile = {} as EditProfile

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private auth: AngularFireAuth,
              private editService : EditProfileService,
              private geolocation: Geolocation) {
                this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  getLocate(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.editProfile.latitude = resp.coords.latitude
      this.editProfile.longitude = resp.coords.longitude
       alert("latitud: " + resp.coords.latitude)
       alert("longitud: "+ resp.coords.longitude)
     }).catch((error) => {
       console.log('Error getting location', error);
     });

    // let watch = this.geolocation.watchPosition();
      //   watch.subscribe((data) => {
          // data can be a set of coordinates, or an error (if an error occurred).
     //    data.coords.latitude
     //     data.coords.longitude
     //     });
        }

  ionViewDidLoad() {
    this.tabBarElement.style.display = 'none'
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  saveData(){
    this.editService.updateProfile(this.editProfile).then(res => {
      this.navCtrl.pop();
    });
  }

}
