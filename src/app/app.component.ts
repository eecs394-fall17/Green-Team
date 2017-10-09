import { HomePage } from './../pages/home/home';
import { Component, ViewChild  } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';

import { ContactPage } from '../pages/contact/contact';
import { SigninPage } from '../pages/signin/signin';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // The page loaded on startup
  rootPage:any = SigninPage;
  // Collection of pages used in left-hand menu
  pages: Array<{title: string, component: any}>;
  // Navigation component: stack of pages user accesses
  @ViewChild(Nav) nav: Nav;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public menu: MenuController,
    public splashScreen: SplashScreen) {
    this.initializeApp();

    // Spawn the order of pages on left-hand menu
    this.pages = [
      { title: 'Contacts', component: ContactPage },
      { title: 'Sign In', component: SigninPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // Callback from selecting page on left-hand menu
  openPage(page) {
    // Close the left-hand menu
    this.menu.close();
    // Navigate to new page by resetting stack with this page
    this.nav.setRoot(page.component);
  }

}
