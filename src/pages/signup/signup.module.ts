import { NgModule } from '@angular/core'         // eslint-disable-line no-unused-vars
import { IonicPageModule } from 'ionic-angular'  // eslint-disable-line no-unused-vars
import { SignupPage } from './signup'            // eslint-disable-line no-unused-vars

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
  ],
})
export class SignupPageModule {}
