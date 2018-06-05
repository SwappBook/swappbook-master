import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, App } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { UserService } from '../../service/user-service';
import { GooglePlus } from '@ionic-native/google-plus';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user = {} as User;
  
  constructor(private app:App,private auth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, private googlePlus: GooglePlus,private platform: Platform,public afAuth: AngularFireAuth) {
  }

  ionViewDidLoad(){
    if (firebase.auth().currentUser != null ){
      this.app.getRootNav().setRoot('HometabPage');
    }
  }

  goLog(){
    this.app.getRootNav().setRoot('HometabPage');
  }

  async login(user: User){

    if (user.email=="" && user.password=="" ){
       this.presentAlert("Rellena los campos vacíos.");
    }else{
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(r => {
        return firebase.auth().signInWithEmailAndPassword(user.email,user.password).then(res =>{
          this.app.getRootNav().setRoot('HometabPage'); 
        }).catch(e=> {
          console.log(e)
          this.presentAlert(e.message)
        });;
      }).catch(e=> {
        console.log(e)
        this.presentAlert(e.message)
      }); 
    }
  }

  async nativeGoogleLogin(): Promise<void> {
    try {

      const gplusUser = await this.googlePlus.login({
        'webClientId': '943105195034-0mn9te7q4l1k2b4bc635mo871e9s9k9a.apps.googleusercontent.com',
        'offline': true,
        'scopes': ''
      })
      return await firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken))
  
    } catch(err) {
      alert('error')
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await firebase.auth().signInWithPopup(provider);
  
    } catch(err) {
      console.log(err)
    }
  
  }

  loginWithGoogle(){
    if (this.platform.is('cordova')) {
      this.nativeGoogleLogin();
    } else {
      this.webGoogleLogin();
    }
  }

  /*
  'webClientId':'943105195034-dc5tcivhj0l9aoflrrlim31mk55817td.apps.googleusercontent.com',
  */

  register(){
    this.navCtrl.push('RegisterPage');
  }

  presentAlert(str: string) {
    let alert = this.alertCtrl.create({
      title: 'Error en login',
      subTitle: str,
      cssClass: 'secondary',
      buttons: ['Cerrar']
    });
    alert.present();
  }

  resetPassword(email: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  resetBtn(){
    this.presentPrompt();
  }

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Reset password',
      inputs: [
        {
          name: 'email',
          placeholder: 'Email:'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Reset',
          handler: data => {
            this.resetPassword(data.email);
          }
        }
      ]
    });
    alert.present();
  }

}
