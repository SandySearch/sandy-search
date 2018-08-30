import { Component, OnInit } from '@angular/core'  // eslint-disable-line no-unused-vars
import {
  NavController,          // eslint-disable-line no-unused-vars
  ActionSheet,            // eslint-disable-line no-unused-vars
  ActionSheetController,  // eslint-disable-line no-unused-vars
  Loading,                // eslint-disable-line no-unused-vars
  LoadingController,      // eslint-disable-line no-unused-vars
  Platform                // eslint-disable-line no-unused-vars
} from 'ionic-angular'
import { Observable } from 'rxjs/Observable'
import { LandingPage } from '../landing/landing'
import { EntryProvider } from '../../providers/entry/entry'  // eslint-disable-line no-unused-vars
import { AuthProvider } from '../../providers/auth/auth'     // eslint-disable-line no-unused-vars
import { GeoProvider } from '../../providers/geo/geo'        // eslint-disable-line no-unused-vars

@Component({
  selector: 'page-oldhome',
  templateUrl: 'oldhome.html',
    styles: [`
    .ion-list { margin-bottom: 64px !important; }
  `],
})
//export class OldHomePage implements OnInit {
export class OldHomePage {
  public entryList: Observable<any>;  // eslint-disable-line no-undef
  lat: number
  lng: number

  constructor (  // eslint-disable-line no-useless-constructor
    public navCtrl: NavController,
    public actionCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public entryProvider: EntryProvider,
    public authProvider: AuthProvider,
    private geo: GeoProvider
  ) { }

  ngOnInit() {
    //this.seedDatabase()  // only need to do this once
  }
  
  private seedDatabase() {
  let dummyPoints = [
    [41.9, -73.1],
    [41.7, -73.2],
    [41.1, -73.3],
    [41.3, -73.0],
    [40.7, -73.1]
  ]

  dummyPoints.forEach((val, idx) => {
    let name = `dummy-location2-${idx}`
    console.log(idx)
    this.geo.setLocation(name, val)
  })
}
  
  ionViewDidLoad () {
    // geolocation first
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
       this.lat = position.coords.latitude
       this.lng = position.coords.longitude
       console.log('home lat/lon = '+this.lat+' '+this.lng)
     });
   } else {
     /// default coords
    this.lat = 40.73
    this.lng = -73.93
    console.log('home lat/lon = '+this.lat+' '+this.lng)
   }
   
    
    //if (user) {
    this.entryList = this.entryProvider.getEntryList().valueChanges()
    //}
  }

  createEntry (): void {
    this.navCtrl.push('EntryCreatePage')
  }

  goToPaidEntry (entryId: string): void {
    this.navCtrl.push('EntryDetailPage', { entryId: entryId })
  }

  showMap (): void {
    this.navCtrl.push('MapPage')
  }
  
  moreEntryOptions (entryId): void {
    let action: ActionSheet = this.actionCtrl.create({
      title: 'Update Service Listing',
      buttons: [
      /*** no delete/edit by users
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.entryProvider.removeEntry(entryId);
          }
       },
      ***/
        {
          text: 'More details',
          icon: !this.platform.is('ios') ? 'play' : null,
          handler: () => {
            this.navCtrl.push('EntryDetailPage', { entryId: entryId })
          }
        },
        {
          text: 'Call this Service',
          icon: !this.platform.is('ios') ? 'call' : null,
          handler: () => {
            this.entryProvider.updateEntry(entryId)
          }
        },
        {
          text: 'Confirm this Service is Still Available',
          icon: !this.platform.is('ios') ? 'checkmark' : null,
          handler: () => {
            this.entryProvider.updateEntry(entryId)
          }
        },
        {
          text: 'Dispute this Listing!',
          icon: !this.platform.is('ios') ? 'alert' : null,
          handler: () => {
            this.entryProvider.disputeEntry(entryId)
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked')
          }
        }
      ]
    })
    action.present()
  }

  logoutNow (): void {
    /*** breaks flow of app - after logout cannot use anon ***/
    //this.authProvider.logoutUser().then(newUser => {
    this.authProvider.logoutUser().then(() => {
    //this.authProvider.logoutUser().then({
    //this.authProvider.logoutUser().then( user => {
      loading.dismiss().then(() => {
        this.navCtrl.setRoot(LandingPage)
      })
    }).catch(error => {
      loading.dismiss().then(() => {
        console.error('logoutNow ', error)
      })
    })

    const loading: Loading = this.loadingCtrl.create()
    loading.present()
    /*** ***/

    //this.navCtrl.push('LandingPage'); // cannot push as shows back arrow
  }
}
