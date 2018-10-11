import { NgModule } from '@angular/core' // eslint-disable-line no-unused-vars
import { IonicPageModule } from 'ionic-angular' // eslint-disable-line no-unused-vars
import { AboutPage } from './about' // eslint-disable-line no-unused-vars

@NgModule({
  declarations: [
  AboutPage,
  ],
  imports: [
  IonicPageModule.forChild(AboutPage),
  ],
  })
export class AboutPageModule {}
