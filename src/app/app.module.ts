import { ChatListService } from './../service/message-list';
import { UserService } from './../service/user-service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SplashPage } from '../pages/splash/splash';

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireStorageModule } from "angularfire2/storage";

import { Camera } from "@ionic-native/camera";
import { ImageProvider } from "../service/image-provider-profile";
import { ImageProviderProduct } from "../service/image-provider-products";
import { ProductListService } from "../service/product-list.service";
import { EditProfileService } from '../service/edit-profile-service';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from  '@ionic-native/google-maps'
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HttpClientModule } from '@angular/common/http';
import { apiAmazonService } from "../service/api-amazon-service";

var config = {
  apiKey: "AIzaSyDDHvxIK0XXCrtWDXVY8fMKrCnXOKr0VE4",
  authDomain: "swappbook-fd50a.firebaseapp.com",
  databaseURL: "https://swappbook-fd50a.firebaseio.com",
  projectId: "swappbook-fd50a",
  storageBucket: "swappbook-fd50a.appspot.com",
  messagingSenderId: "943105195034"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SplashPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SplashPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductListService,
    ImageProvider,
    ImageProviderProduct,
    UserService,
    ChatListService,
    EditProfileService,
    Geolocation,
    GoogleMaps,
    BarcodeScanner,
    apiAmazonService
  ]
})
export class AppModule {}
