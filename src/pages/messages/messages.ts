import { ProductWithImage } from './../../models/product';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { ChatListService } from './../../service/message-list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { ChatRoom } from '../../models/messages';

/**
 * Generated class for the MessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

  chatRoomsUser: ChatRoom[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private RoomService: ChatListService,
              private db: AngularFireDatabase,
              private auth: AngularFireAuth) {
                RoomService.getChatUserRoomsIds();
                this.chatRoomsUser = this.RoomService.getDataOfChatRoom();
  }

  ionViewDidLoad() {
    console.log(this.chatRoomsUser)
  }

  getName(keyComprador:string,keyVendedor:string):string{
    var str = ''
    if (keyComprador == this.auth.auth.currentUser.uid){
      this.db.database.ref('users').child(keyVendedor).child('name').on('value', snap => {
        str = snap.val()
      })
    } else if (keyVendedor == this.auth.auth.currentUser.uid){
      this.db.database.ref('users').child(keyComprador).child('name').on('value', snap => {
        str = snap.val()
      })
    }
    return str
  }

  getInfoLibro(key:string):ProductWithImage{
    var str
    this.db.database.ref('productos').child(key).on('value', snap => {
      str = snap.val()
    })
    return str
  }
}
