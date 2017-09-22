import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-contactplan',
  templateUrl: 'contactplan.html'
})
export class ContactplanPage {

  constructor(public navCtrl: NavController) {

  }
}