import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ContactplanPage } from '../contactplan/contactplan';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import { AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  contacts: FirebaseListObservable<any>;
  openedContact: any;

  constructor(public navCtrl: NavController, 
      public alertCtrl: AlertController,
      public actionSheetCtrl: ActionSheetController,
      db: AngularFireDatabase, afAuth: AngularFireAuth) {
    this.contacts = db.list('/contacts');
    this.openedContact = undefined;
  }

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

  showOptions(contactId, contactTitle) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Remove Contact Plan',
          role: 'destructive',
          handler: () => {
            this.removeContact(contactId);
          }
        },{
          text: 'Update contact',
          handler: () => {
            this.updateContact(contactId, contactTitle);
          }
        },{
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

  newContact(event) {
    this.navCtrl.push(ContactplanPage, {
    });
  }
}
