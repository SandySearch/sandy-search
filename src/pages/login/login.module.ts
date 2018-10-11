import { NgModule } from '@angular/core' // eslint-disable-line no-unused-vars
import { IonicPageModule } from 'ionic-angular' // eslint-disable-line no-unused-vars
import { LoginPage } from './login' // eslint-disable-line no-unused-vars

@NgModule({
  declarations: [
  LoginPage,
  ],
  imports: [
  IonicPageModule.forChild(LoginPage),
  ],
  })
export class LoginPageModule {}
