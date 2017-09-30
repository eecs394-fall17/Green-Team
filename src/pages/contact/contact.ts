import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ContactplanPage } from '../contactplan/contactplan';
import { HomePage } from './../home/home';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
//import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import { AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';



import * as moment from 'moment';
 
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  contacts: FirebaseListObservable<any>; //the array that is stored on the firebase database
  todaycontacts: FirebaseListObservable<any>;
  latercontacts: FirebaseListObservable<any>;
  openedContact: any;  

  constructor(public navCtrl: NavController, 
      public alertCtrl: AlertController,
      public actionSheetCtrl: ActionSheetController,
      private callNumber: CallNumber,
      db: AngularFireDatabase, /*afAuth: AngularFireAuth*/) {
    this.contacts = db.list('/contacts');   //this sets the db data to the variable within the view
    this.openedContact = undefined;

    var dayBegin = new Date();
    dayBegin.setHours(0,0,0,0);
    var dayEnd = new Date();
    dayEnd.setHours(23,59,59,999);

    this.todaycontacts = db.list('/contacts', {
      query: {
        orderByChild: 'daytime',
        startAt: dayBegin.toISOString(),
        endAt: dayEnd.toISOString()
      }
    });

    this.latercontacts = db.list('/contacts', {
      query: {
        orderByChild: 'daytime',
        startAt: dayEnd.toISOString()
      }
    });
  } 
  
  /*
  addContact(){
    let prompt = this.alertCtrl.create({
      title: 'Contact Plan',
      message: "Choose a contact to plan communicating with",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            var c = this.contacts.push({
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  } 
  */
  choosePlan(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Create a New Contact Plan',
      buttons: [
        {
          text: 'Choose Contact from Phone',
          handler: () => {
            this.navCtrl.push(HomePage, {
            });
          }
        },
        {
          text: 'Create a Custom Contact',
          handler: () => {
            this.navCtrl.push(ContactplanPage, {
            });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  callThem(number){ 
    //console.log(number);
    
    this.callNumber.callNumber('1234567890', false)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
    
  }

  showOptions(contactId, contactTitle) {
    console.log("showOptions called");
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Update Contact Plan',
          handler: () => {
            this.updateContact(contactId, contactTitle);
          }
        },
        {
          text: 'Remove Contact Plan',
          role: 'destructive',
          handler: () => {
            this.removeContact(contactId);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  
  updateContact(contactId, contactTitle){
    let prompt = this.alertCtrl.create({
      title: 'Contact Name',
      message: "Update the name for this contact",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: contactTitle
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.contacts.update(contactId, {
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }

  repeatContact(contactId: string, time, rep) {
    var repeats = {
      "Daily": ['d', 1],
      "Weekly": ['w', 1],
      "Fortnightly": ['w', 2],
      "Monthly": ['M', 1],
      "Yearly": ['M', 12]
    };

    var rep_type = repeats[rep];
    var new_date = moment(time).add(rep_type[1], rep_type[0]);
    this.contacts.update(contactId, {
      daytime: new_date.toISOString()
    });
  }

  removeContact(contactId: string){
    this.contacts.remove(contactId);
  }

  toggleContactHolder(key) {
    if (this.openedContact == undefined) {
      this.openedContact = key;
    } else {
      this.openedContact = undefined;
    }
  }


}
