import { Component } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';
import { Contacts, Contact } from '@ionic-native/contacts';
import { PhonecontactplanPage } from '../phonecontactplan/phonecontactplan';
import { User } from '../../models/user.interface';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  contactlist: any;
  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private contacts: Contacts) {
    this.user = navParams.get('user');
    this.platform.ready().then(() => {
      var options = {
        filter: '',
        multiple: true,
        hasPhoneNumber: true,
        desiredFields: ['name.formatted', 'phoneNumbers'],
        fields: ['name.formatted', 'phoneNumbers']
      };
      contacts.find(['name'], options).then((contacts) => {
        //console.log(contacts);
        this.contactlist = contacts;
      }, (error) => {
        console.log(error);
      });
    })
  }

  tapped(event, info) {

    this.navCtrl.push(PhonecontactplanPage, {
      item: info,
      user: this.user
    });
  }




}
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