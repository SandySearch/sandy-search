import { NgModule } from '@angular/core' // eslint-disable-line no-unused-vars
import { IonicPageModule } from 'ionic-angular' // eslint-disable-line no-unused-vars
import { IntroPage } from './intro' // eslint-disable-line no-unused-vars

@NgModule({
  declarations: [
  IntroPage,
  ],
  imports: [
  IonicPageModule.forChild(IntroPage),
  ],
  })
export class IntroPageModule {}
