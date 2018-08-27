import { NgModule } from '@angular/core'         // eslint-disable-line no-unused-vars
import { IonicPageModule } from 'ionic-angular'  // eslint-disable-line no-unused-vars
import { LandingPage } from './landing'          // eslint-disable-line no-unused-vars

@NgModule({
  declarations: [
    LandingPage,
  ],
  imports: [
    IonicPageModule.forChild(LandingPage),
  ],
})
export class LandingPageModule {}
