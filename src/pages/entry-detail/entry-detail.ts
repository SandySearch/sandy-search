import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheet,
  ActionSheetController,
  Platform,
  //Alert,
  AlertController
} from 'ionic-angular';
import { EntryProvider } from '../../providers/entry/entry';
import { AuthProvider } from '../../providers/auth/auth';
//import { Camera } from '@ionic-native/camera'

@IonicPage({
  segment: 'entry/:entryId'
})
@Component({
  selector: 'page-entry-detail',
  templateUrl: 'entry-detail.html'
})
export class EntryDetailPage {
  public entry: {};
  public entryId: string;
  public placeholderPicture = "assets/img/collect.jpg";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionCtrl: ActionSheetController,
    public platform: Platform,
    public alertCtrl: AlertController,
    public entryProvider: EntryProvider,
    public authProvider: AuthProvider
    //public cameraPlugin: Camera
  ) { }

  ionViewDidEnter() {
    this.entryId = this.navParams.get('entryId');
    this.entryProvider
      .getEntry(this.entryId)
      .valueChanges()
      .subscribe(entry => {
        this.entry = entry;
      });
  }

  showOptions(entryId): void {
    const action: ActionSheet = this.actionCtrl.create({
      title: 'Modify your entry',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.entryProvider.removeEntry(entryId).then(() => {
              this.navCtrl.pop();
            });
          }
        },
        {
          text: 'Mark as Paid!',
          icon: !this.platform.is('ios') ? 'checkmark' : null,
          handler: () => {
            this.entryProvider.payEntry(entryId);
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

/***
  uploadPicture(billId): void {
    if (this.authProvider.getUser().isAnonymous == true) {
      const alert: Alert = this.alertCtrl.create({
        message: "If you want to continue you will need to provide an email and create a password",
        buttons: [
          { text: 'Cancel' },
          {
            text: 'OK',
            handler: data => {
              this.navCtrl.push('SignupPage');
            }
          }
        ]
      });
      alert.present();
    } else {
      this.cameraPlugin
        .getPicture({
          quality: 95,
          destinationType: this.cameraPlugin.DestinationType.DATA_URL,
          sourceType: this.cameraPlugin.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: this.cameraPlugin.EncodingType.PNG,
          saveToPhotoAlbum: true
        })
        .then(
          imageData => {
            this.billProvider
              .takeBillPhoto(this.billId, imageData)
              .then(res => {
                console.log(this.billId, res.downloadURL);
                this.billProvider.storeDownloadUrl(this.billId, res.downloadURL)
              });
          },
          error => {
            console.log('ERROR -> ' + JSON.stringify(error));
          }
        );
    }
 }
***/

}
