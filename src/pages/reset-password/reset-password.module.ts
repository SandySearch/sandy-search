import { NgModule } from '@angular/core'              // eslint-disable-line no-unused-vars
import { IonicPageModule } from 'ionic-angular'       // eslint-disable-line no-unused-vars
import { ResetPasswordPage } from './reset-password'  // eslint-disable-line no-unused-vars

@NgModule({
  declarations: [
    ResetPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ResetPasswordPage),
  ],
})
export class ResetPasswordPageModule {}
