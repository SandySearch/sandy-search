import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EntryDetailPage } from './entry-detail';

@NgModule({
  declarations: [
    EntryDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(EntryDetailPage),
  ],
})
export class EntryDetailPageModule {}
