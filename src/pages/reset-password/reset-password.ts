import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  Alert,
  AlertController
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html'
})
export class ResetPasswordPage {
  public resetPasswordForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    formBuilder: FormBuilder
  ) {
    this.resetPasswordForm = formBuilder.group({
      email: ['', Validators.required]
    });
  }

  resetPassword(): void {
    if (!this.resetPasswordForm.valid) {
      console.log(this.resetPasswordForm.value);
    } else {
      const email: string = this.resetPasswordForm.value.email;

      this.authProvider.resetPassword(email).then(
        user => {
          const alert: Alert = this.alertCtrl.create({
            message: 'We sent you a reset link to your email',
            buttons: [
              {
                text: 'Ok',
                role: 'cancel',
                handler: () => {
                  this.navCtrl.pop();
                }
              }
            ]
          });
          alert.present();
        },
        error => {
          var errorMessage: string = error.message;
          const errorAlert: Alert = this.alertCtrl.create({
            message: errorMessage,
            buttons: [
              {
                text: 'Ok',
                role: 'cancel'
              }
            ]
          });

          errorAlert.present();
        }
      );
    }
  }
}