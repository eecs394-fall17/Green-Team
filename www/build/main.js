webpackJsonp([0],{

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contactplan_contactplan__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(59);
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





//import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';



var ContactPage = (function () {
    function ContactPage(navCtrl, navParams, alertCtrl, actionSheetCtrl, db) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.db = db;
        this.user = {};
        this.user = navParams.get('user');
        console.log(this.user);
        this.contacts = db.list('/contacts'); //this sets the db data to the variable within the view
        this.openedContact = undefined;
        console.log(this.todaycontacts);
        console.log(this.latercontacts);
    }
    ContactPage.prototype.ngOnInit = function () {
        var _this = this;
        this.todaycontacts = [];
        this.latercontacts = [];
        this.laterchunks = [];
        var dayBegin = new Date();
        dayBegin.setHours(0, 0, 0, 0);
        var dayEnd = new Date();
        dayEnd.setHours(23, 59, 59, 999);
        this.db.list('contacts', {
            query: {
                orderByChild: 'daytime',
                startAt: dayBegin.toISOString(),
                endAt: dayEnd.toISOString()
            }
        }).subscribe(function (contacts) {
            _this.filterContactsByUser(contacts, _this.todaycontacts);
        });
        this.db.list('contacts', {
            query: {
                orderByChild: 'daytime',
                startAt: dayEnd.toISOString()
            }
        }).subscribe(function (contacts) {
            _this.filterContactsByUser(contacts, _this.latercontacts);
            _this.chunkContacts(_this.latercontacts, _this.laterchunks);
        });
    };
    ContactPage.prototype.filterContactsByUser = function (contacts, filteredList) {
        var filterUser = this.user;
        if (filterUser == undefined)
            return;
        filteredList.length = 0;
        contacts.forEach(function (c) {
            if (c.username == filterUser.username) {
                filteredList.push(c);
            }
        });
    };
    ContactPage.prototype.chunkContacts = function (contacts, chunks) {
        if (contacts.length == 0)
            return;
        chunks.push([contacts[0]]);
        var chunkIndex = 0;
        var endTime = __WEBPACK_IMPORTED_MODULE_5_moment__(chunks[0].daytime).startOf('day').add(1, 'd').toDate();
        for (var i = 0; i < contacts.length; i++) {
            var cDate = new Date(contacts[i].daytime);
            console.log(endTime);
            console.log(cDate);
            if ((cDate - endTime) > 0) {
                endTime = __WEBPACK_IMPORTED_MODULE_5_moment__(cDate).startOf('day').add(1, 'd').toDate();
                chunks.push([contacts[i]]);
                chunkIndex++;
            }
            else {
                chunks[chunkIndex].push(contacts[i]);
            }
        }
    };
    ContactPage.prototype.choosePlan = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Create a New Contact Plan',
            buttons: [
                {
                    text: 'Choose Contact from Phone',
                    handler: function () {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */], {
                            user: _this.user
                        });
                    }
                },
                {
                    text: 'Create a Custom Contact',
                    handler: function () {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__contactplan_contactplan__["a" /* ContactplanPage */], {
                            user: _this.user
                        });
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
        console.log(number);
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
    return ContactPage;
}());
ContactPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-contact',template:/*ion-inline-start:"/Users/Durell/Desktop/trash/Green-Team/src/pages/contact/contact.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n          <ion-icon name="menu"></ion-icon>\n        </button>\n    <ion-title>\n      Keep In Touch\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="choosePlan()">\n        <ion-icon name="add"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div>\n    <h4>Today</h4>\n    <ion-list *ngIf="todaycontacts.length > 0" class="accordion-list">\n      <div *ngFor="let contact of todaycontacts; let i = index">\n        <ion-item (click)="toggleContactHolder(contact.$key)" [ngClass]="{\'section-active\': openedContact == contact.$key, \'section\': openedContact == contact.$key}">\n\n          <div>{{contact.name}}</div>\n\n          <div class="darkgrey" *ngIf="contact.description">\n            {{contact.description}}\n          </div>\n\n          <div>{{contact.daytime | timeOfDay}}, {{contact.repeat}}</div>\n\n          <button ion-button icon-only item-end small (click)="repeatContact(contact.$key, contact.daytime, contact.repeat)">\n            <ion-icon name="md-checkmark"></ion-icon>\n          </button>\n\n          <button ion-button icon-only item-end small (click)="showOptions(contact.$key, contact.name)">\n            <ion-icon name="more"></ion-icon>\n          </button>\n        </ion-item>\n\n        <div *ngIf="openedContact == contact.$key">\n          <a *ngIf="contact.phoneNumbers" href="tel:{{contact.phoneNumbers[0].value}}" (click)="callThem(contact.phoneNumbers[0].value)">\n            <button ion-button icon-only item-start outline small color="secondary">\n              <ion-icon name="call"> </ion-icon>\n            </button>\n          </a>\n          \n          <a *ngIf="contact.phoneNumbers" [attr.href]="\'sms:\'+contact.phoneNumbers[0].value | safeUrl" (click)="callThem(contact.phoneNumbers[0].value)">\n            <button ion-button icon-only item-start outline small color="secondary">\n              <ion-icon name="text"> </ion-icon>\n            </button>\n          </a>\n\n          <div *ngIf="!contact.phoneNumbers">\n            <ion-item>No Contact Methods Provided</ion-item>\n          </div>\n        </div>\n      </div>\n    </ion-list>\n\n    <div *ngIf="latercontacts.length > 0" class="accordion-list">\n      <ion-list *ngFor="let chunk of laterchunks; let i = index">\n        <h4>{{ chunk[0].daytime | timeOfDay:[\'day\'] }}</h4>\n        <div *ngFor="let contact of chunk;">\n          <ion-item (click)="toggleContactHolder(contact.$key)" [ngClass]="{\'section-active\': openedContact == contact.$key, \'section\': openedContact == contact.$key}">\n\n            <div>{{contact.name}}</div>\n\n            <div class="darkgrey" *ngIf="contact.description">\n              {{contact.description}}\n            </div>\n\n            <div>{{contact.daytime | timeOfDay:[\'day\']}}, {{contact.repeat}}</div>\n\n            <button ion-button icon-only item-end small (click)="repeatContact(contact.$key, contact.daytime, contact.repeat)">\n              <ion-icon name="md-checkmark"></ion-icon>\n            </button>\n\n            <button ion-button icon-only item-end small (click)="showOptions(contact.$key, contact.name)">\n              <ion-icon name="more"></ion-icon>\n            </button>\n          </ion-item>\n\n          <div *ngIf="openedContact == contact.$key">\n            <a *ngIf="contact.phoneNumbers" href="tel:{{contact.phoneNumbers[0].value}}" (click)="callThem(contact.phoneNumbers[0].value)">\n              <button ion-button icon-only item-start outline small color="secondary">\n                <ion-icon name="call"> </ion-icon>\n              </button>\n            </a>\n            \n            <a *ngIf="contact.phoneNumbers" [attr.href]="\'sms:\'+contact.phoneNumbers[0].value | safeUrl" (click)="callThem(contact.phoneNumbers[0].value)">\n              <button ion-button icon-only item-start outline small color="secondary">\n                <ion-icon name="text"> </ion-icon>\n              </button>\n            </a>\n            \n            <div *ngIf="!contact.phoneNumbers">\n              <ion-item>No Contact Methods Provided</ion-item>\n            </div>\n          </div>\n        </div>\n      </ion-list>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/Durell/Desktop/trash/Green-Team/src/pages/contact/contact.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */]])
], ContactPage);

//# sourceMappingURL=contact.js.map

/***/ }),

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

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_contacts__ = __webpack_require__(231);
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
    function HomePage(navCtrl, navParams, platform, contacts) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.contacts = contacts;
        this.user = {};
        this.user = navParams.get('user');
        this.platform.ready().then(function () {
            var options = {
                filter: '',
                multiple: true,
                hasPhoneNumber: true,
                desiredFields: ['name.formatted', 'phoneNumbers'],
                fields: ['name.formatted', 'phoneNumbers']
            };
            contacts.find(['name'], options).then(function (contacts) {
                //console.log(contacts);
                _this.contactlist = contacts;
            }, function (error) {
                console.log(error);
            });
        });
    }
    HomePage.prototype.tapped = function (event, info) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__phonecontactplan_phonecontactplan__["a" /* PhonecontactplanPage */], {
            item: info,
            user: this.user
        });
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/Durell/Desktop/trash/Green-Team/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>\n      Keep In Touch\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-item>\n    <ion-label floating>Search:</ion-label>\n    <ion-textarea [(ngModel)]="query" name="query"></ion-textarea>\n  </ion-item>\n  <ion-list>\n    <button ion-item *ngFor="let contact of contactlist" (click)="tapped($event, contact)">\n      <div *ngIf="contact.name">\n          {{contact.name.formatted}} \n      </div>\n    </button>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/Durell/Desktop/trash/Green-Team/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_contacts__["a" /* Contacts */]])
], HomePage);

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
//# sourceMappingURL=home.js.map

/***/ }),

/***/ 191:
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
webpackEmptyAsyncContext.id = 191;

/***/ }),

/***/ 233:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhonecontactplanPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_local_notifications__ = __webpack_require__(524);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(59);
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
    function PhonecontactplanPage(navCtrl, navParams, db, plt, localNotifications, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.plt = plt;
        this.localNotifications = localNotifications;
        this.user = {};
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
        this.user = navParams.get('user');
        console.log(this.user);
        this.contact.username = this.user.username;
        /********************************** */
        this.plt.ready().then(function (readySource) {
            _this.localNotifications.on('click', function (notification, state) {
                var json = JSON.parse(notification.data);
                var alert = alertCtrl.create({
                    title: notification.title,
                    subTitle: json.mydata
                });
                alert.present();
            });
        });
        /********************************** */
    }
    PhonecontactplanPage.prototype.scheduleNotification = function (contact) {
        this.localNotifications.schedule({
            id: 1,
            title: 'Keep in Touch',
            text: "You should contact " + this.contact.name,
            data: { mydata: 'My hidden message this is' },
            at: this.contact.daytime
        });
    };
    PhonecontactplanPage.prototype.logForm = function () {
        console.log(this.contact);
        //pushing the newly created contact from the form to the db
        this.scheduleNotification(this.contact);
        this.contacts.push(this.contact);
        //going back to the previous page
        this.navCtrl.popToRoot();
    };
    return PhonecontactplanPage;
}());
PhonecontactplanPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-phonecontactplan',template:/*ion-inline-start:"/Users/Durell/Desktop/trash/Green-Team/src/pages/phonecontactplan/phonecontactplan.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>\n      Keep In Touch\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <h3>Add a Contact Plan From Your Phone:</h3>\n  <form (ngSubmit)="logForm()">       \n    <ion-item>\n      <ion-label floating >Contact Name:</ion-label> \n      <ion-input type="text" [(ngModel)]="contact.name" name="name"></ion-input>\n    </ion-item> \n\n    <ion-list *ngFor="let number of contact.phoneNumbers">\n      <ion-item> <span>{{number.type}}: </span>{{number.value}}</ion-item>\n      \n    </ion-list>\n\n    <ion-item>\n      <ion-label floating >Description:</ion-label>\n      <ion-textarea [(ngModel)]="contact.description" name="description"></ion-textarea>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Repeat</ion-label>\n      <ion-select [(ngModel)]="contact.repeat" name="repeat">\n        <ion-option *ngFor="let repeat of repeats">{{repeat}}</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating >Start Date</ion-label>\n      <ion-datetime displayFormat="YYYY/MM/DD" pickerFormat="YYYY MMM DDD" [(ngModel)]="contact.daytime" [ngModelOptions]="{standalone: true}"></ion-datetime>\n    </ion-item>\n    \n    <ion-item>\n      <ion-label floating >Start Time</ion-label>\n      <ion-datetime displayFormat="h:mm A" pickerFormat="h mm A" [(ngModel)]="contact.daytime" [ngModelOptions]="{standalone: true}"></ion-datetime>\n    </ion-item>\n    <button ion-button type="submit" block>Add Contact Plan</button>\n  </form>\n\n\n\n</ion-content>'/*ion-inline-end:"/Users/Durell/Desktop/trash/Green-Team/src/pages/phonecontactplan/phonecontactplan.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_local_notifications__["a" /* LocalNotifications */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_local_notifications__["a" /* LocalNotifications */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]) === "function" && _f || Object])
], PhonecontactplanPage);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=phonecontactplan.js.map

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactplanPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_local_notifications__ = __webpack_require__(524);
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
    function ContactplanPage(navCtrl, navParams, db, plt, localNotifications, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.plt = plt;
        this.localNotifications = localNotifications;
        this.user = {};
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
        this.user = navParams.get('user');
        this.contact.username = this.user.username;
        /********************************** */
        this.plt.ready().then(function (readySource) {
            _this.localNotifications.on('click', function (notification, state) {
                var json = JSON.parse(notification.data);
                var alert = alertCtrl.create({
                    title: notification.title,
                    subTitle: json.mydata
                });
                alert.present();
            });
        });
        /********************************** */
    }
    ContactplanPage.prototype.scheduleNotification = function (contact) {
        this.localNotifications.schedule({
            id: 1,
            title: 'Keep in Touch',
            text: "You should contact " + this.contact.name,
            data: { mydata: 'My hidden message this is' },
            at: this.contact.daytime
        });
    };
    ContactplanPage.prototype.logForm = function () {
        console.log(this.contact);
        //pushing the newly created contact from the form to the db
        this.scheduleNotification(this.contact);
        this.contacts.push(this.contact);
        //going back to the previous page
        this.navCtrl.popToRoot();
    };
    return ContactplanPage;
}());
ContactplanPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-contactplan',template:/*ion-inline-start:"/Users/Durell/Desktop/trash/Green-Team/src/pages/contactplan/contactplan.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>\n      Keep In Touch\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <h3>Add a Custom Contact Plan:</h3>\n  <form (ngSubmit)="logForm()">       \n    <ion-item>\n      <ion-label floating >Contact Name:</ion-label> \n      <ion-input type="text" [(ngModel)]="contact.name" name="name"></ion-input>\n    </ion-item> \n\n    <ion-item>\n      <ion-label floating >Description:</ion-label>\n      <ion-textarea [(ngModel)]="contact.description" name="description"></ion-textarea>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Repeat</ion-label>\n      <ion-select [(ngModel)]="contact.repeat" name="repeat">\n        <ion-option *ngFor="let repeat of repeats">{{repeat}}</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating >Start Date</ion-label>\n      <ion-datetime displayFormat="YYYY/MM/DD" pickerFormat="YYYY MMM DDD" [(ngModel)]="contact.daytime" [ngModelOptions]="{standalone: true}"></ion-datetime>\n    </ion-item>\n    \n    <ion-item>\n      <ion-label floating >Start Time</ion-label>\n      <ion-datetime displayFormat="h:mm A" pickerFormat="h mm A" [(ngModel)]="contact.daytime" [ngModelOptions]="{standalone: true}"></ion-datetime>\n    </ion-item>\n    <button ion-button type="submit" block>Add Contact Plan</button>\n  </form>\n\n\n  <button ion-button block (click)="scheduleNotification()">Schedule Notification</button>\n\n\n\n</ion-content>'/*ion-inline-end:"/Users/Durell/Desktop/trash/Green-Team/src/pages/contactplan/contactplan.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_local_notifications__["a" /* LocalNotifications */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_local_notifications__["a" /* LocalNotifications */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]) === "function" && _f || Object])
], ContactplanPage);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=contactplan.js.map

/***/ }),

/***/ 386:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SigninPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_contact_contact__ = __webpack_require__(141);
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
    function SigninPage(navCtrl, navParams, db, afAuth) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        this.afAuth = afAuth;
        this.user = {};
        this.users = db.list('users');
    }
    SigninPage.prototype.logForm = function () {
        var _this = this;
        var potentialUser = [];
        var ctrl = this;
        this.db.list('users', {
            query: {
                orderByChild: 'username',
                equalTo: this.user.username
            }
        }).subscribe(function (users) {
            var found = false;
            users.forEach(function (u) {
                ctrl.loginUser(u);
                found = true;
                return;
            });
            if (!found) {
                _this.users.push(_this.user);
                ctrl.loginUser(_this.user);
            }
        });
    };
    SigninPage.prototype.loginUser = function (potentialUser) {
        console.log(potentialUser);
        //pushing the newly created contact from the form to the db
        this.user = potentialUser;
        //go to root page
        this.navCtrl.popToRoot();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_contact_contact__["a" /* ContactPage */], { user: this.user });
        this.navCtrl.popToRoot();
    };
    return SigninPage;
}());
SigninPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-signin',template:/*ion-inline-start:"/Users/Durell/Desktop/trash/Green-Team/src/pages/signin/signin.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>\n      Keep In Touch\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <h3>Sign In:</h3>\n  <form (ngSubmit)="logForm()">       \n    <ion-item>\n      <ion-label floating >User Name:</ion-label> \n      <ion-input type="text" [(ngModel)]="user.username" name="name"></ion-input>\n    </ion-item> \n\n    <ion-item>\n      <ion-label floating >Password:</ion-label>\n      <ion-textarea [(ngModel)]="user.password" name="description"></ion-textarea>\n    </ion-item>\n\n    <button ion-button type="submit" block>Sign In</button>\n  </form>\n\n\n\n</ion-content>'/*ion-inline-end:"/Users/Durell/Desktop/trash/Green-Team/src/pages/signin/signin.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */]])
], SigninPage);

//# sourceMappingURL=signin.js.map

/***/ }),

/***/ 392:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(409);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 409:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_home_home__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_contacts__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_local_notifications__ = __webpack_require__(524);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(517);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_contact_contact__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_contactplan_contactplan__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_phonecontactplan_phonecontactplan__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_signin_signin__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pipes_time__ = __webpack_require__(521);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pipes_safe_url_pipe__ = __webpack_require__(522);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_angularfire2__ = __webpack_require__(523);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_angularfire2_database__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_angularfire2_auth__ = __webpack_require__(387);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







/*PAGES*/




/*PIPES */




/*FIREBASAE STUFF*/



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
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_contact_contact__["a" /* ContactPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_contactplan_contactplan__["a" /* ContactplanPage */],
            __WEBPACK_IMPORTED_MODULE_11__pipes_time__["a" /* TimeOfDay */],
            __WEBPACK_IMPORTED_MODULE_12__pipes_safe_url_pipe__["a" /* SafeUrlPipe */],
            __WEBPACK_IMPORTED_MODULE_0__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_phonecontactplan_phonecontactplan__["a" /* PhonecontactplanPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_signin_signin__["a" /* SigninPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */]),
            __WEBPACK_IMPORTED_MODULE_15_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig, 'songstest'),
            __WEBPACK_IMPORTED_MODULE_16_angularfire2_database__["b" /* AngularFireDatabaseModule */],
            __WEBPACK_IMPORTED_MODULE_17_angularfire2_auth__["b" /* AngularFireAuthModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_contact_contact__["a" /* ContactPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_contactplan_contactplan__["a" /* ContactplanPage */],
            __WEBPACK_IMPORTED_MODULE_0__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_phonecontactplan_phonecontactplan__["a" /* PhonecontactplanPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_signin_signin__["a" /* SigninPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_contacts__["a" /* Contacts */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_local_notifications__["a" /* LocalNotifications */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 517:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_contact_contact__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_signin_signin__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(391);
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
        this.rootPage = __WEBPACK_IMPORTED_MODULE_3__pages_signin_signin__["a" /* SigninPage */];
        this.initializeApp();
        // set our app's pages
        this.pages = [
            { title: 'Contacts', component: __WEBPACK_IMPORTED_MODULE_2__pages_contact_contact__["a" /* ContactPage */] },
            { title: 'Sign In', component: __WEBPACK_IMPORTED_MODULE_3__pages_signin_signin__["a" /* SigninPage */] }
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/Durell/Desktop/trash/Green-Team/src/app/app.html"*/'<ion-menu [content]="content">\n\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Pages</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/Durell/Desktop/trash/Green-Team/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 519:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 271,
	"./af.js": 271,
	"./ar": 272,
	"./ar-dz": 273,
	"./ar-dz.js": 273,
	"./ar-kw": 274,
	"./ar-kw.js": 274,
	"./ar-ly": 275,
	"./ar-ly.js": 275,
	"./ar-ma": 276,
	"./ar-ma.js": 276,
	"./ar-sa": 277,
	"./ar-sa.js": 277,
	"./ar-tn": 278,
	"./ar-tn.js": 278,
	"./ar.js": 272,
	"./az": 279,
	"./az.js": 279,
	"./be": 280,
	"./be.js": 280,
	"./bg": 281,
	"./bg.js": 281,
	"./bn": 282,
	"./bn.js": 282,
	"./bo": 283,
	"./bo.js": 283,
	"./br": 284,
	"./br.js": 284,
	"./bs": 285,
	"./bs.js": 285,
	"./ca": 286,
	"./ca.js": 286,
	"./cs": 287,
	"./cs.js": 287,
	"./cv": 288,
	"./cv.js": 288,
	"./cy": 289,
	"./cy.js": 289,
	"./da": 290,
	"./da.js": 290,
	"./de": 291,
	"./de-at": 292,
	"./de-at.js": 292,
	"./de-ch": 293,
	"./de-ch.js": 293,
	"./de.js": 291,
	"./dv": 294,
	"./dv.js": 294,
	"./el": 295,
	"./el.js": 295,
	"./en-au": 296,
	"./en-au.js": 296,
	"./en-ca": 297,
	"./en-ca.js": 297,
	"./en-gb": 298,
	"./en-gb.js": 298,
	"./en-ie": 299,
	"./en-ie.js": 299,
	"./en-nz": 300,
	"./en-nz.js": 300,
	"./eo": 301,
	"./eo.js": 301,
	"./es": 302,
	"./es-do": 303,
	"./es-do.js": 303,
	"./es.js": 302,
	"./et": 304,
	"./et.js": 304,
	"./eu": 305,
	"./eu.js": 305,
	"./fa": 306,
	"./fa.js": 306,
	"./fi": 307,
	"./fi.js": 307,
	"./fo": 308,
	"./fo.js": 308,
	"./fr": 309,
	"./fr-ca": 310,
	"./fr-ca.js": 310,
	"./fr-ch": 311,
	"./fr-ch.js": 311,
	"./fr.js": 309,
	"./fy": 312,
	"./fy.js": 312,
	"./gd": 313,
	"./gd.js": 313,
	"./gl": 314,
	"./gl.js": 314,
	"./gom-latn": 315,
	"./gom-latn.js": 315,
	"./he": 316,
	"./he.js": 316,
	"./hi": 317,
	"./hi.js": 317,
	"./hr": 318,
	"./hr.js": 318,
	"./hu": 319,
	"./hu.js": 319,
	"./hy-am": 320,
	"./hy-am.js": 320,
	"./id": 321,
	"./id.js": 321,
	"./is": 322,
	"./is.js": 322,
	"./it": 323,
	"./it.js": 323,
	"./ja": 324,
	"./ja.js": 324,
	"./jv": 325,
	"./jv.js": 325,
	"./ka": 326,
	"./ka.js": 326,
	"./kk": 327,
	"./kk.js": 327,
	"./km": 328,
	"./km.js": 328,
	"./kn": 329,
	"./kn.js": 329,
	"./ko": 330,
	"./ko.js": 330,
	"./ky": 331,
	"./ky.js": 331,
	"./lb": 332,
	"./lb.js": 332,
	"./lo": 333,
	"./lo.js": 333,
	"./lt": 334,
	"./lt.js": 334,
	"./lv": 335,
	"./lv.js": 335,
	"./me": 336,
	"./me.js": 336,
	"./mi": 337,
	"./mi.js": 337,
	"./mk": 338,
	"./mk.js": 338,
	"./ml": 339,
	"./ml.js": 339,
	"./mr": 340,
	"./mr.js": 340,
	"./ms": 341,
	"./ms-my": 342,
	"./ms-my.js": 342,
	"./ms.js": 341,
	"./my": 343,
	"./my.js": 343,
	"./nb": 344,
	"./nb.js": 344,
	"./ne": 345,
	"./ne.js": 345,
	"./nl": 346,
	"./nl-be": 347,
	"./nl-be.js": 347,
	"./nl.js": 346,
	"./nn": 348,
	"./nn.js": 348,
	"./pa-in": 349,
	"./pa-in.js": 349,
	"./pl": 350,
	"./pl.js": 350,
	"./pt": 351,
	"./pt-br": 352,
	"./pt-br.js": 352,
	"./pt.js": 351,
	"./ro": 353,
	"./ro.js": 353,
	"./ru": 354,
	"./ru.js": 354,
	"./sd": 355,
	"./sd.js": 355,
	"./se": 356,
	"./se.js": 356,
	"./si": 357,
	"./si.js": 357,
	"./sk": 358,
	"./sk.js": 358,
	"./sl": 359,
	"./sl.js": 359,
	"./sq": 360,
	"./sq.js": 360,
	"./sr": 361,
	"./sr-cyrl": 362,
	"./sr-cyrl.js": 362,
	"./sr.js": 361,
	"./ss": 363,
	"./ss.js": 363,
	"./sv": 364,
	"./sv.js": 364,
	"./sw": 365,
	"./sw.js": 365,
	"./ta": 366,
	"./ta.js": 366,
	"./te": 367,
	"./te.js": 367,
	"./tet": 368,
	"./tet.js": 368,
	"./th": 369,
	"./th.js": 369,
	"./tl-ph": 370,
	"./tl-ph.js": 370,
	"./tlh": 371,
	"./tlh.js": 371,
	"./tr": 372,
	"./tr.js": 372,
	"./tzl": 373,
	"./tzl.js": 373,
	"./tzm": 374,
	"./tzm-latn": 375,
	"./tzm-latn.js": 375,
	"./tzm.js": 374,
	"./uk": 376,
	"./uk.js": 376,
	"./ur": 377,
	"./ur.js": 377,
	"./uz": 378,
	"./uz-latn": 379,
	"./uz-latn.js": 379,
	"./uz.js": 378,
	"./vi": 380,
	"./vi.js": 380,
	"./x-pseudo": 381,
	"./x-pseudo.js": 381,
	"./yo": 382,
	"./yo.js": 382,
	"./zh-cn": 383,
	"./zh-cn.js": 383,
	"./zh-hk": 384,
	"./zh-hk.js": 384,
	"./zh-tw": 385,
	"./zh-tw.js": 385
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
webpackContext.id = 519;

/***/ }),

/***/ 521:
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

/***/ 522:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SafeUrlPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(36);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SafeUrlPipe = (function () {
    function SafeUrlPipe(domSanitizer) {
        this.domSanitizer = domSanitizer;
    }
    SafeUrlPipe.prototype.transform = function (url) {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    };
    return SafeUrlPipe;
}());
SafeUrlPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({
        name: 'safeUrl'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]])
], SafeUrlPipe);

//# sourceMappingURL=safe-url.pipe.js.map

/***/ })

},[392]);
//# sourceMappingURL=main.js.map