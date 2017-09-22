import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-contactplan',
  templateUrl: 'contactplan.html'
})
export class ContactplanPage {
  contacts: FirebaseListObservable<any>;
  contact = {};

  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  db: AngularFireDatabase) {
    this.contacts = db.list('/contacts');
  }

  logForm() {
    console.log(this.contact);
    this.contacts.push(this.contact);
    this.navCtrl.pop();
  }
}