import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// as per https://github.com/SebastianM/angular-google-maps/issues/1018
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  styles: [`
    .sebm-google-map-container {
       height: 300px;
     }
  `],
  //styleUrls: ['./map.scss']
  //styleUrls: ['./map.scss']
})
//export class MapPage implements OnInit {
export class MapPage {
    lat: number;
    lng: number;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage')
    this.getUserLocation()  // was in ngOnInit()
  }
  
    private getUserLocation() {
     /// locate the user
     if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
         this.lat = position.coords.latitude;
         this.lng = position.coords.longitude;

       });
     } else {
       this.lat = 51.678418;
       this.lng = 7.809007;
     }
   }
 }