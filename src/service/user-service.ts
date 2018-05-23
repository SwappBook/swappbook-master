import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class UserService {
    private userRef = this.db.database.ref('users').child(this.auth.auth.currentUser.uid);

    constructor(private db: AngularFireDatabase,
                private auth: AngularFireAuth){}

    getUserData() {
        return this.userRef;
    }
}