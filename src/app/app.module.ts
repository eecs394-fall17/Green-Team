
import { HomePage } from './../pages/home/home';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { Contacts } from '@ionic-native/contacts';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { MyApp } from './app.component';

/*PAGES*/
import { ContactPage } from '../pages/contact/contact';
import { ContactplanPage } from '../pages/contactplan/contactplan';
import { PhonecontactplanPage } from '../pages/phonecontactplan/phonecontactplan';
import { SigninPage } from '../pages/signin/signin';


/*PIPES */
import { TimeOfDay } from '../pipes/time';
import { SafeUrlPipe } from './../pipes/safe-url.pipe';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

/*FIREBASAE STUFF*/
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

export const firebaseConfig = {
    apiKey: "AIzaSyBJhOg72no3tBYZp-dQSB4pOf2vPBRvoj8",
    authDomain: "keepintouch-168d3.firebaseapp.com",
    databaseURL: "https://keepintouch-168d3.firebaseio.com",
    projectId: "keepintouch-168d3",
    storageBucket: "",
    messagingSenderId: "253253255823"
};

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    ContactplanPage,
    TimeOfDay,
    SafeUrlPipe,
    HomePage,
    PhonecontactplanPage,
    SigninPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, 'songstest'),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    ContactplanPage,
    HomePage,
    PhonecontactplanPage,
    SigninPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Contacts,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
