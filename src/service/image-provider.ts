import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { AngularFireStorage } from "angularfire2/storage";
import { AngularFireAuth } from "angularfire2/auth";

@Injectable()
export class ImageProvider {

    public cameraImage:String

    constructor(private _CAMERA: Camera,
    private storage: AngularFireStorage,
    private auth: AngularFireAuth){}

    getImageGallery():Promise<any> {
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

            this.uploadProfilePhoto();
        })
    }

    takePhoto():Promise<any> {
        return new Promise(resolve => {
            let cameraOptions : CameraOptions = {
                sourceType:this._CAMERA.MediaType.PICTURE,
                destinationType:this._CAMERA.DestinationType.DATA_URL,
                quality:100,
                targetWidth:320,
                targetHeight:240,
                encodingType:this._CAMERA.EncodingType.JPEG,
                correctOrientation:true,
                saveToPhotoAlbum:false
            };

            this._CAMERA.getPicture(cameraOptions).then((data) => {
                this.cameraImage = "data:image/jpeg;base64," + data;
                resolve(this.cameraImage);
            });
        })
    }

    uploadProfilePhoto(){
        try{
            const picture = this.storage.ref('profiles').child(this.auth.auth.currentUser.uid);
            picture.putString(this.cameraImage,'data_url');
        } catch(e){
            console.error(e);
        }
    }

    getImage():Promise<any>{
        return new Promise(resolve => {
            const pic = this.storage.ref('profiles').child(this.auth.auth.currentUser.uid).getDownloadURL();
            pic.forEach(element => {
                this.cameraImage = element;
                resolve(this.cameraImage)
            });
        })
    }
}