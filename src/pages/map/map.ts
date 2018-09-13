import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GeoProvider } from '../../providers/geo/geo'        // eslint-disable-line no-unused-vars

import {BehaviorSubject} from 'rxjs/BehaviorSubject'

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// as per https://github.com/SebastianM/angular-google-maps/issues/1018
@IonicPage()
@Component({
  selector: 'page-map/:serviceType',
  templateUrl: 'map.html',
  styles: [`
    .sebm-google-map-container {
       height: 300px;
     }
     .agm-map {
       height: 300px;
     }
  `],
  //styleUrls: ['./map.scss']
})
//export class MapPage implements OnInit {
export class MapPage implements OnDestroy {
    lat: number
    lng: number
    rangeKm: number = 25

    markers: any;
    subscription: any;
  
    serviceType: string
    title: string
  
    constructor( // eslint-disable-line no-useless-constructor
      public navCtrl: NavController, 
      public navParams: NavParams,
      private geo: GeoProvider
    ) { }

    ionViewDidLoad() {
      console.log('ionViewDidLoad MapPage')
      this.geo.hits = new BehaviorSubject([])  // force to empty - every time we enter
      
      this.serviceType = this.navParams.get('serviceType')
      console.log("found serviceType = "+this.serviceType)
      
      this.getUserLocation()  // was in ngOnInit()
      this.subscription = this.geo.hits
        //.subscribe(hits => this.markers = hits)
          .subscribe(hits => {
          this.markers = hits
            .filter(x => {
              return (x.serviceType === this.serviceType) && (x.disputed < 3)
            })
        })
      

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
 }