import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { User } from '../../models/user.interface';
import { ContactplanPage } from '../contactplan/contactplan';
import { HomePage } from './../home/home';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
//import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import { AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';

 


import * as moment from 'moment';
 
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})

export class ContactPage {
  contacts: FirebaseListObservable<any>; //the array that is stored on the firebase database
  todaycontacts: any; //: FirebaseListObservable<any>;
  latercontacts: any; //: FirebaseListObservable<any>;
  openedContact: any;
  user = {} as User;

  ngOnInit() {
    this.todaycontacts = [];
    this.latercontacts = [];

    var dayBegin = new Date();
    dayBegin.setHours(0,0,0,0);
    var dayEnd = new Date();
    dayEnd.setHours(23,59,59,999);

    this.db.list('contacts', {
      query: {
        orderByChild: 'daytime',
        startAt: dayBegin.toISOString(),
        endAt: dayEnd.toISOString()
      }
    }).subscribe(contacts => {
      this.filterContactsByUser(contacts, this.todaycontacts);
    });

    this.db.list('contacts', {
      query: {
        orderByChild: 'daytime',
        startAt: dayEnd.toISOString()
      }
    }).subscribe(contacts => {
      this.filterContactsByUser(contacts, this.latercontacts);
    });
  }

  constructor(public navCtrl: NavController, 
      public navParams: NavParams,
      public alertCtrl: AlertController,
      public actionSheetCtrl: ActionSheetController,
      public db: AngularFireDatabase) {
    
    this.user = navParams.get('user');
    this.contacts = db.list('/contacts');   //this sets the db data to the variable within the view
    this.openedContact = undefined;
  } 
  
  filterContactsByUser(contacts, filteredList) {
    var filterUser = this.user;
    if (filterUser == undefined)
      return;

    filteredList.length = 0;
    contacts.forEach(c => {
      if (c.username == filterUser.username) {
        filteredList.push(c);
        console.log(filteredList);
      }
    });
  }

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
              user: this.user
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
    console.log(number);
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
