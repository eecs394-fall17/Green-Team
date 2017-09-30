webpackJsonp([0],{

/***/ 149:
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
webpackEmptyAsyncContext.id = 149;

/***/ }),

/***/ 192:
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
webpackEmptyAsyncContext.id = 192;

/***/ }),

/***/ 233:
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
        //console.log(this.phoneContact.phoneNumbers);
        this.contact.name = this.phoneContact.name.formatted; //setting name from phone to this contact's info
        this.contact.phoneNumbers = this.phoneContact.phoneNumbers; //this is an array
        this.contact.repeat = this.repeats[1]; //making it automatically be weekly
        this.contact.daytime = (new Date()).toISOString();
    }
    PhonecontactplanPage.prototype.logForm = function () {
        console.log(this.contact);
        //pushing the newly created contact from the form to the db
        this.contacts.push(this.contact);
        //going back to the root page
        this.navCtrl.popToRoot();
    };
    return PhonecontactplanPage;
}());
PhonecontactplanPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-phonecontactplan',template:/*ion-inline-start:"/Users/Durell/Desktop/Git Check/Green-Team/src/pages/phonecontactplan/phonecontactplan.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Keep In Touch\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <h3>Add a Contact Plan From Your Phone:</h3>\n  <form (ngSubmit)="logForm()">       \n    <ion-item>\n      <ion-label floating >Contact Name:</ion-label> \n      <ion-input type="text" [(ngModel)]="contact.name" name="name"></ion-input>\n    </ion-item> \n\n    <ion-list *ngFor="let number of contact.phoneNumbers">\n      <ion-item> <span>{{number.type}}: </span>{{number.value}}</ion-item>\n      \n    </ion-list>\n\n    <ion-item>\n      <ion-label floating >Description:</ion-label>\n      <ion-textarea [(ngModel)]="contact.description" name="description"></ion-textarea>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Repeat</ion-label>\n      <ion-select [(ngModel)]="contact.repeat" name="repeat">\n        <ion-option *ngFor="let repeat of repeats">{{repeat}}</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating >Start Date</ion-label>\n      <ion-datetime displayFormat="YYYY/MM/DD" pickerFormat="YYYY MMM DDD" [(ngModel)]="contact.daytime" [ngModelOptions]="{standalone: true}"></ion-datetime>\n    </ion-item>\n    \n    <ion-item>\n      <ion-label floating >Start Time</ion-label>\n      <ion-datetime displayFormat="h:mm A" pickerFormat="h mm A" [(ngModel)]="contact.daytime" [ngModelOptions]="{standalone: true}"></ion-datetime>\n    </ion-item>\n    <button ion-button type="submit" block>Add Contact Plan</button>\n  </form>\n\n\n\n</ion-content>'/*ion-inline-end:"/Users/Durell/Desktop/Git Check/Green-Team/src/pages/phonecontactplan/phonecontactplan.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]])
], PhonecontactplanPage);

//# sourceMappingURL=phonecontactplan.js.map

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contactplan_contactplan__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_call_number__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';




var ContactPage = (function () {
    function ContactPage(navCtrl, alertCtrl, actionSheetCtrl, callNumber, db) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.callNumber = callNumber;
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
    ContactPage.prototype.choosePlan = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Create a New Contact Plan',
            buttons: [
                {
                    text: 'Choose Contact from Phone',
                    handler: function () {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */], {});
                    }
                },
                {
                    text: 'Create a Custom Contact',
                    handler: function () {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__contactplan_contactplan__["a" /* ContactplanPage */], {});
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
    ContactPage.prototype.callThem = function (number) {
        //console.log(number);
        this.callNumber.callNumber('1234567890', false)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    ContactPage.prototype.showOptions = function (contactId, contactTitle) {
        var _this = this;
        console.log("showOptions called");
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
        var new_date = __WEBPACK_IMPORTED_MODULE_6_moment__(time).add(rep_type[1], rep_type[0]);
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
    return ContactPage;
}());
ContactPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-contact',template:/*ion-inline-start:"/Users/Durell/Desktop/Git Check/Green-Team/src/pages/contact/contact.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n          <ion-icon name="menu"></ion-icon>\n        </button>\n    <ion-title>\n      Keep In Touch\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="choosePlan()">\n        <ion-icon name="add"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <h4>Today</h4>\n  <ion-list class="accordion-list">\n    <div *ngFor="let contact of todaycontacts | async; let i = index">\n      <ion-item (click)="toggleContactHolder(contact.$key)" [ngClass]="{\'section-active\': openedContact == contact.$key, \'section\': openedContact == contact.$key}">\n\n        <div>{{contact.name}}</div>\n\n        <div class="darkgrey" *ngIf="contact.description">\n          {{contact.description}}\n        </div>\n\n        <div>{{contact.daytime | timeOfDay}}, {{contact.repeat}}</div>\n\n\n        <button ion-button icon-only item-end small (click)="repeatContact(contact.$key, contact.daytime, contact.repeat)">\n        <ion-icon name="md-checkmark"></ion-icon>\n      </button>\n\n        <button ion-button icon-only item-end small (click)="showOptions(contact.$key, contact.name)">\n        <ion-icon name="more"></ion-icon>\n      </button>\n      </ion-item>\n\n      <div>\n        <button ion-button icon-only item-start outline small color="secondary" (click)="callThem(contact.phoneNumbers[0].value)">\n          <ion-icon name="call"> </ion-icon>\n        </button>\n\n        <button ion-button icon-only item-start outline small color="secondary">\n        <ion-icon name="text"> </ion-icon>\n      </button>\n      </div>\n    </div>\n  </ion-list>\n\n  <h4>Later</h4>\n  <ion-list class="accordion-list">\n    <div *ngFor="let contact of latercontacts | async; let i = index">\n      <ion-item (click)="toggleContactHolder(contact.$key)" [ngClass]="{\'section-active\': openedContact == contact.$key, \'section\': openedContact == contact.$key}">\n\n        <div>{{contact.name}}</div>\n\n        <div class="darkgrey" *ngIf="contact.description">\n          {{contact.description}}\n        </div>\n\n        <div>{{contact.daytime | timeOfDay:[\'day\']}}, {{contact.repeat}}</div>\n\n        <button ion-button icon-only item-end small (click)="repeatContact(contact.$key, contact.daytime, contact.repeat)">\n          <ion-icon name="md-checkmark"></ion-icon>\n      </button>\n\n        <button ion-button icon-only item-end small (click)="showOptions(contact.$key, contact.name)">\n          <ion-icon name="more"></ion-icon>\n      </button>\n      </ion-item>\n\n      <div *ngIf="openedContact == contact.$key">\n        <button ion-button icon-only item-start outline small color="secondary" (click)="callThem()">\n        <ion-icon name="call"> </ion-icon>\n      </button>\n\n        <button ion-button icon-only item-start outline small color="secondary">\n        <ion-icon name="text"> </ion-icon>\n      </button>\n      </div>\n    </div>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/Durell/Desktop/Git Check/Green-Team/src/pages/contact/contact.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__ionic_native_call_number__["a" /* CallNumber */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__ionic_native_call_number__["a" /* CallNumber */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */]) === "function" && _e || Object])
], ContactPage);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 271:
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
        this.navCtrl.popToRoot();
    };
    return ContactplanPage;
}());
ContactplanPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-contactplan',template:/*ion-inline-start:"/Users/Durell/Desktop/Git Check/Green-Team/src/pages/contactplan/contactplan.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Keep In Touch\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <h3>Add a Custom Contact Plan:</h3>\n  <form (ngSubmit)="logForm()">       \n    <ion-item>\n      <ion-label floating >Contact Name:</ion-label> \n      <ion-input type="text" [(ngModel)]="contact.name" name="name"></ion-input>\n    </ion-item> \n\n    <ion-item>\n      <ion-label floating >Description:</ion-label>\n      <ion-textarea [(ngModel)]="contact.description" name="description"></ion-textarea>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Repeat</ion-label>\n      <ion-select [(ngModel)]="contact.repeat" name="repeat">\n        <ion-option *ngFor="let repeat of repeats">{{repeat}}</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating >Start Date</ion-label>\n      <ion-datetime displayFormat="YYYY/MM/DD" pickerFormat="YYYY MMM DDD" [(ngModel)]="contact.daytime" [ngModelOptions]="{standalone: true}"></ion-datetime>\n    </ion-item>\n    \n    <ion-item>\n      <ion-label floating >Start Time</ion-label>\n      <ion-datetime displayFormat="h:mm A" pickerFormat="h mm A" [(ngModel)]="contact.daytime" [ngModelOptions]="{standalone: true}"></ion-datetime>\n    </ion-item>\n    <button ion-button type="submit" block>Add Contact Plan</button>\n  </form>\n\n\n\n</ion-content>'/*ion-inline-end:"/Users/Durell/Desktop/Git Check/Green-Team/src/pages/contactplan/contactplan.html"*/
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_call_number__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_home_home__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_contacts__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(516);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_contact_contact__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_contactplan_contactplan__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pipes_time__ = __webpack_require__(519);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angularfire2__ = __webpack_require__(520);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_angularfire2_database__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_angularfire2_auth__ = __webpack_require__(521);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_phonecontactplan_phonecontactplan__ = __webpack_require__(233);
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
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_contact_contact__["a" /* ContactPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_contactplan_contactplan__["a" /* ContactplanPage */],
            __WEBPACK_IMPORTED_MODULE_9__pipes_time__["a" /* TimeOfDay */],
            __WEBPACK_IMPORTED_MODULE_1__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_phonecontactplan_phonecontactplan__["a" /* PhonecontactplanPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */]),
            __WEBPACK_IMPORTED_MODULE_12_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig, 'songstest'),
            __WEBPACK_IMPORTED_MODULE_13_angularfire2_database__["b" /* AngularFireDatabaseModule */],
            __WEBPACK_IMPORTED_MODULE_14_angularfire2_auth__["a" /* AngularFireAuthModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_contact_contact__["a" /* ContactPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_contactplan_contactplan__["a" /* ContactplanPage */],
            __WEBPACK_IMPORTED_MODULE_1__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_phonecontactplan_phonecontactplan__["a" /* PhonecontactplanPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_contacts__["a" /* Contacts */],
            __WEBPACK_IMPORTED_MODULE_0__ionic_native_call_number__["a" /* CallNumber */],
            { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 516:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_home_home__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_contact_contact__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(388);
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
        this.rootPage = __WEBPACK_IMPORTED_MODULE_3__pages_contact_contact__["a" /* ContactPage */];
        this.initializeApp();
        // set our app's pages
        this.pages = [
            { title: 'Contacts', component: __WEBPACK_IMPORTED_MODULE_3__pages_contact_contact__["a" /* ContactPage */] },
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_0__pages_home_home__["a" /* HomePage */] }
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
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/Durell/Desktop/Git Check/Green-Team/src/app/app.html"*/'<ion-menu [content]="content">\n\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Pages</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/Durell/Desktop/Git Check/Green-Team/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 518:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 272,
	"./af.js": 272,
	"./ar": 273,
	"./ar-dz": 274,
	"./ar-dz.js": 274,
	"./ar-kw": 275,
	"./ar-kw.js": 275,
	"./ar-ly": 276,
	"./ar-ly.js": 276,
	"./ar-ma": 277,
	"./ar-ma.js": 277,
	"./ar-sa": 278,
	"./ar-sa.js": 278,
	"./ar-tn": 279,
	"./ar-tn.js": 279,
	"./ar.js": 273,
	"./az": 280,
	"./az.js": 280,
	"./be": 281,
	"./be.js": 281,
	"./bg": 282,
	"./bg.js": 282,
	"./bn": 283,
	"./bn.js": 283,
	"./bo": 284,
	"./bo.js": 284,
	"./br": 285,
	"./br.js": 285,
	"./bs": 286,
	"./bs.js": 286,
	"./ca": 287,
	"./ca.js": 287,
	"./cs": 288,
	"./cs.js": 288,
	"./cv": 289,
	"./cv.js": 289,
	"./cy": 290,
	"./cy.js": 290,
	"./da": 291,
	"./da.js": 291,
	"./de": 292,
	"./de-at": 293,
	"./de-at.js": 293,
	"./de-ch": 294,
	"./de-ch.js": 294,
	"./de.js": 292,
	"./dv": 295,
	"./dv.js": 295,
	"./el": 296,
	"./el.js": 296,
	"./en-au": 297,
	"./en-au.js": 297,
	"./en-ca": 298,
	"./en-ca.js": 298,
	"./en-gb": 299,
	"./en-gb.js": 299,
	"./en-ie": 300,
	"./en-ie.js": 300,
	"./en-nz": 301,
	"./en-nz.js": 301,
	"./eo": 302,
	"./eo.js": 302,
	"./es": 303,
	"./es-do": 304,
	"./es-do.js": 304,
	"./es.js": 303,
	"./et": 305,
	"./et.js": 305,
	"./eu": 306,
	"./eu.js": 306,
	"./fa": 307,
	"./fa.js": 307,
	"./fi": 308,
	"./fi.js": 308,
	"./fo": 309,
	"./fo.js": 309,
	"./fr": 310,
	"./fr-ca": 311,
	"./fr-ca.js": 311,
	"./fr-ch": 312,
	"./fr-ch.js": 312,
	"./fr.js": 310,
	"./fy": 313,
	"./fy.js": 313,
	"./gd": 314,
	"./gd.js": 314,
	"./gl": 315,
	"./gl.js": 315,
	"./gom-latn": 316,
	"./gom-latn.js": 316,
	"./he": 317,
	"./he.js": 317,
	"./hi": 318,
	"./hi.js": 318,
	"./hr": 319,
	"./hr.js": 319,
	"./hu": 320,
	"./hu.js": 320,
	"./hy-am": 321,
	"./hy-am.js": 321,
	"./id": 322,
	"./id.js": 322,
	"./is": 323,
	"./is.js": 323,
	"./it": 324,
	"./it.js": 324,
	"./ja": 325,
	"./ja.js": 325,
	"./jv": 326,
	"./jv.js": 326,
	"./ka": 327,
	"./ka.js": 327,
	"./kk": 328,
	"./kk.js": 328,
	"./km": 329,
	"./km.js": 329,
	"./kn": 330,
	"./kn.js": 330,
	"./ko": 331,
	"./ko.js": 331,
	"./ky": 332,
	"./ky.js": 332,
	"./lb": 333,
	"./lb.js": 333,
	"./lo": 334,
	"./lo.js": 334,
	"./lt": 335,
	"./lt.js": 335,
	"./lv": 336,
	"./lv.js": 336,
	"./me": 337,
	"./me.js": 337,
	"./mi": 338,
	"./mi.js": 338,
	"./mk": 339,
	"./mk.js": 339,
	"./ml": 340,
	"./ml.js": 340,
	"./mr": 341,
	"./mr.js": 341,
	"./ms": 342,
	"./ms-my": 343,
	"./ms-my.js": 343,
	"./ms.js": 342,
	"./my": 344,
	"./my.js": 344,
	"./nb": 345,
	"./nb.js": 345,
	"./ne": 346,
	"./ne.js": 346,
	"./nl": 347,
	"./nl-be": 348,
	"./nl-be.js": 348,
	"./nl.js": 347,
	"./nn": 349,
	"./nn.js": 349,
	"./pa-in": 350,
	"./pa-in.js": 350,
	"./pl": 351,
	"./pl.js": 351,
	"./pt": 352,
	"./pt-br": 353,
	"./pt-br.js": 353,
	"./pt.js": 352,
	"./ro": 354,
	"./ro.js": 354,
	"./ru": 355,
	"./ru.js": 355,
	"./sd": 356,
	"./sd.js": 356,
	"./se": 357,
	"./se.js": 357,
	"./si": 358,
	"./si.js": 358,
	"./sk": 359,
	"./sk.js": 359,
	"./sl": 360,
	"./sl.js": 360,
	"./sq": 361,
	"./sq.js": 361,
	"./sr": 362,
	"./sr-cyrl": 363,
	"./sr-cyrl.js": 363,
	"./sr.js": 362,
	"./ss": 364,
	"./ss.js": 364,
	"./sv": 365,
	"./sv.js": 365,
	"./sw": 366,
	"./sw.js": 366,
	"./ta": 367,
	"./ta.js": 367,
	"./te": 368,
	"./te.js": 368,
	"./tet": 369,
	"./tet.js": 369,
	"./th": 370,
	"./th.js": 370,
	"./tl-ph": 371,
	"./tl-ph.js": 371,
	"./tlh": 372,
	"./tlh.js": 372,
	"./tr": 373,
	"./tr.js": 373,
	"./tzl": 374,
	"./tzl.js": 374,
	"./tzm": 375,
	"./tzm-latn": 376,
	"./tzm-latn.js": 376,
	"./tzm.js": 375,
	"./uk": 377,
	"./uk.js": 377,
	"./ur": 378,
	"./ur.js": 378,
	"./uz": 379,
	"./uz-latn": 380,
	"./uz-latn.js": 380,
	"./uz.js": 379,
	"./vi": 381,
	"./vi.js": 381,
	"./x-pseudo": 382,
	"./x-pseudo.js": 382,
	"./yo": 383,
	"./yo.js": 383,
	"./zh-cn": 384,
	"./zh-cn.js": 384,
	"./zh-hk": 385,
	"./zh-hk.js": 385,
	"./zh-tw": 386,
	"./zh-tw.js": 386
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
webpackContext.id = 518;

/***/ }),

/***/ 519:
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

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_contacts__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__phonecontactplan_phonecontactplan__ = __webpack_require__(233);
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
                desiredFields: ['name.formatted', 'phoneNumbers'],
                fields: ['name.formatted', 'phoneNumbers']
            };
            contacts.find(['name'], options).then(function (contacts) {
                console.log(contacts);
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
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__phonecontactplan_phonecontactplan__["a" /* PhonecontactplanPage */], {
            item: info
        });
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/Durell/Desktop/Git Check/Green-Team/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Keep In Touch\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-item>\n    <ion-label floating>Search:</ion-label>\n    <ion-textarea [(ngModel)]="query" name="query"></ion-textarea>\n  </ion-item>\n  <ion-list>\n    <button ion-item *ngFor="let contact of contactlist" (click)="tapped($event, contact)">\n      <div *ngIf="contact.name">\n          {{contact.name.formatted}} \n      </div>\n    </button>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/Durell/Desktop/Git Check/Green-Team/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_contacts__["a" /* Contacts */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ })

},[391]);
//# sourceMappingURL=main.js.map