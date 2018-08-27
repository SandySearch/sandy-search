import { Component } from '@angular/core'  // eslint-disable-line no-unused-vars
import { IonicPage, NavController, NavParams } from 'ionic-angular'  // eslint-disable-line no-unused-vars

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  constructor (public navCtrl: NavController, public navParams: NavParams) {  // eslint-disable-line no-useless-constructor
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad AboutPage')
  }
}
