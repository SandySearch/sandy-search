# Sandy Search

## Sandy Search (was Emergency Services - Search and Reporting) Mobile and Web App

[![License](https://img.shields.io/badge/license-COMMERCIAL-red.svg?style=flat-square)](https://github.com/mkobar/sandy-search/blob/master/LICENSE)
![Platform](https://img.shields.io/badge/platform-Android-brightgreen.svg)
![Platform](https://img.shields.io/badge/platform-iOS-blue.svg)
![Platform](https://img.shields.io/badge/platform-Web-orange.svg)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Entry for The Global Call for Code Hackathon, 28 September 2018

Note: This is a **single person** project (team of one).

<img align="right" height="200" src="https://raw.githubusercontent.com/mkobar/essr-aoc/master/resources/logo2.jpg">

### The Idea

I was in Super Storm Sandy in 2012 in Connecticut, and was without power for 9 days.
During the disaster, we had a very hard time discovering what services (gasoline, food, water, ice, power) were available and when and where.  And if you have only a half a tank of gas you don't want to drive around looking for more, without knowing where to go.

The idea for this service is to use the power of crowdsourcing (think "Waze for Services, after a disaster").  It currently allows anyone (without a login) to search and report on services available in their area.

All users who do not log in to the app will be **anonymous** and **not** logged.

Verified users (pre-registered, think Red Cross, National Guard, and business owners/managers) can leave "verified" status updates, at no cost.

I think the service could be used as a branding expense for emergency services.  The majority of the expense would be the manual verification of "verified" users, and minimal hosting of the back-end service.

<img align="left" height="400" src="https://raw.githubusercontent.com/mkobar/essr-aoc/master/resources/Sandy_Oct_28_2012_1600Z.jpg">

### How It Works

So this service uses geolocation and a standard crowdsourcing format to collect information from people in the field.  And share it with anyone who needs it.

One of the driving forces in the design was simplicity.  "2 clicks to get to the answer", exactly like the Palo Alto Police Chief said in [this video](https://youtu.be/oojRzM55i08)

Nothing fancy but it will work, much like the way **Zello** was used after Hurricane Harvey in Houston:  https://wgntv.com/2017/08/29/civilians-and-cajun-navy-bring-their-own-boats-to-rescue-harvey-victims/

### How It Was Built

This mobile application was built with the **sweet** [Ionic 3 Framework](http://ionicframework.com/) (Angular5/TypeScript/CSS/HTML5) and uses the **Google** [FireBase](https://firebase.google.com/) services for authentication, realtime database and cloud hosting of the web app (currently on a free spark plan).

Currently generating Android app and will provide iOS app from same code base.

Maps and geocoding is pulled from **Google APIs**.  I plan to do reverse geocoding from Google too.

Admin user interface is all Node and Angular.  And hosted in a **Docker** container (stored in the **IBM Cloud Container Registry**) in Kubernetes cluster on the **IBM Cloud Kubernetes Service**.  Need to add reports and maps to admin user interface.

Want to use **IBM Watson** services to post-process all user request data and create heatmaps for the optimal locations for services and food distribution.

All built with a Vim editor and a cmd window (and git).

### What I Learned from this Hackathon

- Angular 4 and Ionic 3 and typescript (I had build the previous prototype in Angular.JS and Ionic 1)
- **Google Firebase** Realtime Database with Observables
- GeoFire for geolocation
- Angular 2 and NodeJs
- Dockerizing an Angular 2 / NodeJs application
- Autobuilding a Docker image from a **GitHub** checkin with **Docker Cloud**
- Storing and updating Docker images in the **IBM Cloud Container Registery**
- Running Apps in Kubernetes in the **IBM Cloud Kubernetes Service** (on the free tier) with NodePort networking
- Fixing vulnerabilities discovered by the **IBM Cloud Container Registry Vulnerability Advisor**
- Upgraded running Docker containers with new images
- Upgraded running Docker containers in Kubernetes in the **IBM Cloud Kubernetes Service** with new images

### Next Steps for SandySearch

- Add reports to the Admin user interface
- Internationalization
- **IBM Watson ML** to predict where services will be needed based on past experience

### See Also

The Sandy Search Admin User Interface on GitHub:  https://github.com/mkobar/sandy-search-admin

### Live Demos

Live web app version of SandyService can be found here:  https://plu.sh/sandys 

And the Android APK is available on GitHub here:
  https://github.com/mkobar/sandysearch/releases/tag/0.0.7
  
And on **Google Play** (as a beta) here:  https://play.google.com/apps/testing/io.ionic.sandysearch

Live web app version of SandyServiceAdmin can be found here:  https://plu.sh/sandyadmin 

Live web app running on **IBM Cloud Kubernetes Service** can be found here:  http://173.193.99.198:30471

The original GitHub repository for the Ionic v1 web app is here: https://github.com/mkobar/essr-aot

### Docker Images

Sandy Search Docker image on **Docker Cloud**:  mkobar/sandy-search **[private]**

Sandy Search Docker image on **IBM Cloud Container Registry**:  registry.ng.bluemix.net/call4code/sandysearch

Sandy Search Admin Docker image on **Docker Cloud**:  mkobar/sandysearchadmin

Sandy Search Admin Docker image on **IBM Cloud Container Registry**:  registry.ng.bluemix.net/call4code/sandysearchadmin

### Videos Demos

SandySearch Submission Video - First attempt - https://youtu.be/83FHRSM3CQM

SandySearch Submission Video - Second attempt - https://youtu.be/Vj61wD86HyA

SandySearch Submission Video - Third attempt - https://youtu.be/kELeIpW1EdA

SandySearch Admin User Interface Demo - https://youtu.be/hGE8ubJQGMg

## Things left to do:

- [x] ~~store service location data in firebase~~
- [x] ~~add a map view (with Google Maps or OpenStreetMaps)~~
- [x] ~~add the account request function (and screen) - and force to validate with email?~~
- [x] ~~add more logging~~
- [x] ~~add in the real distance calculations (from stree address).  There are seveal free services for this but they may be rate limited.~~
- [x] ~~add dupe reporting option~~
- [x] ~~add initial tutorial slides~~
- [x] ~~fix km to miles~~
- [x] ~~add an admin interface for entry and user management~~
- [ ] rate limit votes and disputed to 1 an hour with local storage
- [ ] add spinner for list and map
- [ ] change markers by serviceType
- [ ] iOS build and App Store upload - just need my Mac
- [x] ~~Dockerizing an Ionic 3 app~~
- [x] ~~Google Play Store upload~~
- [x] ~~host admin interface on GitHub~~
- [x] ~~host admin user interface on IBM Cloud (Docker and Kubernetes)~~
- [ ] add reports (timeline maps by createDate, updateDate and votes)
- [ ] export usage data in csv format
- [ ] add IBM Watson ML for heatmap generation
- [ ] process usage with IBM Watson to predict optimal locations for future services
- [x] ~~need a video of both app usage and reporting~~
- [x] ~~need better logo  ;^}~~


Please do contact me directly if you can use or add to this project.

Thanks to Dick Tator of Fayetteville, NC, USA for the original logo.

## License

Copyright @ 2018 [RKO Security](http://www.rkosecurity.com)

