webpackJsonp([0],{

/***/ 147:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 147;

/***/ }),

/***/ 148:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_contacts__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__phonecontactplan_phonecontactplan__ = __webpack_require__(231);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = (function () {
    function HomePage(navCtrl, platform, contacts) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.contacts = contacts;
        this.platform.ready().then(function () {
            var options = {
                filter: '',
                multiple: true,
                hasPhoneNumber: true,
                fields: ['displayName']
            };
            contacts.find(['displayName'], options).then(function (contacts) {
                _this.contactlist = contacts;
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
                console.log(_this.contactlist);
            }, function (error) {
                console.log(error);
            });
        });
    }
    HomePage.prototype.tapped = function (event, info) {
        // console.log(info.displayName);
        // console.log(info.emails);
        // console.log(info.phoneNumbers);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__phonecontactplan_phonecontactplan__["a" /* PhonecontactplanPage */], {
            item: info
        });
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"C:\cygwin64\home\Matinee\Green-Team\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>\n      Keep In Touch\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-item>\n    <ion-label floating>Search:</ion-label>\n    <ion-textarea [(ngModel)]="query" name="query"></ion-textarea>\n  </ion-item>\n  <ion-list>\n    <button ion-item *ngFor="let contact of contactlist" (click)="tapped($event, contact)">\n      <ion-item *ngIf="contact.displayName">\n          {{contact.displayName}}\n      </ion-item>\n    </button>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"C:\cygwin64\home\Matinee\Green-Team\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_contacts__["a" /* Contacts */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 189:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 189;

/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhonecontactplanPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(73);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { ContactPlan } from '../../models/contactplan.interface';
var PhonecontactplanPage = (function () {
    function PhonecontactplanPage(navCtrl, navParams, db) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.contact = {};
        this.phoneContact = {};
        this.repeats = [
            "Daily",
            "Weekly",
            "Fortnightly",
            "Monthly",
            "Yearly",
            "Once"
        ];
        this.contacts = db.list('/contacts'); //setting up database
        this.phoneContact = navParams.get('item'); //getting the object from the the previous page
        console.log(this.phoneContact.displayName);
        this.contact.displayName = this.phoneContact.displayName; //setting name from phone to this contact's info
        this.contact.repeat = this.repeats[1]; //making it automatically be weekly
        this.contact.daytime = (new Date()).toISOString();
    }
    PhonecontactplanPage.prototype.logForm = function () {
        console.log(this.contact);
        //pushing the newly created contact from the form to the db
        this.contacts.push(this.contact);
        //going back to the previous page
        this.navCtrl.pop();
    };
    return PhonecontactplanPage;
}());
PhonecontactplanPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-phonecontactplan',template:/*ion-inline-start:"C:\cygwin64\home\Matinee\Green-Team\src\pages\phonecontactplan\phonecontactplan.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>\n      Keep In Touch\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <h3>Add a Contact Plan From Your Phone:</h3>\n  <form (ngSubmit)="logForm()">       \n    <ion-item>\n      <ion-label floating >Contact Name:</ion-label> \n      <ion-input type="text" [(ngModel)]="contact.displayName" name="name"></ion-input>\n    </ion-item> \n\n    <ion-item>\n      <ion-label floating >Description:</ion-label>\n      <ion-textarea [(ngModel)]="contact.description" name="description"></ion-textarea>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Repeat</ion-label>\n      <ion-select [(ngModel)]="contact.repeat" name="repeat">\n        <ion-option *ngFor="let repeat of repeats">{{repeat}}</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating >Start Date</ion-label>\n      <ion-datetime displayFormat="YYYY/MM/DD" pickerFormat="YYYY MMM DDD" [(ngModel)]="contact.daytime" [ngModelOptions]="{standalone: true}"></ion-datetime>\n    </ion-item>\n    \n    <ion-item>\n      <ion-label floating >Start Time</ion-label>\n      <ion-datetime displayFormat="h:mm A" pickerFormat="h mm A" [(ngModel)]="contact.daytime" [ngModelOptions]="{standalone: true}"></ion-datetime>\n    </ion-item>\n    <button ion-button type="submit" block>Add Contact Plan</button>\n  </form>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\cygwin64\home\Matinee\Green-Team\src\pages\phonecontactplan\phonecontactplan.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]])
], PhonecontactplanPage);

//# sourceMappingURL=phonecontactplan.js.map

/***/ }),

/***/ 269:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contactplan_contactplan__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ContactPage = (function () {
    function ContactPage(navCtrl, alertCtrl, actionSheetCtrl, db, afAuth) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.contacts = db.list('/contacts'); //this sets the db data to the variable within the view
        this.openedContact = undefined;
        var dayBegin = new Date();
        dayBegin.setHours(0, 0, 0, 0);
        var dayEnd = new Date();
        dayEnd.setHours(23, 59, 59, 999);
        this.todaycontacts = db.list('/contacts', {
            query: {
                orderByChild: 'daytime',
                startAt: dayBegin.toISOString(),
                endAt: dayEnd.toISOString()
            }
        });
        this.latercontacts = db.list('/contacts', {
            query: {
                orderByChild: 'daytime',
                startAt: dayEnd.toISOString()
            }
        });
    }
    /*
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
    */
    ContactPage.prototype.showOptions = function (contactId, contactTitle) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'What do you want to do?',
            buttons: [
                {
                    text: 'Update Contact Plan',
                    handler: function () {
                        _this.updateContact(contactId, contactTitle);
                    }
                },
                {
                    text: 'Remove Contact Plan',
                    role: 'destructive',
                    handler: function () {
                        _this.removeContact(contactId);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    ContactPage.prototype.updateContact = function (contactId, contactTitle) {
        var _this = this;
        var prompt = this.alertCtrl.create({
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
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        _this.contacts.update(contactId, {
                            title: data.title
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
    ContactPage.prototype.repeatContact = function (contactId, time, rep) {
        var repeats = {
            "Daily": ['d', 1],
            "Weekly": ['w', 1],
            "Fortnightly": ['w', 2],
            "Monthly": ['M', 1],
            "Yearly": ['M', 12]
        };
        var rep_type = repeats[rep];
        var new_date = __WEBPACK_IMPORTED_MODULE_5_moment__(time).add(rep_type[1], rep_type[0]);
        this.contacts.update(contactId, {
            daytime: new_date.toISOString()
        });
    };
    ContactPage.prototype.removeContact = function (contactId) {
        this.contacts.remove(contactId);
    };
    ContactPage.prototype.toggleContactHolder = function (key) {
        if (this.openedContact == undefined) {
            this.openedContact = key;
        }
        else {
            this.openedContact = undefined;
        }
    };
    ContactPage.prototype.newContact = function (event) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__contactplan_contactplan__["a" /* ContactplanPage */], {});
    };
    return ContactPage;
}());
ContactPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-contact',template:/*ion-inline-start:"C:\cygwin64\home\Matinee\Green-Team\src\pages\contact\contact.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>\n      Keep In Touch\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="newContact()">\n        <ion-icon name="add"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <h4>Today</h4>\n  <ion-list class="accordion-list">\n    <div *ngFor="let contact of todaycontacts | async; let i = index">\n      <ion-item (click)="toggleContactHolder(contact.$key)" [ngClass]="{\'section-active\': openedContact == contact.$key, \'section\': openedContact == contact.$key}">\n\n        <div>{{contact.name}}</div>\n\n        <div class="darkgrey" *ngIf="contact.description">\n          {{contact.description}}\n        </div>\n\n        <div>{{contact.daytime | timeOfDay}}, {{contact.repeat}}</div>\n\n\n        <button ion-button icon-only item-end small (click)="repeatContact(contact.$key, contact.daytime, contact.repeat)">\n        <ion-icon name="md-checkmark"></ion-icon>\n      </button>\n\n        <button ion-button icon-only item-end small (click)="showOptions(contact.$key, contact.name)">\n        <ion-icon name="more"></ion-icon>\n      </button>\n      </ion-item>\n\n      <div *ngIf="openedContact == contact.$key">\n        <button ion-button icon-only item-start outline small color="secondary">\n        <ion-icon name="call"> </ion-icon>\n      </button>\n\n        <button ion-button icon-only item-start outline small color="secondary">\n        <ion-icon name="text"> </ion-icon>\n      </button>\n      </div>\n    </div>\n  </ion-list>\n\n  <h4>Later</h4>\n  <ion-list class="accordion-list">\n    <div *ngFor="let contact of latercontacts | async; let i = index">\n      <ion-item (click)="toggleContactHolder(contact.$key)" [ngClass]="{\'section-active\': openedContact == contact.$key, \'section\': openedContact == contact.$key}">\n\n        <div>{{contact.name}}</div>\n\n        <div class="darkgrey" *ngIf="contact.description">\n          {{contact.description}}\n        </div>\n\n        <div>{{contact.daytime | timeOfDay:[\'day\']}}, {{contact.repeat}}</div>\n\n        <button ion-button icon-only item-end small (click)="repeatContact(contact.$key, contact.daytime, contact.repeat)">\n          <ion-icon name="md-checkmark"></ion-icon>\n      </button>\n\n        <button ion-button icon-only item-end small (click)="showOptions(contact.$key, contact.name)">\n          <ion-icon name="more"></ion-icon>\n      </button>\n      </ion-item>\n\n      <div *ngIf="openedContact == contact.$key">\n        <button ion-button icon-only item-start outline small color="secondary">\n        <ion-icon name="call"> </ion-icon>\n      </button>\n\n        <button ion-button icon-only item-start outline small color="secondary">\n        <ion-icon name="text"> </ion-icon>\n      </button>\n      </div>\n    </div>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"C:\cygwin64\home\Matinee\Green-Team\src\pages\contact\contact.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */]])
], ContactPage);

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactplanPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(73);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { ContactPlan } from '../../models/contactplan.interface';
var ContactplanPage = (function () {
    function ContactplanPage(navCtrl, navParams, db) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.contact = {};
        this.repeats = [
            "Daily",
            "Weekly",
            "Fortnightly",
            "Monthly",
            "Yearly",
            "Once"
        ];
        this.contacts = db.list('/contacts');
        this.contact.repeat = this.repeats[1];
        this.contact.daytime = (new Date()).toISOString();
    }
    ContactplanPage.prototype.logForm = function () {
        console.log(this.contact);
        //pushing the newly created contact from the form to the db
        this.contacts.push(this.contact);
        //going back to the previous page
        this.navCtrl.pop();
    };
    return ContactplanPage;
}());
ContactplanPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-contactplan',template:/*ion-inline-start:"C:\cygwin64\home\Matinee\Green-Team\src\pages\contactplan\contactplan.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>\n      Keep In Touch\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <h3>Add a Custom Contact Plan:</h3>\n  <form (ngSubmit)="logForm()">       \n    <ion-item>\n      <ion-label floating >Contact Name:</ion-label> \n      <ion-input type="text" [(ngModel)]="contact.name" name="name"></ion-input>\n    </ion-item> \n\n    <ion-item>\n      <ion-label floating >Description:</ion-label>\n      <ion-textarea [(ngModel)]="contact.description" name="description"></ion-textarea>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Repeat</ion-label>\n      <ion-select [(ngModel)]="contact.repeat" name="repeat">\n        <ion-option *ngFor="let repeat of repeats">{{repeat}}</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating >Start Date</ion-label>\n      <ion-datetime displayFormat="YYYY/MM/DD" pickerFormat="YYYY MMM DDD" [(ngModel)]="contact.daytime" [ngModelOptions]="{standalone: true}"></ion-datetime>\n    </ion-item>\n    \n    <ion-item>\n      <ion-label floating >Start Time</ion-label>\n      <ion-datetime displayFormat="h:mm A" pickerFormat="h mm A" [(ngModel)]="contact.daytime" [ngModelOptions]="{standalone: true}"></ion-datetime>\n    </ion-item>\n    <button ion-button type="submit" block>Add Contact Plan</button>\n  </form>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\cygwin64\home\Matinee\Green-Team\src\pages\contactplan\contactplan.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]])
], ContactplanPage);

//# sourceMappingURL=contactplan.js.map

/***/ }),

/***/ 391:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(408);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 408:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_home_home__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_contacts__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(518);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_contact_contact__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_contactplan_contactplan__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_phonecontactplan_phonecontactplan__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_signin_signin__ = __webpack_require__(524);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pipes_time__ = __webpack_require__(523);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_splash_screen__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_angularfire2__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_angularfire2_database__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_angularfire2_auth__ = __webpack_require__(271);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var firebaseConfig = {
    apiKey: "AIzaSyBJhOg72no3tBYZp-dQSB4pOf2vPBRvoj8",
    authDomain: "keepintouch-168d3.firebaseapp.com",
    databaseURL: "https://keepintouch-168d3.firebaseio.com",
    projectId: "keepintouch-168d3",
    storageBucket: "",
    messagingSenderId: "253253255823"
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_6__pages_contact_contact__["a" /* ContactPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_contactplan_contactplan__["a" /* ContactplanPage */],
            __WEBPACK_IMPORTED_MODULE_10__pipes_time__["a" /* TimeOfDay */],
            __WEBPACK_IMPORTED_MODULE_0__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_phonecontactplan_phonecontactplan__["a" /* PhonecontactplanPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_signin_signin__["a" /* SigninPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */]),
            __WEBPACK_IMPORTED_MODULE_13_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig, 'songstest'),
            __WEBPACK_IMPORTED_MODULE_14_angularfire2_database__["b" /* AngularFireDatabaseModule */],
            __WEBPACK_IMPORTED_MODULE_15_angularfire2_auth__["b" /* AngularFireAuthModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_6__pages_contact_contact__["a" /* ContactPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_contactplan_contactplan__["a" /* ContactplanPage */],
            __WEBPACK_IMPORTED_MODULE_0__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_phonecontactplan_phonecontactplan__["a" /* PhonecontactplanPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_signin_signin__["a" /* SigninPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_contacts__["a" /* Contacts */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 518:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_home_home__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_contact_contact__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_signin_signin__ = __webpack_require__(524);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(390);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = (function () {
    function MyApp(platform, statusBar, menu, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.menu = menu;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_0__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        // set our app's pages
        this.pages = [
            { title: 'Contacts', component: __WEBPACK_IMPORTED_MODULE_3__pages_contact_contact__["a" /* ContactPage */] },
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_0__pages_home_home__["a" /* HomePage */] },
            { title: 'Sign In', component: __WEBPACK_IMPORTED_MODULE_4__pages_signin_signin__["a" /* SigninPage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(page.component);
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* Nav */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* Nav */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* Nav */]) === "function" && _a || Object)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\cygwin64\home\Matinee\Green-Team\src\app\app.html"*/'<ion-menu [content]="content">\n\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Pages</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"C:\cygwin64\home\Matinee\Green-Team\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* Platform */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* MenuController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* MenuController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */]) === "function" && _e || Object])
], MyApp);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 522:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 274,
	"./af.js": 274,
	"./ar": 275,
	"./ar-dz": 276,
	"./ar-dz.js": 276,
	"./ar-kw": 277,
	"./ar-kw.js": 277,
	"./ar-ly": 278,
	"./ar-ly.js": 278,
	"./ar-ma": 279,
	"./ar-ma.js": 279,
	"./ar-sa": 280,
	"./ar-sa.js": 280,
	"./ar-tn": 281,
	"./ar-tn.js": 281,
	"./ar.js": 275,
	"./az": 282,
	"./az.js": 282,
	"./be": 283,
	"./be.js": 283,
	"./bg": 284,
	"./bg.js": 284,
	"./bn": 285,
	"./bn.js": 285,
	"./bo": 286,
	"./bo.js": 286,
	"./br": 287,
	"./br.js": 287,
	"./bs": 288,
	"./bs.js": 288,
	"./ca": 289,
	"./ca.js": 289,
	"./cs": 290,
	"./cs.js": 290,
	"./cv": 291,
	"./cv.js": 291,
	"./cy": 292,
	"./cy.js": 292,
	"./da": 293,
	"./da.js": 293,
	"./de": 294,
	"./de-at": 295,
	"./de-at.js": 295,
	"./de-ch": 296,
	"./de-ch.js": 296,
	"./de.js": 294,
	"./dv": 297,
	"./dv.js": 297,
	"./el": 298,
	"./el.js": 298,
	"./en-au": 299,
	"./en-au.js": 299,
	"./en-ca": 300,
	"./en-ca.js": 300,
	"./en-gb": 301,
	"./en-gb.js": 301,
	"./en-ie": 302,
	"./en-ie.js": 302,
	"./en-nz": 303,
	"./en-nz.js": 303,
	"./eo": 304,
	"./eo.js": 304,
	"./es": 305,
	"./es-do": 306,
	"./es-do.js": 306,
	"./es.js": 305,
	"./et": 307,
	"./et.js": 307,
	"./eu": 308,
	"./eu.js": 308,
	"./fa": 309,
	"./fa.js": 309,
	"./fi": 310,
	"./fi.js": 310,
	"./fo": 311,
	"./fo.js": 311,
	"./fr": 312,
	"./fr-ca": 313,
	"./fr-ca.js": 313,
	"./fr-ch": 314,
	"./fr-ch.js": 314,
	"./fr.js": 312,
	"./fy": 315,
	"./fy.js": 315,
	"./gd": 316,
	"./gd.js": 316,
	"./gl": 317,
	"./gl.js": 317,
	"./gom-latn": 318,
	"./gom-latn.js": 318,
	"./he": 319,
	"./he.js": 319,
	"./hi": 320,
	"./hi.js": 320,
	"./hr": 321,
	"./hr.js": 321,
	"./hu": 322,
	"./hu.js": 322,
	"./hy-am": 323,
	"./hy-am.js": 323,
	"./id": 324,
	"./id.js": 324,
	"./is": 325,
	"./is.js": 325,
	"./it": 326,
	"./it.js": 326,
	"./ja": 327,
	"./ja.js": 327,
	"./jv": 328,
	"./jv.js": 328,
	"./ka": 329,
	"./ka.js": 329,
	"./kk": 330,
	"./kk.js": 330,
	"./km": 331,
	"./km.js": 331,
	"./kn": 332,
	"./kn.js": 332,
	"./ko": 333,
	"./ko.js": 333,
	"./ky": 334,
	"./ky.js": 334,
	"./lb": 335,
	"./lb.js": 335,
	"./lo": 336,
	"./lo.js": 336,
	"./lt": 337,
	"./lt.js": 337,
	"./lv": 338,
	"./lv.js": 338,
	"./me": 339,
	"./me.js": 339,
	"./mi": 340,
	"./mi.js": 340,
	"./mk": 341,
	"./mk.js": 341,
	"./ml": 342,
	"./ml.js": 342,
	"./mr": 343,
	"./mr.js": 343,
	"./ms": 344,
	"./ms-my": 345,
	"./ms-my.js": 345,
	"./ms.js": 344,
	"./my": 346,
	"./my.js": 346,
	"./nb": 347,
	"./nb.js": 347,
	"./ne": 348,
	"./ne.js": 348,
	"./nl": 349,
	"./nl-be": 350,
	"./nl-be.js": 350,
	"./nl.js": 349,
	"./nn": 351,
	"./nn.js": 351,
	"./pa-in": 352,
	"./pa-in.js": 352,
	"./pl": 353,
	"./pl.js": 353,
	"./pt": 354,
	"./pt-br": 355,
	"./pt-br.js": 355,
	"./pt.js": 354,
	"./ro": 356,
	"./ro.js": 356,
	"./ru": 357,
	"./ru.js": 357,
	"./sd": 358,
	"./sd.js": 358,
	"./se": 359,
	"./se.js": 359,
	"./si": 360,
	"./si.js": 360,
	"./sk": 361,
	"./sk.js": 361,
	"./sl": 362,
	"./sl.js": 362,
	"./sq": 363,
	"./sq.js": 363,
	"./sr": 364,
	"./sr-cyrl": 365,
	"./sr-cyrl.js": 365,
	"./sr.js": 364,
	"./ss": 366,
	"./ss.js": 366,
	"./sv": 367,
	"./sv.js": 367,
	"./sw": 368,
	"./sw.js": 368,
	"./ta": 369,
	"./ta.js": 369,
	"./te": 370,
	"./te.js": 370,
	"./tet": 371,
	"./tet.js": 371,
	"./th": 372,
	"./th.js": 372,
	"./tl-ph": 373,
	"./tl-ph.js": 373,
	"./tlh": 374,
	"./tlh.js": 374,
	"./tr": 375,
	"./tr.js": 375,
	"./tzl": 376,
	"./tzl.js": 376,
	"./tzm": 377,
	"./tzm-latn": 378,
	"./tzm-latn.js": 378,
	"./tzm.js": 377,
	"./uk": 379,
	"./uk.js": 379,
	"./ur": 380,
	"./ur.js": 380,
	"./uz": 381,
	"./uz-latn": 382,
	"./uz-latn.js": 382,
	"./uz.js": 381,
	"./vi": 383,
	"./vi.js": 383,
	"./x-pseudo": 384,
	"./x-pseudo.js": 384,
	"./yo": 385,
	"./yo.js": 385,
	"./zh-cn": 386,
	"./zh-cn.js": 386,
	"./zh-hk": 387,
	"./zh-hk.js": 387,
	"./zh-tw": 388,
	"./zh-tw.js": 388
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 522;

/***/ }),

/***/ 523:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimeOfDay; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var TimeOfDay = (function () {
    function TimeOfDay() {
    }
    TimeOfDay.prototype.transform = function (value, args) {
        var date = new Date(value);
        //console.log(date);
        var time = (date.getUTCHours() % 12) + ":" + date.getUTCMinutes();
        time += (date.getUTCHours() > 12) ? " pm" : " am";
        if (args != undefined && args[0] == 'day') {
            var day_names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            return day_names[date.getUTCDay()] + ", " + time;
        }
        return time;
    };
    return TimeOfDay;
}());
TimeOfDay = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({
        name: 'timeOfDay'
    }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])()
], TimeOfDay);

//# sourceMappingURL=time.js.map

/***/ }),

/***/ 524:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SigninPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_contact_contact__ = __webpack_require__(269);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SigninPage = (function () {
    function SigninPage(navCtrl, navParams, db) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.user = {};
        this.users = db.list('users');
    }
    SigninPage.prototype.logForm = function () {
        console.log(this.user);
        //pushing the newly created contact from the form to the db
        this.users.push(this.user);
        //going back to the previous page
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_contact_contact__["a" /* ContactPage */]);
    };
    return SigninPage;
}());
SigninPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-signin',template:/*ion-inline-start:"C:\cygwin64\home\Matinee\Green-Team\src\pages\signin\signin.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n\n    <ion-title>\n\n      Keep In Touch\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n  <h3>Sign In:</h3>\n\n  <form (ngSubmit)="logForm()">       \n\n    <ion-item>\n\n      <ion-label floating >User Name:</ion-label> \n\n      <ion-input type="text" [(ngModel)]="user.name" name="name"></ion-input>\n\n    </ion-item> \n\n\n\n    <ion-item>\n\n      <ion-label floating >Password:</ion-label>\n\n      <ion-textarea [(ngModel)]="user.password" name="description"></ion-textarea>\n\n    </ion-item>\n\n\n\n    <button ion-button type="submit" block>Sign In</button>\n\n  </form>\n\n\n\n\n\n\n\n</ion-content>'/*ion-inline-end:"C:\cygwin64\home\Matinee\Green-Team\src\pages\signin\signin.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]) === "function" && _c || Object])
], SigninPage);

var _a, _b, _c;
//# sourceMappingURL=signin.js.map

/***/ })

},[391]);
//# sourceMappingURL=main.js.map