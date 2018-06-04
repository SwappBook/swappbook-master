import { Message, snapshotToArray, ChatRoom, ChatUserRooms } from './../models/messages';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChatListService{    

    constructor(private db: AngularFireDatabase,
                private auth: AngularFireAuth){}

    getChatUserRoomsIds():Observable<ChatUserRooms[]>{
        var chatRooms: Observable<ChatUserRooms[]>;

        chatRooms = this.db.list<ChatUserRooms[]>('users/'+this.auth.auth.currentUser.uid+'/chatRooms')
        .snapshotChanges()
        .map(
            changes => {
                return changes.map(
                    c => ({
                        key: c.payload.key , value: c.payload.val()
                    })
                )
            }
        );

        return chatRooms;
    }

    getDataOfChatRoom(key:string):ChatRoom{
        var array = {} as ChatRoom;

        this.db.database.ref('chatRooms').child(key).on('value', snap => {
            array = snap.val()
        });
        
        return array
    }

    getMessageOfChatRoom(key:string):Observable<Message[]>{
        var chats:Observable<Message[]>

        /*this.db.database.ref('chatRooms').child(key).child('message').on('value', snap => {
            chats = snapshotToArray(snap)
        })*/
        chats = this.db.list<Message[]>('chatRooms/'+key+'/message')
        .snapshotChanges()
        .map(
            changes => {
                return changes.map(
                    c => ({
                        key: c.payload.key , ... c.payload.val()
                    })
                )
            }
        )

        return chats
    }
}