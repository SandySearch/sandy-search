import { Component, OnInit } from '@angular/core'  // eslint-disable-line no-unused-vars
import {
  NavController,          // eslint-disable-line no-unused-vars
  NavParams,              // eslint-disable-line no-unused-vars
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
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'

@Component({
  selector: 'page-oldhome/:serviceType',
  templateUrl: 'oldhome.html',
    styles: [`
    .ion-list { margin-bottom: 64px !important; }
  `],
})
//export class OldHomePage implements OnInit {
export class OldHomePage {
  public entryList$: Observable<any>;  // eslint-disable-line no-undef
  //public filteredEntryList$: Observable<entry[]>;  // eslint-disable-line no-undef
  public filteredEntryList$: Observable<any>;  // eslint-disable-line no-undef
  lat: number
  lng: number
  serviceType: string
  title: string
  rangeKm: number = 25

  markers: any;
  subscription: any;

  constructor (  // eslint-disable-line no-useless-constructor
    public navCtrl: NavController,
    public navParams: NavParams,
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
      this.getUserLocation()
      this.subscription = this.geo.hits
        .subscribe(hits => this.markers = hits)

   this.serviceType = this.navParams.get('serviceType')
   console.log("found serviceType = "+this.serviceType)

    // now load title with serviceType
   if (this.serviceType === "ESNY") {
     this.title = "Emergency Shelters"
   } else if (this.serviceType === "EFW") {
     this.title = "Emergency Food and Water"
   } else if (this.serviceType === "GS") {
     this.title = "Gas Stations (with Gas & Power)"
   } else if (this.serviceType === "CS") {
     this.title = "Charging Locations"
   } else if (this.serviceType === "OFS") {
     this.title = "Open Food Stores"
   } else if (this.serviceType === "WATM") {
     this.title = "Working ATMs"
   } else if (this.serviceType === "Other") {
     this.title = "Other Services"
   }
/***  Read entire list without location/distance
   //if (user) {
   this.entryList$ = this.entryProvider.getEntryList().valueChanges()

   //this.filteredEntryList$ = this.entryList$.filter(entry => {
   this.filteredEntryList$ = this.entryList$
     .do(x => console.log(x))
     .do(x => console.log("serviceType1 =",x.serviceType))
     //.do(x => console.log("serviceType2 =",x[serviceType]))
     .do(x => console.log("serviceType3 =",x['serviceType']))
     .do(x => console.log("serviceType3 =",x[5].serviceType))
     //.filter(entry[] => 
     //entry.serviceType == "GS")
       //})
   this.entryList$.subscribe(x => {
     //console.log(x)  // debug
   });
   //this.filteredEntryList.subscribe(x => console.log(x));
   //this.filteredEntryList = this.entryList.filter(it => it['serviceType'] == this.serviceType)
   //this.filteredEntryList = this.entryList.filter(it => it.serviceType === "GS")

   //}
***/
  }

  ngOnDestroy() {
      if (this.subscription) {
        this.subscription.unsubscribe()
      }
    }
  
    private getUserLocation() {
     // locate the user
     if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
         this.lat = position.coords.latitude
         this.lng = position.coords.longitude
         console.log("this.lat/this.lng 1= "+this.lat+'/'+this.lng)
         // get service locations
         this.geo.getLocations(this.rangeKm, [this.lat, this.lng])
       });
     } else {
       this.lat = 51.678418
       this.lng = -73.809007
       console.log("this.lat/this.lng 2= "+this.lat+'/'+this.lng)
       // get service locations
       this.geo.getLocations(this.rangeKm, [this.lat, this.lng])
     }
     //console.log("this.lat/this.lng = "+this.lat+'/'+this.lng)
     //this.geo.getLocations(100, [this.lat, this.lng])
   }

  /**
  transform(items: any[], field: string, value: string): any[] {
    if(!items) return [];
    if(!field) return items;

    return items.filter(it => it[field] === value)
  }
  **/
  
  /**
  filter(entry : <any>) : boolean{
    // Return true if don't want this job in the results.
    // e.g. lets filter jobs with price < 25;
    if (entry.price === this.servicetype){
      return true;
    }
    return false
  }
  **/
  
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
