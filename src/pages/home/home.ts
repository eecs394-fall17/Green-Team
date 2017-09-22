import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  /*
  contactlist: Array<{ 
    displayName: string, 
    phoneNumbers: Array<{value: string}>,
    daytime: Date,
    description: string,
    open: boolean,
    satisfied: string
  }>;*/

  contactlist = [
    {
      displayName: 'Mom',
      phoneNumbers: [{value: "773-555-1929"}],
      daytime: new Date(),
      description: "Call soon about A",
      open: false,
      satisfied: "false"
    },
    {
      displayName: 'Dad',
      phoneNumbers: [{value: "847-555-8557"}],
      daytime: new Date(),
      description: "Call to talk about B",
      open: false,
      satisfied: "false"
    }
  ];
  
  constructor(public navCtrl: NavController, public platform: Platform, private contacts: Contacts) {
    this.platform.ready().then(() => {
      var opts = {   
        filter : "M",                                
        multiple: true,        
        hasPhoneNumber:true,                             
        fields:  [ 'displayName', 'name' ]
      };
      /*
      contacts.find([ 'displayName', 'name' ],opts).then((contacts) => {
        this.contactlist = contacts;
      }, (error) => {
        console.log(error);
      });
      */

   })
  }

  toggleContactHolder(i) {
    this.contactlist[i].open = !this.contactlist[i].open;
  }

  satisfyContact(i) {
    this.contactlist[i].satisfied = (!(this.contactlist[i].satisfied == "true")).toString();
    console.log(this.contactlist[i].satisfied);
  }

}
