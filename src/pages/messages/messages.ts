import { ProductWithImage } from './../../models/product';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { ChatListService } from './../../service/message-list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { ChatRoom, ChatUserRooms } from '../../models/messages';

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

  chatRooms: Observable<ChatUserRooms[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private RoomService: ChatListService,
              private db: AngularFireDatabase,
              private auth: AngularFireAuth) {
                this.chatRooms = RoomService.getChatUserRoomsIds()
  }

  ionViewDidLoad() {}

  getDataOfChatRoom(key:string):ChatRoom{
    var array = {} as ChatRoom;
    
    this.db.database.ref('chatRooms').child(key).on('value', snap => {
        array = snap.val()
    });

    return array
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
    var str = {} as ProductWithImage;
    
    this.db.database.ref('productos').child(key).on('value', snap => {
      str = snap.val()
    })

    return str
  }
}
