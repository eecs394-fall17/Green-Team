import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { PhonecontactplanPage } from '../phonecontactplan/phonecontactplan';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  contactlist: any; 
  constructor(public navCtrl: NavController, public platform: Platform, private contacts: Contacts) {
    this.platform.ready().then(() => {
      var options = {                                
        multiple: true,        
        hasPhoneNumber:true,                             
        fields:  [ 'displayName', 'name' ]
      };
     
      contacts.find([ 'displayName', 'name'], options).then((contacts) => {
        this.contactlist = contacts;
      }, (error) => {
        console.log(error);
      });
   })
  }

  tapped(event, info) {
    // console.log(info.displayName);
    // console.log(info.emails);
    // console.log(info.phoneNumbers);
    this.navCtrl.push(PhonecontactplanPage, {
      item: info
    });
  }




}
