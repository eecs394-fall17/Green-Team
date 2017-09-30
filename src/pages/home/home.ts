import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Contacts, Contact} from '@ionic-native/contacts';
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
        filter: '',                          
        multiple: true,        
        hasPhoneNumber: true,
        desiredFields: ['name.formatted', 'phoneNumbers'],                            
        fields:  [ 'name.formatted']
      };
     
      contacts.find([ 'name'], options).then((contacts) => {
        console.log(contacts[0].phoneNumbers);
        
        this.contactlist = contacts;
      
        /*
        this.contactlist.sort(function(a, b){
              var nameA = a.displayName;
              var nameB = b.displayName;
          
              if (nameA < nameB){ //sort string ascending 
                  return -1;  
              }
              if (nameA > nameB){
                  return 1;
              }
              return 0 //default return value (no sorting)
          });
          */
        console.log(this.contactlist);
        
      }, (error) => {
        console.log(error);
      });
   })
  }

  tapped(event, info) {

    this.navCtrl.push(PhonecontactplanPage, {
      item: info
    });
  }




}
