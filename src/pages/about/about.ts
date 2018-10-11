import { Component } from '@angular/core' // eslint-disable-line no-unused-vars
import { IonicPage, NavController, NavParams } from 'ionic-angular' // eslint-disable-line no-unused-vars
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
  // version = "0.0.4"
  version = appVersion // eslint-disable-line no-undef

  constructor (public navCtrl: NavController, public navParams: NavParams) { } // eslint-disable-line no-useless-constructor

  ionViewDidLoad () {
    console.log('ionViewDidLoad AboutPage')
  }

  goToIntro () {
    console.log('goToIntro AboutPage')
    this.navCtrl.setRoot('IntroPage')
  }

  // from https://stackoverflow.com/a/44388295
  //
  // future:
  // http://masteringionic.com/blog/2017-10-09-adding-email-functionality-to-an-ionic-application/
  // https://stackoverflow.com/questions/50848393/send-email-with-emailcomposer-ionic-with-html-and-hyperlinks
  // https://stackoverflow.com/questions/32873174/how-to-send-email-with-ionic-framework-using-the-native-email-app
  // https://stackoverflow.com/questions/34764076/how-to-send-email-using-angular-js-and-ionic-framework
  // https://devdactic.com/sending-emails-with-images-in-ionic-cordova/
  sendFeedback () {
    console.log('sendFeedback AboutPage')
    let Link = 'mailto:feedback@lwlabs.com?subject=Feedback%20from%20SandySearch'
    window.open(Link, '_system')
  }
}
