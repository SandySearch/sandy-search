import { NgModule } from '@angular/core'         // eslint-disable-line no-unused-vars
import { IonicPageModule } from 'ionic-angular'  // eslint-disable-line no-unused-vars
import { EntryCreatePage } from './entry-create' // eslint-disable-line no-unused-vars

@NgModule({
  declarations: [
    EntryCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(EntryCreatePage),
  ],
})
export class EntryCreatePageModule {}
