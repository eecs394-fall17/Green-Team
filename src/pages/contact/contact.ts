import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { User } from '../../models/user.interface';
import { ContactplanPage } from '../contactplan/contactplan';
import { HomePage } from './../home/home';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
//import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import { AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';


import { LocalNotifications } from '@ionic-native/local-notifications';

 

import * as moment from 'moment';
 
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})

export class ContactPage {
  // Firebase list of all contacts
  contacts: FirebaseListObservable<any>;
  // Name contact sorted
  sortname = false;
  sortlabel = "Time";
  namecontacts: any;

  //get the closest contact to call
  nextcontact: any;
  // Firebase list of contacts for current day 
  todaycontacts: any; //: FirebaseListObservable<any>;
  // Firebase list of contacts for future days
  latercontacts: any; //: FirebaseListObservable<any>;
  // Javascript array of contact indices grouped in time chunks 
  laterchunks: any;
  // Tracks accordion unfolded contact
  openedContact: any;
  // Tracks current logged-in user
  user = {} as User;

  // Queries Firebase for contact lists above
  ngOnInit() {
    this.todaycontacts = [];
    this.namecontacts = []; 
    this.latercontacts = [];
    this.laterchunks = [];
    this.nextcontact = []; //next call

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
      // Callbacks to fire to populate today contacts
      this.filterContactsByUser(contacts, this.todaycontacts);
    });
    
    this.db.list('contacts', {
      query: {
        orderByChild: 'daytime',
        startAt: dayEnd.toISOString()
      }
    }).subscribe(contacts => {
      // Callbacks to fire to populate later contacts + chunks
      this.filterContactsByUser(contacts, this.latercontacts);
      this.chunkContacts(this.latercontacts, this.laterchunks);
    });

    this.db.list('contacts',{
      query: {
        orderByChild: 'name', 
      }
    }).subscribe(contacts => {
      this.filterContactsByUser(contacts, this.namecontacts);
    });

    this.db.list('contacts', {
      query: {
        orderByChild: 'daytime',
        startAt: dayBegin.toISOString(),
        endAt: dayEnd.toISOString()
      }
    }).subscribe(contacts => {
      // Callbacks to fire to populate today contacts
      this.filterContactsByUser(contacts, this.nextcontact);
    });
  }

  constructor(public navCtrl: NavController, 
      public navParams: NavParams,
      public alertCtrl: AlertController,
      public actionSheetCtrl: ActionSheetController,
      public db: AngularFireDatabase,
      private plt: Platform,
      private localNotifications: LocalNotifications) {
    
    // Grab logged-in user passed from previous page
    this.user = navParams.get('user');
    
    // Firebase query to grab ALL users
    this.contacts = db.list('/contacts');
    // Default to no open contact in accordion
    this.openedContact = undefined;

    this.plt.ready().then(() => {
      this.localNotifications.hasPermission().then(function (granted) {
        if (!granted) {
          console.log("Not granted");
          
          this.localNotifications.registerPermission();
        }
      }).catch(function(err) {
        console.log("Cordova not available");
      });
    });
  } 
  
  // Filter Firebase contact query list for the logged-in user 
  filterContactsByUser(contacts, filteredList) {
    var filterUser = this.user;
    if (filterUser == undefined)
      return;

    filteredList.splice(0,filteredList.length);
    contacts.forEach(c => {
      if (c.username == filterUser.username) {
        filteredList.push(c);
      }
    });
  }

  // Create contact index array to group contacts in time chunks
  chunkContacts(contacts, chunks) {
    chunks.splice(0,chunks.length);
    if (contacts.length == 0) return;

    chunks.push([contacts[0]]);
    var chunkIndex = 0;
    var endTime: any = moment(chunks[0].daytime).startOf('day').add(1, 'd').toDate();
    for (var i = 1; i < contacts.length; i++) {
      var cDate: any = new Date(contacts[i].daytime);
      //console.log(endTime);
      //console.log(cDate);
      if ((cDate - endTime) > 0) {
        endTime = moment(cDate).startOf('day').add(1, 'd').toDate();
        chunks.push([contacts[i]]);
        chunkIndex++;
      } else {
        chunks[chunkIndex].push(contacts[i]);
      }
    }
  }

  // Alert to choose whether new contact uses phone info or not
  choosePlan(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Create a New Contact Plan',
      buttons: [
        {
          text: 'Choose Contact from Phone',
          handler: () => {
            this.navCtrl.push(HomePage, {
              user: this.user
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

  showOptions(contactId, contactInfo) {
    console.log("showOptions called");
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Update Contact Plan',
          handler: () => {           
            this.navCtrl.push(ContactplanPage, {
              user: this.user,
              contactKey: contactId,
              contactInfo: contactInfo,
            });
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

  //removes contact from the database
  removeContact(contactId: string){
    this.contacts.remove(contactId);
    if (this.localNotifications != undefined) {
      this.localNotifications.cancelAll;
    }
  }

  toggleContactHolder(key) {
    if (this.openedContact == key) {
      this.openedContact = undefined;
    } else {
      this.openedContact = key;
    }
  }
  // pulls up action sheet and gives users options
  checkoffContact(contactId, time, rep) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What to do with contact plan?',
      buttons: [
        {
          text: 'Complete and Delete',
          handler: () => {    
            this.removeContact(contactId);
          }
        },
        {
          text: 'Complete and Repeat (' + rep + ")",
          handler: () => {
            this.repeatContact(contactId, time, rep);
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

  toggleSort(sortByName) {
    if (this.sortname) {
      this.sortlabel = "A-Z";
    } else {
      this.sortlabel = "Time";
    }
  }
  
}
