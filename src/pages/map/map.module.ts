import { NgModule } from '@angular/core' // eslint-disable-line no-unused-vars
// as per https://stackoverflow.com/questions/43968882/cant-bind-to-latitude-since-it-isnt-a-known-property-of-agm-map
import { AgmCoreModule } from '@agm/core' // eslint-disable-line no-unused-vars
import { IonicPageModule } from 'ionic-angular' // eslint-disable-line no-unused-vars
import { MapPage } from './map' // eslint-disable-line no-unused-vars

@NgModule({
  declarations: [
  MapPage,
  ],
  imports: [
  IonicPageModule.forChild(MapPage),
  AgmCoreModule
  ],
  })
export class MapPageModule {}
