import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { AngularFireStorage } from "angularfire2/storage";
import { AngularFireAuth } from "angularfire2/auth";

@Injectable()
export class ImageProviderProduct {

    public cameraImage:String;

    constructor(private _CAMERA: Camera,
                private storage: AngularFireStorage,
                private auth: AngularFireAuth,
                private db : AngularFireDatabase){}

    getImageGallery():Promise<any>{
        return new Promise(resolve => {
            let cameraOptions : CameraOptions = {
                sourceType:this._CAMERA.PictureSourceType.PHOTOLIBRARY,
                destinationType:this._CAMERA.DestinationType.DATA_URL,
                quality:100,
                targetWidth:320,
                targetHeight:240,
                encodingType:this._CAMERA.EncodingType.JPEG,
                correctOrientation:true
            };

            this._CAMERA.getPicture(cameraOptions).then((data) => {
                this.cameraImage = "data:image/jpeg;base64," + data;
                resolve(this.cameraImage);
            });
        })
    }

    uploadProductPhoto(key:string,nombre:string,n:number){
        try{
            const pic = this.storage.ref('products/'+key+n);
            pic.putString(nombre,'data_url').then(savePic => {
                this.db.database.ref('productos/'+key+'/images_products').child(key+n).set(savePic.downloadURL);
            });
        } catch(e){
            console.error(e)
        }
    }

}