import { AngularFireAuth } from 'angularfire2/auth';
import { ChatListService } from './../../service/message-list';
import { AngularFireDatabase } from 'angularfire2/database';
import { Message } from './../../models/messages';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from './../../service/user-service';
import { User} from '../../models/user';
/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  tabBarElement: any;

  chatKey:string;
  compradorKey:string;
  vendedorKey:string;
  userID:string;
  message:Observable<Message[]>;
  data = {} as Message;
  pruductoKey:string;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private db: AngularFireDatabase,
              private runChat: ChatListService,
              private userdb: UserService,
              public auth:AngularFireAuth) {
                this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  ionViewDidLoad() {
    this.tabBarElement.style.display = 'none'
    this.chatKey = this.navParams.get('chatKey');
    this.compradorKey = this.navParams.get('comprador');
    this.vendedorKey = this.navParams.get('vendedor');
    this.userID = this.auth.auth.currentUser.uid;
    this.message =  this.runChat.getMessageOfChatRoom(this.chatKey);
    this.pruductoKey = this.navParams.get('producto');

  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  aceptarUser(){

    this.db.database.ref('chatRooms/'+this.chatKey).update({'estado':true})
    .then(res => {
      this.db.database.ref('productos/'+this.pruductoKey).update({'estado':true})
      this.navCtrl.pop();
    });
  }

  sendMessage() {
    this.data.remitente = this.auth.auth.currentUser.uid;
    if (this.compradorKey == this.auth.auth.currentUser.uid){
      this.data.destinatario = this.vendedorKey;
    } else if (this.vendedorKey == this.auth.auth.currentUser.uid){
      this.data.destinatario = this.compradorKey;
    }
    this.data.date = new Date();
    let newData = this.db.database.ref('chatRooms/'+this.chatKey+'/message').push();
    newData.set(this.data);
    this.data.message = '';
  }

}