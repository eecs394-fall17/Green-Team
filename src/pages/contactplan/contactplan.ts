import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Platform } from 'ionic-angular';


import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
//import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { LocalNotifications } from '@ionic-native/local-notifications';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, db: AngularFireDatabase, private plt: Platform, private localNotifications: LocalNotifications, alertCtrl: AlertController) {
    this.contacts = db.list('/contacts');

    this.user = navParams.get('user');
    this.contactKey = navParams.get('contactKey');
    this.contactInfo = navParams.get('contactInfo');

    console.log(this.contactKey);
    if (this.contactKey != undefined) {
      console.log(this.contactInfo);
      this.contact.name = this.contactInfo.name;
      this.contact.description = this.contactInfo.description;
      this.contact.repeat = this.contactInfo.repeat;
      this.contact.daytime = this.contactInfo.daytime;
    } else {
      this.contact.repeat = this.repeats[1];
      this.contact.daytime = (new Date()).toISOString();
    }
    this.contact.username = this.user.username;

    this.plt.ready().then(() => {
      console.log("-----------------in view did load-------------------");
      console.log(this.localNotifications.hasPermission());
      
      this.localNotifications.hasPermission().then(function (granted) {
        if (!granted) {
          console.log("Not granted");
          
          this.localNotifications.registerPermission();
        }
      });
    });
  }

  scheduleNotification(contact) {
    this.localNotifications.schedule({
      id: 1,
      title: `You should contact ${this.contact.name}`,
      text: `Note: ${this.contact.description}`,
      data: { mydata: 'My hidden message this is' },
      at: (new Date(this.contact.daytime))
    });
  }
  /*
  checkData(contact){
    console.log("contact is: " + contact);
    console.log("This.contact is: " + this.contact);
    console.log("This is the date " + contact.daytime);
    
    console.log("This is the date as something else: " + (new Date(contact.daytime)));
    
    console.log(this.localNotifications.getAll());
  }
  */
  logForm() {
    // Pushing new contact to query list adds it to the database
    if (this.contactKey == undefined) {
      this.contacts.push(this.contact);
      // Pop all pages on stack and navigate to root page
      this.scheduleNotification(this.contact);
    } else {
      // NEED TO UPDATE NOTIFICATION IF TIME WAS UPDATED
      // To remove undefined attributes on contact JSON:
      this.contact = JSON.parse(JSON.stringify(this.contact));
      this.contacts.update(this.contactKey, this.contact);
    }
    // Go back to the previous page
    this.navCtrl.popToRoot();
  }
}