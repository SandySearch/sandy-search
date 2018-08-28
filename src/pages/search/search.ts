import { Component } from '@angular/core'  // eslint-disable-line no-unused-vars
import {
  IonicPage,      // eslint-disable-line no-unused-vars
  NavController,  // eslint-disable-line no-unused-vars
  //Loading,
  LoadingController  // eslint-disable-line no-unused-vars
} from 'ionic-angular'
import { OldHomePage } from '../oldhome/oldhome'

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
  constructor (  // eslint-disable-line no-useless-constructor
    public navCtrl: NavController,
    public loadingCtrl: LoadingController
  ) { }

  searchList (search: string): void { 
    console.log("search = ", search)
    this.navCtrl.setRoot(OldHomePage) 
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad SearchPage')
  }
}
