import { Component } from '@angular/core'  // eslint-disable-line no-unused-vars
import { Platform } from 'ionic-angular'  // eslint-disable-line no-unused-vars
import { StatusBar } from '@ionic-native/status-bar'  // eslint-disable-line no-unused-vars
import { SplashScreen } from '@ionic-native/splash-screen'  // eslint-disable-line no-unused-vars

//import { OldHomePage } from '../pages/oldhome/oldhome';
import { AngularFireAuth } from 'angularfire2/auth'  // eslint-disable-line no-unused-vars

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;  // eslint-disable-line no-undef

  constructor (
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    afAuth: AngularFireAuth
  ) {
    const authListener = afAuth.authState.subscribe(user => {
      if (user) {
        //this.rootPage = OldHomePage;
        this.rootPage = 'LandingPage'
        authListener.unsubscribe()
      } else {
        this.rootPage = 'LandingPage'
        authListener.unsubscribe()
      }
    })
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault()
      splashScreen.hide()
    })
  }
}
