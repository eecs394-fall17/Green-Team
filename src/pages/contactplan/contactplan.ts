
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Contact } from './../../models/contact'; //we import the contat model 

@Component({
  selector: 'page-contactplan',
  templateUrl: 'contactplan.html'
})




export class ContactplanPage {
  contact = {}; //We'll make this be contact = {} as Contact
  contacts: FirebaseListObservable<any>; // We'll change any to Contact

  repeats = [
    "Daily",
    "Weekly",
    "Fortnightly",
    "Monthly",
    "Yearly"
  ];

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