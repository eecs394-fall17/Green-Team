
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Platform } from 'ionic-angular';


import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, db: AngularFireDatabase, private plt: Platform, private localNotifications: LocalNotifications, alertCtrl: AlertController) {
    this.contacts = db.list('/contacts');
    this.contact.repeat = this.repeats[1];
    this.contact.daytime = (new Date()).toISOString();

    this.user = navParams.get('user');
    this.contact.username = this.user.username;
    /********************************** */
    this.plt.ready().then((readySource) => {
      this.localNotifications.on('click', (notification, state) => {
        let json = JSON.parse(notification.data);
        let alert = alertCtrl.create({
          title: notification.title,
          subTitle: json.mydata
        });
        alert.present();
      })
    });
    
     /********************************** */
  }
  
  
  scheduleNotification(contact) {
    this.localNotifications.schedule({
      id: 1,
      title: 'Keep in Touch',
      text: `You should contact ${this.contact.name}`,
      data: { mydata: 'My hidden message this is' },
      at: this.contact.daytime
    });
  }

  logForm() {
    console.log(this.contact);
    //pushing the newly created contact from the form to the db
    this.scheduleNotification(this.contact);
    this.contacts.push(this.contact); 
    //going back to the previous page
    this.navCtrl.popToRoot();
  }
}