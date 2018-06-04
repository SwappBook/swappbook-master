import { UserRegister } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Geolocation } from '@ionic-native/geolocation';
import { HomePage } from '../home/home';
import { MainPage } from '../main/main';


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as UserRegister;
  usersRef: AngularFireList<any>;

  constructor(private app:App,
              private auth: AngularFireAuth,
              public navCtrl: NavController,
              public navParams: NavParams,
              public database: AngularFireDatabase,
              private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    this.getLocate();
  }


  register(user: UserRegister){
    
   if (user.password == user.confirm_password) {
      if(user.password.length >= 6){
        if(this.notNUllFields()){

        
        const res = this.auth.auth.createUserWithEmailAndPassword(user.email,user.password).then(() => {
          this.auth.auth.signInWithEmailAndPassword(user.email,user.password);
          
          this.usersRef = this.database.list('users');  
          this.usersRef.set(this.auth.auth.currentUser.uid,{name: user.full_name,email:user.email,password:user.password, latitude:user.latitude, longitude:user.longitude});
       
          this.app.getRootNav().setRoot(HomePage);

        }).catch((error) => {
          alert(error)
        });;
      }else{
        alert("Por favor rellene todos los campos.");
      }
      }else{
        alert("La contraseña debe contener mas de 5 caracteres");
      }
     }else{
      alert("Las contraseñas no coinciden!");
    }

  }

  notNUllFields(){
    if(this.user.full_name != null && this.user.full_name != "" && this.user.email != null && this.user.password){
      return true;
    }else{
      return false;
    }
  }


  getLocate(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.user.latitude = resp.coords.latitude
      this.user.longitude = resp.coords.longitude
     }).catch((error) => {
      alert("Para un correcto funcionamiento, esta app necesita acceder a la ubicacion.")
     });
        }
}
