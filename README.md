# Sandy Search

## Sandy Search (was Emergency Services - Search and Reporting) Mobile and Web App

[![License](https://img.shields.io/badge/license-MIT-orange.svg?style=flat-square)](https://github.com/mkobar/essr-aoc/blob/master/LICENSE)
![Platform](https://img.shields.io/badge/platform-Android-brightgreen.svg)
![Platform](https://img.shields.io/badge/platform-iOS-blue.svg)
![Platform](https://img.shields.io/badge/platform-Web-orange.svg)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Entry for The Agents of Change Hackathon, 12 August 2018 in NYC

<img align="right" height="200" src="https://raw.githubusercontent.com/mkobar/essr-aoc/master/resources/logo.png">

### The Idea

I was in Super Storm Sandy in 2012 in Connecticut, and was without power for 9 days.
During the disaster, we had a very hard time discovering what services (gasoline, food, water, ice, power) were available and when and where.  And if you have only a half a tank of gas you don't want to drive around looking for more, without knowing where to go.

The idea for this service is to use the power of crowdsourcing (think "Waze for Services, after a disaster").  It currently allows anyone (without a login) to search and report on services available in their area.

Verified users (pre-registered, think Red Cross, National Guard, and business owners/managers) can leave "verified" status updates, at no cost.

I think the service could be used as a branding expense to get good press and more prospective customers.  The majority of the expense would be the manual verification of "verified" users, and minimal hosting of the back-end service.

<img align="left" height="400" src="https://raw.githubusercontent.com/mkobar/essr-aoc/master/resources/Sandy_Oct_28_2012_1600Z.jpg">

### How It Works

So this service uses geolocation and a standard crowdsourcing format to collect information from people in the field.
And share it with anyone who needs it.

Nothing fancy but it could work, much like the way Zello was used after Hurricane Harvey in Houston:  https://wgntv.com/2017/08/29/civilians-and-cajun-navy-bring-their-own-boats-to-rescue-harvey-victims/

### How It Was Built

This mobile application was built with the sweet [Ionic Framework](http://ionicframework.com/) (Angular5/TypeScript/CSS/HTML5) and uses the Google [FireBase](https://firebase.google.com/) service for authentication, realtime database and cloud hosting (currently on a free spark plan).

With a Vim editor and a cmd window.

### Live Demos

Live web app version of SNB can be found here:  https://sandy-search.firebaseapp.com/#/landing

And the Android APK is available on GitHub here:
  https://github.com/mkobar/essr-aoc/releases/tag/0.0.1

The original GitHub repository for the web app is here: https://github.com/mkobar/essr-aot

## Things left to do:

- [ ] iOS build and App Store upload - just need my Mac.
- [ ] Google Play Store upload
- [ ] store service location data in firebase
- [ ] add in the real distance calculations (from stree address).  There are seveal free services for this but they may be rate limited.
- [ ] add a map view (with Google Maps or OpenStreetMaps)
- [ ] add the account request function (and screen) - and force to validate with email?
- [ ] add an admin interface for entry and user management.
- [ ] add more logging
- [ ] add more firebase services - pictures to storage, analytics, crash monitoring, etc.

Please do contact me directly if you can use or add to this project.

## License

Copyright @ 2018 [RKOSecurity](http://www.rkosecurity.com)


