import { Component } from '@angular/core'  // eslint-disable-line no-unused-vars
import { IonicPage, NavController, NavParams } from 'ionic-angular'  // eslint-disable-line no-unused-vars
import { appVersion } from '../../app/credentials'
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
  //version = "0.0.4"
  version = appVersion
  
  constructor (public navCtrl: NavController, public navParams: NavParams) {  // eslint-disable-line no-useless-constructor
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad AboutPage')
  }

  goToIntro () {
    console.log('goToIntro AboutPage')
    this.navCtrl.setRoot('IntroPage')
  }

  sendFeedback () {
    console.log('sendFeedback AboutPage')
  }
}
