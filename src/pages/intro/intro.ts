import { Component } from '@angular/core' // eslint-disable-line no-unused-vars
import { IonicPage, NavController, NavParams } from 'ionic-angular' // eslint-disable-line no-unused-vars

/**
 * Generated class for the IntroPage page.
 *
 * https://alligator.io/ionic/intro-slider/
 */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
  })
export class IntroPage {
  constructor (public navCtrl: NavController, public navParams: NavParams) { } // eslint-disable-line no-useless-constructor

  ionViewDidLoad () {
    console.log('ionViewDidLoad IntroPage')
  }

  goToHome () {
    this.navCtrl.setRoot('LandingPage')
  }
}
