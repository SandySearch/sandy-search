import { NgModule } from '@angular/core'
// as per https://stackoverflow.com/questions/43968882/cant-bind-to-latitude-since-it-isnt-a-known-property-of-agm-map
import { AgmCoreModule } from '@agm/core'
import { IonicPageModule } from 'ionic-angular'
import { MapPage } from './map'

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
