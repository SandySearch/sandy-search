import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  Loading,
  LoadingController,
  Alert,
  AlertController
} from 'ionic-angular';
import { OldHomePage } from '../oldhome/oldhome';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider
  ) { }

  goToLogin(): void { this.navCtrl.push('LoginPage'); }

  goToSignup(): void { this.navCtrl.push('SignupPage'); }

  goToSearch(): void { this.navCtrl.push('SearchPage'); }

  goToEntryList(): void {
    this.authProvider.anonymousLogin().then(newUser => {
      loading.dismiss().then(() => {
        this.navCtrl.setRoot(OldHomePage);
      });
    }).catch(error => {
      loading.dismiss().then(() => {
        console.error("goToEntryList ",error);
        const alert: Alert = this.alertCtrl.create({
          message: "error: "+error,
          buttons: [
            { text: 'Cancel' },
            {
              text: 'OK',
              handler: data => {
                this.navCtrl.push('LandingPage');
              }
            }
          ]
        });
        alert.present()
      });
    });

    const loading: Loading = this.loadingCtrl.create();
    loading.present();
  }

}
