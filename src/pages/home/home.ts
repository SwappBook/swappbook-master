import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, App } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { UserService } from '../../service/user-service';
import { apiAmazonService } from "../../service/api-amazon-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user = {} as User;
  
  constructor(private app:App,private auth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController,
    private amazon: apiAmazonService) {
  }

  ionViewDidLoad(){
    if (firebase.auth().currentUser != null ){
      this.app.getRootNav().setRoot('HometabPage');
    }
   // this.getResponse();
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
        });
      }).catch(e=> {
        console.log(e)
        this.presentAlert(e.message)
      }); 
    }
  }

  getResponse(){
    this.amazon.getBooks().subscribe(
    (data) => { // Success
      console.log(data);
      console.log(data['Item']);
    },
    (error) =>{
      console.error(error);
    }
  );
  }

  register(){
    this.navCtrl.push('RegisterPage');
  }

  presentAlert(str: string) {
    let alert = this.alertCtrl.create({
      title: 'Low battery',
      subTitle: str,
      cssClass: 'secondary',
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
