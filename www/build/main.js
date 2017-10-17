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
        // Name contact sorted
        this.sortname = false;
        this.sortlabel = "Time";
        // Tracks current logged-in user
        this.user = {};
        // Grab logged-in user passed from previous page
        this.user = navParams.get('user');
        // Firebase query to grab ALL users
        this.contacts = db.list('/contacts');
        // Default to no open contact in accordion
        this.openedContact = undefined;
    }
    // Queries Firebase for contact lists above
    ContactPage.prototype.ngOnInit = function () {
        var _this = this;
        this.todaycontacts = [];
        this.namecontacts = [];
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
            // Callbacks to fire to populate today contacts
            _this.filterContactsByUser(contacts, _this.todaycontacts);
        });
        this.db.list('contacts', {
            query: {
                orderByChild: 'daytime',
                startAt: dayEnd.toISOString()
            }
        }).subscribe(function (contacts) {
            // Callbacks to fire to populate later contacts + chunks
            _this.filterContactsByUser(contacts, _this.latercontacts);
            _this.chunkContacts(_this.latercontacts, _this.laterchunks);
        });
        this.db.list('contacts', {
            query: {
                orderByChild: 'name',
            }
        }).subscribe(function (contacts) {
            _this.filterContactsByUser(contacts, _this.namecontacts);
        });
    };
    // Filter Firebase contact query list for the logged-in user 
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
    // Create contact index array to group contacts in time chunks
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
    // Alert to choose whether new contact uses phone info or not
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
    ContactPage.prototype.toggleSort = function (sortByName) {
        if (this.sortname) {
            this.sortlabel = "A-Z";
        }
        else {
            this.sortlabel = "Time";
        }
    };
    return ContactPage;
}());
ContactPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-contact',template:/*ion-inline-start:"/home/ivanx/eecs394/Green-Team/src/pages/contact/contact.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n          <ion-icon name="menu"></ion-icon>\n        </button>\n    <ion-title>\n      Keep In Touch\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="choosePlan()">\n        <ion-icon name="add"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <div *ngIf="sortname == false" >\n    <h4>Today</h4>\n    <ion-list *ngIf="todaycontacts.length > 0" class="accordion-list">\n      <div *ngFor="let contact of todaycontacts; let i = index">\n        <ion-item (click)="toggleContactHolder(contact.$key)" [ngClass]="{\'section-active\': openedContact == contact.$key, \'section\': openedContact == contact.$key}">\n\n          <div>{{contact.name}}</div>\n\n          <div class="darkgrey" *ngIf="contact.description">\n            {{contact.description}}\n          </div>\n\n          <div>{{contact.daytime | timeOfDay}}, {{contact.repeat}}</div>\n\n          <button ion-button icon-only item-end small (click)="repeatContact(contact.$key, contact.daytime, contact.repeat)">\n            <ion-icon name="md-checkmark"></ion-icon>\n          </button>\n\n          <button ion-button icon-only item-end small (click)="showOptions(contact.$key, contact.name)">\n            <ion-icon name="more"></ion-icon>\n          </button>\n        </ion-item>\n\n        <div *ngIf="openedContact == contact.$key">\n          <a *ngIf="contact.phoneNumbers" href="tel:{{contact.phoneNumbers[0].value}}" (click)="callThem(contact.phoneNumbers[0].value)">\n            <button ion-button icon-only item-start outline small color="secondary">\n              <ion-icon name="call"> </ion-icon>\n            </button>\n          </a>\n          \n          <a *ngIf="contact.phoneNumbers" [attr.href]="\'sms:\'+contact.phoneNumbers[0].value | safeUrl" (click)="callThem(contact.phoneNumbers[0].value)">\n            <button ion-button icon-only item-start outline small color="secondary">\n              <ion-icon name="text"> </ion-icon>\n            </button>\n          </a>\n\n          <div *ngIf="!contact.phoneNumbers">\n            <ion-item>No Contact Methods Provided</ion-item>\n          </div>\n        </div>\n      </div>\n    </ion-list>\n\n    <div class="accordion-list">\n            \n      <h4>Later</h4>\n      <div *ngIf="latercontacts.length == 0" class="accordion-list">\n          You have no records in this category\n      </div>\n      <ion-list *ngFor="let chunk of latercontacts; let i = index"> <!-- laterchunks for latercontacts --> \n        <h4>{{ chunk[0].daytime | timeOfDay:[\'day\'] }}</h4>\n        <div *ngFor="let contact of chunk;">\n          <ion-item (click)="toggleContactHolder(contact.$key)" [ngClass]="{\'section-active\': openedContact == contact.$key, \'section\': openedContact == contact.$key}">\n\n            <div>{{contact.name}}</div>\n\n            <div class="darkgrey" *ngIf="contact.description">\n              {{contact.description}}\n            </div>\n\n            <div>{{contact.daytime | timeOfDay:[\'day\']}}, {{contact.repeat}}</div>\n\n            <button ion-button icon-only item-end small (click)="repeatContact(contact.$key, contact.daytime, contact.repeat)">\n              <ion-icon name="md-checkmark"></ion-icon>\n            </button>\n\n            <button ion-button icon-only item-end small (click)="showOptions(contact.$key, contact.name)">\n              <ion-icon name="more"></ion-icon>\n            </button>\n          </ion-item>\n\n          <div *ngIf="openedContact == contact.$key">\n            <a *ngIf="contact.phoneNumbers" href="tel:{{contact.phoneNumbers[0].value}}" (click)="callThem(contact.phoneNumbers[0].value)">\n              <button ion-button icon-only item-start outline small color="secondary">\n                <ion-icon name="call"> </ion-icon>\n              </button>\n            </a>\n            \n            <a *ngIf="contact.phoneNumbers" [attr.href]="\'sms:\'+contact.phoneNumbers[0].value | safeUrl" (click)="callThem(contact.phoneNumbers[0].value)">\n              <button ion-button icon-only item-start outline small color="secondary">\n                <ion-icon name="text"> </ion-icon>\n              </button>\n            </a>\n            \n            <div *ngIf="!contact.phoneNumbers">\n              <ion-item>No Contact Methods Provided</ion-item>\n            </div>\n          </div>\n        </div>\n      </ion-list>\n    </div>\n  </div>\n\n  <div *ngIf="sortname == true" >\n      <h4>Sorted by name:</h4>\n      <ion-list *ngIf="namecontacts.length > 0" class="accordion-list">\n        <div *ngFor="let contact of namecontacts; let i = index">\n          <ion-item (click)="toggleContactHolder(contact.$key)" [ngClass]="{\'section-active\': openedContact == contact.$key, \'section\': openedContact == contact.$key}">\n  \n            <div>{{contact.name}}</div>\n  \n            <div class="darkgrey" *ngIf="contact.description">\n              {{contact.description}}\n            </div>\n  \n            <div>{{contact.daytime | timeOfDay}}, {{contact.repeat}}</div>\n  \n            <button ion-button icon-only item-end small (click)="repeatContact(contact.$key, contact.daytime, contact.repeat)">\n              <ion-icon name="md-checkmark"></ion-icon>\n            </button>\n  \n            <button ion-button icon-only item-end small (click)="showOptions(contact.$key, contact.name)">\n              <ion-icon name="more"></ion-icon>\n            </button>\n          </ion-item>\n  \n          <div *ngIf="openedContact == contact.$key">\n            <a *ngIf="contact.phoneNumbers" href="tel:{{contact.phoneNumbers[0].value}}" (click)="callThem(contact.phoneNumbers[0].value)">\n              <button ion-button icon-only item-start outline small color="secondary">\n                <ion-icon name="call"> </ion-icon>\n              </button>\n            </a>\n            \n            <a *ngIf="contact.phoneNumbers" [attr.href]="\'sms:\'+contact.phoneNumbers[0].value | safeUrl" (click)="callThem(contact.phoneNumbers[0].value)">\n              <button ion-button icon-only item-start outline small color="secondary">\n                <ion-icon name="text"> </ion-icon>\n              </button>\n            </a>\n  \n            <div *ngIf="!contact.phoneNumbers">\n              <ion-item>No Contact Methods Provided</ion-item>\n            </div>\n          </div>\n        </div>\n      </ion-list>\n    </div>\n  \n</ion-content>\n\n<ion-footer>\n\n<ion-grid>\n  <ion-row>\n    <ion-col col-4>\n    </ion-col>\n    <ion-col col-2>\n      <ion-label>Time</ion-label>\n    </ion-col>\n    <ion-col col-4>\n      <ion-item>\n        <ion-toggle [(ngModel)]="sortname"></ion-toggle>\n      </ion-item>\n    </ion-col>\n    <ion-col col-2>\n      <ion-label>A-Z</ion-label>\n    </ion-col>\n  </ion-row>\n</ion-grid>\n</ion-footer>'/*ion-inline-end:"/home/ivanx/eecs394/Green-Team/src/pages/contact/contact.html"*/
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
        selector: 'page-home',template:/*ion-inline-start:"/home/ivanx/eecs394/Green-Team/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>\n      Keep In Touch\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-item>\n    <ion-label floating>Search:</ion-label>\n    <ion-textarea [(ngModel)]="query" name="query"></ion-textarea>\n  </ion-item>\n  <ion-list>\n    <button ion-item *ngFor="let contact of contactlist" (click)="tapped($event, contact)">\n      <div *ngIf="contact.name">\n          {{contact.name.formatted}} \n      </div>\n    </button>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/home/ivanx/eecs394/Green-Team/src/pages/home/home.html"*/
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(59);
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
        selector: 'page-phonecontactplan',template:/*ion-inline-start:"/home/ivanx/eecs394/Green-Team/src/pages/phonecontactplan/phonecontactplan.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>\n      Keep In Touch\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <h3>Add a Contact Plan From Your Phone:</h3>\n  <form (ngSubmit)="logForm()">       \n    <ion-item>\n      <ion-label floating >Contact Name:</ion-label> \n      <ion-input type="text" [(ngModel)]="contact.name" name="name"></ion-input>\n    </ion-item> \n\n    <ion-list *ngFor="let number of contact.phoneNumbers">\n      <ion-item> <span>{{number.type}}: </span>{{number.value}}</ion-item>\n      \n    </ion-list>\n\n    <ion-item>\n      <ion-label floating >Description:</ion-label>\n      <ion-textarea [(ngModel)]="contact.description" name="description"></ion-textarea>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Repeat</ion-label>\n      <ion-select [(ngModel)]="contact.repeat" name="repeat">\n        <ion-option *ngFor="let repeat of repeats">{{repeat}}</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating >Start Date</ion-label>\n      <ion-datetime displayFormat="YYYY/MM/DD" pickerFormat="YYYY MMM DDD" [(ngModel)]="contact.daytime" [ngModelOptions]="{standalone: true}"></ion-datetime>\n    </ion-item>\n    \n    <ion-item>\n      <ion-label floating >Start Time</ion-label>\n      <ion-datetime displayFormat="h:mm A" pickerFormat="h mm A" [(ngModel)]="contact.daytime" [ngModelOptions]="{standalone: true}"></ion-datetime>\n    </ion-item>\n    <button ion-button type="submit" block>Add Contact Plan</button>\n  </form>\n\n\n\n</ion-content>'/*ion-inline-end:"/home/ivanx/eecs394/Green-Team/src/pages/phonecontactplan/phonecontactplan.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]])
], PhonecontactplanPage);

//# sourceMappingURL=phonecontactplan.js.map

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactplanPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(59);
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
    }
    ContactplanPage.prototype.logForm = function () {
        console.log(this.contact);
        // Pushing new contact to query list adds it to the database
        this.contacts.push(this.contact);
        // Pop all pages on stack and navigate to root page
        this.navCtrl.popToRoot();
    };
    return ContactplanPage;
}());
ContactplanPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-contactplan',template:/*ion-inline-start:"/home/ivanx/eecs394/Green-Team/src/pages/contactplan/contactplan.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>\n      Keep In Touch\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <h3>Add a Custom Contact Plan:</h3>\n  <form (ngSubmit)="logForm()">       \n    <ion-item>\n      <ion-label floating >Contact Name:</ion-label> \n      <ion-input type="text" [(ngModel)]="contact.name" name="name"></ion-input>\n    </ion-item> \n\n    <ion-item>\n      <ion-label floating >Description:</ion-label>\n      <ion-textarea [(ngModel)]="contact.description" name="description"></ion-textarea>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Repeat</ion-label>\n      <ion-select [(ngModel)]="contact.repeat" name="repeat">\n        <ion-option *ngFor="let repeat of repeats">{{repeat}}</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating >Start Date</ion-label>\n      <ion-datetime displayFormat="YYYY/MM/DD" pickerFormat="YYYY MMM DDD" [(ngModel)]="contact.daytime" [ngModelOptions]="{standalone: true}"></ion-datetime>\n    </ion-item>\n    \n    <ion-item>\n      <ion-label floating >Start Time</ion-label>\n      <ion-datetime displayFormat="h:mm A" pickerFormat="h mm A" [(ngModel)]="contact.daytime" [ngModelOptions]="{standalone: true}"></ion-datetime>\n    </ion-item>\n    <button ion-button type="submit" block>Add Contact Plan</button>\n  </form>\n\n\n\n</ion-content>'/*ion-inline-end:"/home/ivanx/eecs394/Green-Team/src/pages/contactplan/contactplan.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]])
], ContactplanPage);

//# sourceMappingURL=contactplan.js.map

/***/ }),

/***/ 389:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SigninPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(390);
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
        selector: 'page-signin',template:/*ion-inline-start:"/home/ivanx/eecs394/Green-Team/src/pages/signin/signin.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>\n      Keep In Touch\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <h3>Sign In:</h3>\n  <form (ngSubmit)="logForm()">       \n    <ion-item>\n      <ion-label floating >User Name:</ion-label> \n      <ion-input type="text" [(ngModel)]="user.username" name="name"></ion-input>\n    </ion-item> \n\n    <ion-item>\n      <ion-label floating >Password:</ion-label>\n      <ion-textarea [(ngModel)]="user.password" name="description"></ion-textarea>\n    </ion-item>\n\n    <button ion-button type="submit" block>Sign In</button>\n  </form>\n\n\n\n</ion-content>'/*ion-inline-end:"/home/ivanx/eecs394/Green-Team/src/pages/signin/signin.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */]])
], SigninPage);

//# sourceMappingURL=signin.js.map

/***/ }),

/***/ 395:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(412);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 412:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_home_home__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_contacts__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(520);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_contact_contact__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_contactplan_contactplan__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_phonecontactplan_phonecontactplan__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_signin_signin__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pipes_time__ = __webpack_require__(524);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pipes_safe_url_pipe__ = __webpack_require__(525);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_status_bar__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_angularfire2__ = __webpack_require__(526);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_angularfire2_database__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_angularfire2_auth__ = __webpack_require__(390);
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
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_6__pages_contact_contact__["a" /* ContactPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_contactplan_contactplan__["a" /* ContactplanPage */],
            __WEBPACK_IMPORTED_MODULE_10__pipes_time__["a" /* TimeOfDay */],
            __WEBPACK_IMPORTED_MODULE_11__pipes_safe_url_pipe__["a" /* SafeUrlPipe */],
            __WEBPACK_IMPORTED_MODULE_0__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_phonecontactplan_phonecontactplan__["a" /* PhonecontactplanPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_signin_signin__["a" /* SigninPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */]),
            __WEBPACK_IMPORTED_MODULE_14_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig, 'songstest'),
            __WEBPACK_IMPORTED_MODULE_15_angularfire2_database__["b" /* AngularFireDatabaseModule */],
            __WEBPACK_IMPORTED_MODULE_16_angularfire2_auth__["b" /* AngularFireAuthModule */]
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
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_contacts__["a" /* Contacts */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 520:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_contact_contact__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_signin_signin__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(394);
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
        // The page loaded on startup
        this.rootPage = __WEBPACK_IMPORTED_MODULE_3__pages_signin_signin__["a" /* SigninPage */];
        this.initializeApp();
        // Spawn the order of pages on left-hand menu
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
    // Callback from selecting page on left-hand menu
    MyApp.prototype.openPage = function (page) {
        // Close the left-hand menu
        this.menu.close();
        // Navigate to new page by resetting stack with this page
        this.nav.setRoot(page.component);
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/home/ivanx/eecs394/Green-Team/src/app/app.html"*/'<ion-menu [content]="content">\n\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Pages</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/home/ivanx/eecs394/Green-Team/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 522:
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
	"./bm": 282,
	"./bm.js": 282,
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
	"./es-us": 305,
	"./es-us.js": 305,
	"./es.js": 303,
	"./et": 306,
	"./et.js": 306,
	"./eu": 307,
	"./eu.js": 307,
	"./fa": 308,
	"./fa.js": 308,
	"./fi": 309,
	"./fi.js": 309,
	"./fo": 310,
	"./fo.js": 310,
	"./fr": 311,
	"./fr-ca": 312,
	"./fr-ca.js": 312,
	"./fr-ch": 313,
	"./fr-ch.js": 313,
	"./fr.js": 311,
	"./fy": 314,
	"./fy.js": 314,
	"./gd": 315,
	"./gd.js": 315,
	"./gl": 316,
	"./gl.js": 316,
	"./gom-latn": 317,
	"./gom-latn.js": 317,
	"./gu": 318,
	"./gu.js": 318,
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

/***/ 524:
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

/***/ 525:
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

},[395]);
//# sourceMappingURL=main.js.map