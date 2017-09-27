This is a starter template for [Ionic](http://ionicframework.com/docs/) projects.

## How to use this template

*This template does not work on its own*. The shared files for each starter are found in the [ionic2-app-base repo](https://github.com/ionic-team/ionic2-app-base).

To use this template, either create a new ionic project using the ionic node.js utility, or copy the files from this repository into the [Starter App Base](https://github.com/ionic-team/ionic2-app-base).

### With the Ionic CLI:

Take the name after `ionic2-starter-`, and that is the name of the template to be used when using the `ionic start` command below:

```bash
$ sudo npm install -g ionic cordova
$ ionic start myTabs tabs
```

Then, to run it, cd into `myTabs` and run:

```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
```

Substitute ios for android if not on a Mac.

# How to run this app on your machine
Clone and cd into the repository
```bash
$ git clone https://github.com/eecs394-fall17/Green-Team.git
$ cd Green-Team/
```
Install all the dependencies
```bash
npm install
```
## Run on server
```bash
$ ionic serve
```

## Run on android 
```bash
$ ionic cordova build android
$ ionic cordova run android
```

## DEPENDENCIES: 
# For the contact feature of the app, run this: 
ionic cordova plugin add cordova-plugin-contacts
npm install --save @ionic-native/contacts 


# For Firebase:
npm install angularfire2 firebase --save

# For moment:
npm install moment --save

# To build...there is some random polyfill error
npm install promise-polyfill --save-exact
