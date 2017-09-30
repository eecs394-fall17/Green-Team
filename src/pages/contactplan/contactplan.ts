
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

  constructor(public navCtrl: NavController, public navParams: NavParams, db: AngularFireDatabase) {
    this.contacts = db.list('/contacts');
    this.contact.repeat = this.repeats[1];
    this.contact.daytime = (new Date()).toISOString();
  }

  logForm() {
    console.log(this.contact);
    //pushing the newly created contact from the form to the db
    this.contacts.push(this.contact); 
    //going back to the previous page
    this.navCtrl.popToRoot();
  }
}