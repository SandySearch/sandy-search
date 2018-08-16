import { Component } from '@angular/core';
import {
  NavController,
  ActionSheet,
  ActionSheetController,
  //Loading,
  LoadingController,
  Platform
} from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
//import { LandingPage } from '../landing/landing';
import { BillProvider } from '../../providers/bill/bill';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-oldhome',
  templateUrl: 'oldhome.html'
})
export class OldHomePage {
  public billList: Observable<any>;
  constructor(
    public navCtrl: NavController,
    public actionCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public billProvider: BillProvider,
    public authProvider: AuthProvider
  ) { }

  ionViewDidLoad() {
    this.billList = this.billProvider.getBillList().valueChanges();
  }

  createBill(): void {
    this.navCtrl.push('BillCreatePage');
  }

  goToPaidBill(billId: string): void {
    this.navCtrl.push('BillDetailPage', { billId: billId });
  }

  moreBillOptions(billId): void {
    let action: ActionSheet = this.actionCtrl.create({
      title: 'Modify your bill',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.billProvider.removeBill(billId);
          }
        },
        {
          text: 'More details',
          icon: !this.platform.is('ios') ? 'play' : null,
          handler: () => {
            this.navCtrl.push('BillDetailPage', { billId: billId });
          }
        },
        {
          text: 'Mark as Paid!',
          icon: !this.platform.is('ios') ? 'checkmark' : null,
          handler: () => {
            this.billProvider.payBill(billId);
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
    /*** breaks flow of app - after logout cannot use anon
    this.authProvider.logoutUser().then(newUser => {
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
    ***/

    this.navCtrl.push('LandingPage');
  }

}
