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

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public db: AngularFireDatabase,
    private afAuth: AngularFireAuth) {

    this.users = db.list('users');
  }

  logForm() {
    var potentialUser = [];
    var ctrl = this;

    this.db.list('users', {
      query: {
        orderByChild: 'username',
        equalTo: this.user.username
      }
    }).subscribe(users => {
      var found = false;
      users.forEach(u => {
        ctrl.loginUser(u);
        found = true;
        return;
      });
      if (!found) {
        this.users.push(this.user);
        ctrl.loginUser(this.user);
      }
    });
  }

  loginUser(potentialUser) {
    console.log(potentialUser);
    //pushing the newly created contact from the form to the db
    this.user = potentialUser;
    //go to root page
    this.navCtrl.popToRoot();
    this.navCtrl.setRoot(ContactPage, { user: this.user });
    this.navCtrl.popToRoot();
  }
}