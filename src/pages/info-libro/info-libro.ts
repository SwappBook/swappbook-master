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
  slideData = [];
  userData = {} as UserLoged;

 constructor(public navCtrl: NavController, 
              public navParams: NavParams,
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
