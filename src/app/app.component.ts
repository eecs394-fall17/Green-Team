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
  rootPage:any = HomePage;
  pages: Array<{title: string, component: any}>;
  @ViewChild(Nav) nav: Nav;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public menu: MenuController,
    public splashScreen: SplashScreen) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Contacts', component: ContactPage },
      { title: 'Home', component: HomePage },
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

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

}
