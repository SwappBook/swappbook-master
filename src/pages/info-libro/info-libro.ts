import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/product';
import { GoogleMaps, GoogleMap,
         LatLng, GoogleMapsEvent, CameraPosition,
         Marker, MarkerOptions} from '@ionic-native/google-maps';
         import { Geolocation } from '@ionic-native/geolocation';
         import { UserService } from '../../service/user-service';
         import { UserLoged } from '../../models/user';         
/**
 * 
 * Generated class for the InfoLibroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-libro',
  templateUrl: 'info-libro.html',
})
export class InfoLibroPage {
  @ViewChild('map') mapElement:ElementRef;
  map: GoogleMap;
  prod = {} as Product;
  hide:Boolean = true;
  slideData = [];
  userData = {} as UserLoged;
  userRef: AngularFireList<any>;
  privateUserRef: AngularFireList<any>;
  chatRooms: AngularFireList<any>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private auth:AngularFireAuth,
              private db: AngularFireDatabase,
              private _googleMaps: GoogleMaps,
              private _geoLoc: Geolocation,
              private userdb: UserService
            ) {
  }

  ngAfterViewInit(){
    let loc: LatLng;
    this.initMap();

    this.userdb.getUserData().on('value', snap => {
      this.userData = snap.val();
    })
  
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {

  // Aqui debo pasarle las cordenadas del libro !!!
    //  this.getLocation().then( res => {
        loc = new LatLng(this.userData.latitude, this.userData.longitude);
        this.moveCamera(loc); 

        this.createMarker(loc).then((marker: Marker) => {
          marker.showInfoWindow();
        }).catch( err => {
          console.log(err);
        });

    //  }).catch( err => {
     //   console.log(err);
   //   });
    });
  }

  
  moveCamera(loc: LatLng){
    let options: CameraPosition<LatLng>= {
      target:loc,
      zoom: 15,
      tilt: 10
    }
    this.map.moveCamera(options)
  }

  initMap(){
    let element = this.mapElement.nativeElement;
    this.map = this._googleMaps.create(element);
  }

  ionViewDidLoad() {
    this.prod = this.navParams.get('prod');
    this.slideData = this.navParams.get('slideData');
    if (this.prod.user_id == this.auth.auth.currentUser.uid){
      this.hide = false;
    }
    this.userRef = this.db.list('users/'+this.auth.auth.currentUser.uid+'/chatRooms');
    this.privateUserRef = this.db.list('users/'+this.prod.user_id+'/chatRooms');
    this.chatRooms = this.db.list('chatRooms');
  }

  runChat(){
    const newKey = this.prod.key+"&"+this.prod.user_id+"&"+this.auth.auth.currentUser.uid ;
    this.chatRooms.set(newKey,{
      vendedor: this.prod.user_id,
      comprador: this.auth.auth.currentUser.uid,
      producto: this.prod.key,
      chatID: newKey
    }).then(res => {
      this.userRef.set(newKey,newKey);
      this.privateUserRef.set(newKey,newKey);
    });
  }

  getLocation(){
    return this._geoLoc.getCurrentPosition();
  }

  // MARKER
  // title es opcional !!
  createMarker(loc: LatLng){
  let markerOptions: MarkerOptions = {
    position: loc
  };
  return this.map.addMarker(markerOptions);
  }

}
