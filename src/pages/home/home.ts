import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  contactlist: any;

  
  constructor(public navCtrl: NavController, public platform: Platform, private contacts: Contacts) {
    this.platform.ready().then(() => {
      var opts = {   
         filter : "M",                                
         multiple: true,        
         hasPhoneNumber:true,                             
         fields:  [ 'displayName', 'name' ]
       };
       contacts.find([ 'displayName', 'name' ],opts).then((contacts) => {
         this.contactlist = contacts;
       }, (error) => {
         console.log(error);
       })
   })
  }

  

}
