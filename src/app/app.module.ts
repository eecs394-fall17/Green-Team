import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { Contacts } from '@ionic-native/contacts';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { ContactplanPage } from '../pages/contactplan/contactplan';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ListPage } from '../pages/list/list';
import { ItemDetailsPage } from '../pages/item-details/item-details';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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
    AboutPage,
    ContactPage,
    ContactplanPage,
    HomePage,
    TabsPage,
    ListPage,
    ItemDetailsPage
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
    AboutPage,
    ContactPage,
    ContactplanPage,
    HomePage,
    TabsPage,
    ListPage,
    ItemDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Contacts,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
