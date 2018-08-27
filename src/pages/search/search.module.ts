import { NgModule } from '@angular/core'         // eslint-disable-line no-unused-vars
import { IonicPageModule } from 'ionic-angular'  // eslint-disable-line no-unused-vars
import { SearchPage } from './search'            // eslint-disable-line no-unused-vars

@NgModule({
  declarations: [
    SearchPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchPage),
  ],
})
export class SearchPageModule {}
