import { NgModule } from '@angular/core' // eslint-disable-line no-unused-vars
import { IonicPageModule } from 'ionic-angular' // eslint-disable-line no-unused-vars
import { EntryDetailPage } from './entry-detail' // eslint-disable-line no-unused-vars

@NgModule({
  declarations: [
  EntryDetailPage,
  ],
  imports: [
  IonicPageModule.forChild(EntryDetailPage),
  ],
  })
export class EntryDetailPageModule {}
