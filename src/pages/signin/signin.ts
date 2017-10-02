import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user.interface';

import { ContactPage } from '../../pages/contact/contact';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})

export class SigninPage {
  user = {} as User;
  users: FirebaseListObservable<any>; // We'll change any to Contact

  constructor(public navCtrl: NavController, public navParams: NavParams, db: AngularFireDatabase) {
    this.users = db.list('users');
  }

  logForm() {
    console.log(this.user);
    //pushing the newly created contact from the form to the db
    this.users.push(this.user); 
    //go to root page
    this.navCtrl.goToRoot();
  }
}