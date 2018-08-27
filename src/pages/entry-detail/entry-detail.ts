import { Component } from '@angular/core'  // eslint-disable-line no-unused-vars
import {
  IonicPage,             // eslint-disable-line no-unused-vars
  NavController,         // eslint-disable-line no-unused-vars
  NavParams,             // eslint-disable-line no-unused-vars
  ActionSheet,           // eslint-disable-line no-unused-vars
  ActionSheetController, // eslint-disable-line no-unused-vars
  Platform,              // eslint-disable-line no-unused-vars
  //Alert,
  AlertController        // eslint-disable-line no-unused-vars
} from 'ionic-angular'
import { EntryProvider } from '../../providers/entry/entry'  // eslint-disable-line no-unused-vars
import { AuthProvider } from '../../providers/auth/auth'     // eslint-disable-line no-unused-vars
//import { Camera } from '@ionic-native/camera'

@IonicPage({
  segment: 'entry/:entryId'
})
@Component({
  selector: 'page-entry-detail',
  templateUrl: 'entry-detail.html'
})
export class EntryDetailPage {
  public entry: {};       // eslint-disable-line no-undef
  public entryId: string; // eslint-disable-line no-undef
  //public placeholderPicture = 'assets/img/collect.jpg';

  constructor (  // eslint-disable-line no-useless-constructor
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionCtrl: ActionSheetController,
    public platform: Platform,
    public alertCtrl: AlertController,
    public entryProvider: EntryProvider,
    public authProvider: AuthProvider
    //public cameraPlugin: Camera
  ) { }

  ionViewDidEnter () {
    this.entryId = this.navParams.get('entryId')
    this.entryProvider
      .getEntry(this.entryId)
      .valueChanges()
      .subscribe(entry => {
        this.entry = entry
      })
  }

  showOptions (entryId): void {
    const action: ActionSheet = this.actionCtrl.create({
      title: 'Modify your entry',
      buttons: [
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
}
