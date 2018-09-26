import { Component } from '@angular/core'  // eslint-disable-line no-unused-vars
import { Platform } from 'ionic-angular'  // eslint-disable-line no-unused-vars
import { StatusBar } from '@ionic-native/status-bar'  // eslint-disable-line no-unused-vars
import { SplashScreen } from '@ionic-native/splash-screen'  // eslint-disable-line no-unused-vars

//import { OldHomePage } from '../pages/oldhome/oldhome';
import { AngularFireAuth } from 'angularfire2/auth'  // eslint-disable-line no-unused-vars
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'LandingPage';  // eslint-disable-line no-undef
  loader: any

  constructor (
    public platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    afAuth: AngularFireAuth,
    public loadingCtrl: LoadingController, 
    public storage: Storage) {

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

      this.presentLoading();
 
      this.platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault()
        splashScreen.hide()

        this.storage.get('introShown').then((result) => {
          if(result){
            this.rootPage = 'LandingPage';
          } else {
            this.rootPage = 'IntroPage';
            this.storage.set('introShown', true);
          }
          this.loader.dismiss();
        });
 
      });
 
    }
 
    presentLoading() {
      this.loader = this.loadingCtrl.create({
        content: "Authenticating..."
      });
 
      this.loader.present();
    }
 
}

