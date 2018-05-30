import { Message, snapshotToArray, ChatRoom } from './../models/messages';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChatListService{

    chatRooms: Observable<any[]>    

    constructor(private db: AngularFireDatabase,
                private auth: AngularFireAuth){}

    getChatUserRoomsIds(){
        this.chatRooms = this.db.list<any[]>('users/'+this.auth.auth.currentUser.uid+'/chatRooms')
        .snapshotChanges()
        .map(
            changes => {
                return changes.map(
                    c => ({
                        key: c.payload.key
                    })
                )
            }
        );
    }

    getDataOfChatRoom():ChatRoom[]{
        var array = []
        this.chatRooms.forEach(element => {
            element.forEach(res => {
                this.db.database.ref('chatRooms').child(res.key).on('value', snap => {
                    array.push(snap.val())
                });
            });
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