import {Component} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';
import {ItemDetailsPage} from '../item-details/item-details';

@Component({
  selector: 'baselist',
  templateUrl: 'list.html'
})

export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{ title: string, text: string, icon: string }>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedItem = navParams.get('item');

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane', 'american-football', 'boat', 'bluetooth', 'build', 'glasses'];
    this.items = [];

    for (let i = 1; i < 13; i++) {
      this.items.push({
        title: 'Item: ' + i,
        text: 'This is #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}