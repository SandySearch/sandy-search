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
      email: ['', Validators.required],
      password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required])
      ]
    });
  }

  signupUser(): void {
    if (!this.signupForm.valid) {
      console.log(this.signupForm.value);
    } else {
      const email: string = this.signupForm.value.email;
      const password: string = this.signupForm.value.password;

      this.authProvider.linkAccount(email, password).then(
        () => {
          this.loading.dismiss().then(() => {
            this.navCtrl.pop();
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

      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }
}