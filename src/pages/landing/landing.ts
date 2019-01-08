import { Component } from '@angular/core' // eslint-disable-line no-unused-vars
import {
  IonicPage, // eslint-disable-line no-unused-vars
  NavController, // eslint-disable-line no-unused-vars
  // Loading,            // eslint-disable-line no-unused-vars
  LoadingController, // eslint-disable-line no-unused-vars
  // Alert,              // eslint-disable-line no-unused-vars
  AlertController // eslint-disable-line no-unused-vars
} from 'ionic-angular'
// import { OldHomePage } from '../oldhome/oldhome'
import { AuthProvider } from '../../providers/auth/auth' // eslint-disable-line no-unused-vars

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {
  lat: number // eslint-disable-line no-undef
  lng: number // eslint-disable-line no-undef

  constructor( // eslint-disable-line no-useless-constructor
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider
  ) { }

  ionViewDidLoad() {
    // trigger gps usages OK prompt from Android/iOS

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude
        this.lng = position.coords.longitude
        console.log('this.lat/this.lng 1= ' + this.lat + '/' + this.lng)
      })
    } else {
      this.lat = 51.678418
      this.lng = -73.809007
      console.log('this.lat/this.lng 2= ' + this.lat + '/' + this.lng)
    }
  }

  goToLogin(): void { this.navCtrl.push('LoginPage') }

  goToSignup(): void { this.navCtrl.push('SignupPage') }

  goToSearch(): void { this.navCtrl.push('SearchPage') }

  goToAbout(): void { this.navCtrl.push('AboutPage') }

  goToCreateEntry(): void {
    this.navCtrl.push('EntryCreatePage')
  }

  /***
  goToEntryList (): void {
    this.authProvider.anonymousLogin().then(newUser => {
      loading.dismiss().then(() => {
        this.navCtrl.setRoot(OldHomePage)
      })
    }).catch(error => {
      loading.dismiss().then(() => {
        console.error('goToEntryList ', error)
        const alert: Alert = this.alertCtrl.create({
          message: 'error: ' + error,
          buttons: [
            { text: 'Cancel' },
            {
              text: 'OK',
              handler: data => {
                this.navCtrl.push('LandingPage')
              }
            }
          ]
        })
        alert.present()
      })
    })

    const loading: Loading = this.loadingCtrl.create()
    loading.present()
  }
  ***/
}
