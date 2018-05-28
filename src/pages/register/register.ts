import { UserRegister } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

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

  constructor(private app:App,private auth: AngularFireAuth,public navCtrl: NavController,
    public navParams: NavParams,public database: AngularFireDatabase) {
  }

  register(user: UserRegister){
    if (user.password == user.confirm_password) {
      const res = this.auth.auth.createUserWithEmailAndPassword(user.email,user.password).then(() => {
        this.auth.auth.signInWithEmailAndPassword(user.email,user.password);
        
        this.usersRef = this.database.list('users');  
        this.usersRef.set(this.auth.auth.currentUser.uid,{name: user.full_name,email:user.email,password:user.password});
      });
  
      if (res){
        this.app.getRootNav().setRoot('HometabPage'); 
      }
    }
    /* TODO
    alert cuando ocurran problemas
    */
  }
}
