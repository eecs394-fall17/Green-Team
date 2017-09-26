
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Contact } from '../../models/contact.interface';
//import { ContactPlan } from '../../models/contactplan.interface';

@Component({
  selector: 'page-contactplan',
  templateUrl: 'contactplan.html'
})




export class ContactplanPage {
  contact = {} as Contact;
  contacts: FirebaseListObservable<any>; // We'll change any to Contact

  repeats = [
    "Daily",
    "Weekly",
    "Fortnightly",
    "Monthly",
    "Yearly",
    "Once"
  ];

  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  db: AngularFireDatabase) {
    this.contacts = db.list('/contacts');

    this.contact.daytime = (new Date()).toISOString();
  }

  logForm() {
    console.log(this.contact);
    this.contacts.push(this.contact);
    this.navCtrl.pop();
  }
}