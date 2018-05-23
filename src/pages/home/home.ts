import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, App } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user = {} as User;

  constructor(private app:App,private auth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad(){
    if (this.auth.auth.currentUser != null ){
      this.app.getRootNav().setRoot('HometabPage');
    }
  }

  async login(user: User){
    try {
      const res = this.auth.auth.signInWithEmailAndPassword(user.email,user.password);
      if (res){
        this.app.getRootNav().setRoot('HometabPage');
      }
    } catch (e) {
      //TODO ALERTS DE ERRORES
      console.error(e);
    }
  }

  register(){
    this.navCtrl.push('RegisterPage');
  }

}
