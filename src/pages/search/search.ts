import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  //Loading,
  LoadingController
} from 'ionic-angular';
import { OldHomePage } from '../oldhome/oldhome';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController
  ) { }

  listESNY(): void { this.navCtrl.setRoot(OldHomePage); }

  listEFW(): void { this.navCtrl.setRoot(OldHomePage); }

  listGS(): void { this.navCtrl.setRoot(OldHomePage); }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}
