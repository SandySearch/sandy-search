import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  Loading,
  LoadingController,
  Alert,
  AlertController
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  public signupForm: FormGroup;
  public loading: Loading;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    formBuilder: FormBuilder,
    public authProvider: AuthProvider
  ) {
    this.signupForm = formBuilder.group({
    //email: ['', Validators.required],
      email: [
        '',
	Validators.compose([Validators.required, EmailValidator.isValid])
	],
      password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required])
        ],
      fullName: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required])
        ],
      phone: [
        '',
        Validators.compose([Validators.minLength(12), Validators.required])
        ]
    });
  }

  /**
   * If the form is valid it will call the AuthData service to sign the user up
   *  password displaying a loading component while the user waits.
   *
   * If the form is invalid it will just log the form value,
   *  feel free to handle that as you like.
   */
  
  signupUser(): void {
    if (!this.signupForm.valid) {
      console.log(this.signupForm.value);
    } else {
      const email: string = this.signupForm.value.email;
      const password: string = this.signupForm.value.password;
      const name: string = this.signupForm.value.fullName;
      const phone: string = this.signupForm.value.phone;

      //this.authProvider.linkAccount(email, password).then(
      this.authProvider.signupUser(email, password, name, phone).then(
        () => {
	   this.loading.dismiss().then(() => {
	    //this.navCtrl.pop();
	    //this.nav.setRoot(LandingPage);
	    this.navCtrl.popToRoot();
          });
        },
        error => {
          this.loading.dismiss().then(() => {
            var errorMessage: string = error.message;
            const alert: Alert = this.alertCtrl.create({
              message: errorMessage,
              buttons: [
                {
                  text: 'Ok',
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          });
        }
      );

      //this.loading = this.loadingCtrl.create();
      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }
}
