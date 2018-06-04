import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class SavedListService {
    private savedListRef = this.db.list<any[]>('users/'+this.auth.auth.currentUser.uid+'/saved');

    constructor(private db: AngularFireDatabase, private auth: AngularFireAuth) {}

    getSavedList(){
        return this.savedListRef;
    }
}