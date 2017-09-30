
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';



import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Contact } from '../../models/contact.interface';
//import { ContactPlan } from '../../models/contactplan.interface';

@Component({
  selector: 'page-phonecontactplan',
  templateUrl: 'phonecontactplan.html',
})
export class PhonecontactplanPage {
  contact = {} as Contact;
  contacts: FirebaseListObservable<any>; // We'll change any to Contact

  phoneContact = {} as any;
  repeats = [
    "Daily",
    "Weekly",
    "Fortnightly",
    "Monthly",
    "Yearly",
    "Once"
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, db: AngularFireDatabase) {
    this.contacts = db.list('/contacts'); //setting up database
    this.phoneContact = navParams.get('item'); //getting the object from the the previous page

    this.contact.displayName = this.phoneContact.name.formatted; //setting name from phone to this contact's info
    this.contact.repeat = this.repeats[1]; //making it automatically be weekly
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