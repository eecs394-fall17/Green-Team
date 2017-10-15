
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
  
  contactKey: any;
  contactInfo: any;

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

    this.user = navParams.get('user');
    this.contactKey = navParams.get('contactKey');
    this.contactInfo = navParams.get('contactInfo');

    if (this.contactKey != undefined) {
      console.log(this.contactInfo);
      this.contact.name = this.contactInfo.name;
      this.contact.description = this.contactInfo.description;
      this.contact.repeat = this.contactInfo.repeat;
      this.contact.daytime = this.contactInfo.daytime;
    } else {
      this.contact.username = this.user.username;
      //this.contact.name
      //this.contact.description
      this.contact.repeat = this.repeats[1];
      this.contact.daytime = (new Date()).toISOString();
    }
  }

  logForm() {
    console.log(this.contact);
    // Pushing new contact to query list adds it to the database
    if (this.contactKey == undefined)
      this.contacts.push(this.contact); 
    else {
      // To remove undefined attributes on contact JSON:
      this.contact = JSON.parse(JSON.stringify(this.contact));
      this.contacts.update(this.contactKey, this.contact);
    }
    // Pop all pages on stack and navigate to root page
    this.navCtrl.popToRoot();
  }
}