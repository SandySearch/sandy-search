import { Component } from '@angular/core' // eslint-disable-line no-unused-vars
import {
  IonicPage, // eslint-disable-line no-unused-vars
  NavController, // eslint-disable-line no-unused-vars
  Loading, // eslint-disable-line no-unused-vars
  LoadingController, // eslint-disable-line no-unused-vars
  Alert, // eslint-disable-line no-unused-vars
  AlertController // eslint-disable-line no-unused-vars
} from 'ionic-angular'
import { OldHomePage } from '../oldhome/oldhome'
import { FormBuilder, FormGroup, Validators } from '@angular/forms' // eslint-disable-line no-unused-vars
import { AuthProvider } from '../../providers/auth/auth' // eslint-disable-line no-unused-vars
// import { EmailValidator } from '../../validators/email';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  })
export class LoginPage {
  public loginForm: FormGroup; // eslint-disable-line no-undef
  public loading: Loading; // eslint-disable-line no-undef

  constructor (
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public authProvider: AuthProvider,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController
  ) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required])
      ]
    })
  }

  loginUser (): void {
    if (!this.loginForm.valid) {
      console.log(this.loginForm.value)
    } else {
      const email: string = this.loginForm.value.email
      const password: string = this.loginForm.value.password

      this.authProvider.loginUser(email, password).then(
        () => {
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot(OldHomePage)
          })
        },
        error => {
          this.loading.dismiss().then(() => {
            const alert: Alert = this.alertCtrl.create({
              message: 'loginUser ' + error.message,
              buttons: [
                {
                  text: 'OK',
                  role: 'cancel'
                }
              ]
            })
            alert.present()
          })
        }
      )

      this.loading = this.loadingCtrl.create()
      this.loading.present()
    }
  }

  goToResetPassword () {
    this.navCtrl.push('ResetPasswordPage')
  }

  createAccount () {
    this.navCtrl.push('SignupPage')
  }
}
