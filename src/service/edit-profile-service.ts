import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { EditProfile } from "../models/editPerfil";

@Injectable()
export class EditProfileService{

    private userRef = this.db.object('users/'+this.auth.auth.currentUser.uid);
    
    constructor(private db:AngularFireDatabase,
                private auth: AngularFireAuth){}

    updateProfile(edit:EditProfile){
        return this.userRef.update(edit);
    }
}