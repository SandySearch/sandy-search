import { Component } from '@angular/core';
import {
  NavController,
  ActionSheet,
  ActionSheetController,
  Loading,
  LoadingController,
  Platform
} from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { LandingPage } from '../landing/landing';
import { EntryProvider } from '../../providers/entry/entry';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-oldhome',
  templateUrl: 'oldhome.html'
})
export class OldHomePage {
  public entryList: Observable<any>;

  constructor(
    public navCtrl: NavController,
    public actionCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public entryProvider: EntryProvider,
    public authProvider: AuthProvider
  ) { }

  ionViewDidLoad() {
    //if (user) {
      this.entryList = this.entryProvider.getEntryList().valueChanges();
    //}
  }

  createEntry(): void {
    this.navCtrl.push('EntryCreatePage');
  }

  goToPaidEntry(entryId: string): void {
    this.navCtrl.push('EntryDetailPage', { entryId: entryId });
  }

  moreEntryOptions(entryId): void {
    let action: ActionSheet = this.actionCtrl.create({
      title: 'Modify your entry',
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
            this.navCtrl.push('EntryDetailPage', { entryId: entryId });
          }
        },
        {
          text: 'This service is still available?',
          icon: !this.platform.is('ios') ? 'checkmark' : null,
          handler: () => {
            this.entryProvider.updateEntry(entryId);
          }
        },
        {
          text: 'Dispute this listing?',
          icon: !this.platform.is('ios') ? 'checkmark' : null,
          handler: () => {
            this.entryProvider.disputeEntry(entryId);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    action.present();
  }

  logoutNow(): void {
    /*** breaks flow of app - after logout cannot use anon ***/
    //this.authProvider.logoutUser().then(newUser => {
    this.authProvider.logoutUser().then(() => {
    //this.authProvider.logoutUser().then({
    //this.authProvider.logoutUser().then( user => {
      loading.dismiss().then(() => {
        this.navCtrl.setRoot(LandingPage);
      });
    }).catch(error => {
      loading.dismiss().then(() => {
        console.error("logoutNow ",error);
      });
    });

    const loading: Loading = this.loadingCtrl.create();
    loading.present();
    /*** ***/

    //this.navCtrl.push('LandingPage'); // cannot push as shows back arrow
  }

}
