import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class UserService {

    constructor(private db: AngularFireDatabase,
                private auth: AngularFireAuth){}

    getUserData() {
        const userRef = this.db.database.ref('users').child(this.auth.auth.currentUser.uid);
        return userRef;
    }

    getUserDataId(id: string) {
        const userRef = this.db.database.ref('users').child(id);
        return userRef;
    }


}