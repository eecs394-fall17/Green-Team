
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import { Contact } from '../../models/contact.interface';
import { User } from '../../models/user.interface';
//import { ContactPlan } from '../../models/contactplan.interface';

@Component({
  selector: 'page-contactplan',
  templateUrl: 'contactplan.html'
})




export class ContactplanPage {
  user = {} as User;

  contact = {} as Contact;
  contacts: FirebaseListObservable<any>;

  repeats = [
    "Daily",
    "Weekly",
    "Fortnightly",
    "Monthly",
    "Yearly",
    "Once"
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, db: AngularFireDatabase) {
    this.contacts = db.list('/contacts');
    this.contact.repeat = this.repeats[1];
    this.contact.daytime = (new Date()).toISOString();

    this.user = navParams.get('user');
    this.contact.username = this.user.username;
  }

  logForm() {
    console.log(this.contact);
    // Pushing new contact to query list adds it to the database
    this.contacts.push(this.contact); 
    // Pop all pages on stack and navigate to root page
    this.navCtrl.popToRoot();
  }
}