
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Platform} from 'ionic-angular';

import { LocalNotifications } from '@ionic-native/local-notifications';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Contact } from '../../models/contact.interface';
import { User } from '../../models/user.interface';
//import { ContactPlan } from '../../models/contactplan.interface';

@Component({
  selector: 'page-phonecontactplan',
  templateUrl: 'phonecontactplan.html',
})
export class PhonecontactplanPage {
  user = {} as User;

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

  constructor(public navCtrl: NavController, public navParams: NavParams, db: AngularFireDatabase, private plt: Platform, private localNotifications: LocalNotifications, alertCtrl: AlertController) {
    this.contacts = db.list('/contacts'); //setting up database
    this.phoneContact = navParams.get('item'); //getting the object from the the previous page
    
    //console.log(this.phoneContact.phoneNumbers);
    
    this.contact.name = this.phoneContact.name.formatted; //setting name from phone to this contact's info
    this.contact.phoneNumbers = this.phoneContact.phoneNumbers; //this is an array
    
    this.contact.repeat = this.repeats[1]; //making it automatically be weekly
    this.contact.daytime = (new Date()).toISOString();
    
    this.user = navParams.get('user');
    console.log(this.user);
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