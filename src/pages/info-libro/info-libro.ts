import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/product';

/**
 * Generated class for the InfoLibroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-libro',
  templateUrl: 'info-libro.html',
})
export class InfoLibroPage {

  prod = {} as Product;
  hide:Boolean = true;
  slideData = [];
  
  userRef: AngularFireList<any>;
  privateUserRef: AngularFireList<any>;
  chatRooms: AngularFireList<any>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private auth:AngularFireAuth,
              private db: AngularFireDatabase) {}

  ionViewDidLoad() {
    this.prod = this.navParams.get('prod');
    this.slideData = this.navParams.get('slideData');
    if (this.prod.user_id == this.auth.auth.currentUser.uid){
      this.hide = false;
    }
    this.userRef = this.db.list('users/'+this.auth.auth.currentUser.uid+'/chatRooms');
    this.privateUserRef = this.db.list('users/'+this.prod.user_id+'/chatRooms');
    this.chatRooms = this.db.list('chatRooms');
  }

  runChat(){
    const newKey = this.prod.key+"&"+this.prod.user_id+"&"+this.auth.auth.currentUser.uid ;
    this.chatRooms.set(newKey,{
      vendedor: this.prod.user_id,
      comprador: this.auth.auth.currentUser.uid,
      producto: this.prod.key,
      chatID: newKey
    }).then(res => {
      this.userRef.set(newKey,newKey);
      this.privateUserRef.set(newKey,newKey);
    });
  }

}
