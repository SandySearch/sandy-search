import { BrowserModule } from '@angular/platform-browser' // eslint-disable-line no-unused-vars
import { ErrorHandler, NgModule } from '@angular/core' // eslint-disable-line no-unused-vars
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular' // eslint-disable-line no-unused-vars
import { SplashScreen } from '@ionic-native/splash-screen' // eslint-disable-line no-unused-vars
import { StatusBar } from '@ionic-native/status-bar' // eslint-disable-line no-unused-vars

import { MyApp } from './app.component' // eslint-disable-line no-unused-vars
import { OldHomePage } from '../pages/oldhome/oldhome' // eslint-disable-line no-unused-vars
import { AuthProvider } from '../providers/auth/auth' // eslint-disable-line no-unused-vars
import { EntryProvider } from '../providers/entry/entry' // eslint-disable-line no-unused-vars

import { AngularFireModule } from 'angularfire2' // eslint-disable-line no-unused-vars
import { AngularFireDatabaseModule } from 'angularfire2/database' // eslint-disable-line no-unused-vars
import { AngularFireAuthModule } from 'angularfire2/auth' // eslint-disable-line no-unused-vars
import { firebaseConfig, googleMapsKey } from './credentials' // eslint-disable-line no-unused-vars
import { GeoProvider } from '../providers/geo/geo' // eslint-disable-line no-unused-vars
import { AgmCoreModule } from '@agm/core' // eslint-disable-line no-unused-vars
import { GeocodingProvider } from '../providers/geocoding/geocoding' // eslint-disable-line no-unused-vars
import { IonicStorageModule } from '@ionic/storage' // eslint-disable-line no-unused-vars

@NgModule({
  declarations: [
  MyApp,
  OldHomePage
  ],
  imports: [
  BrowserModule,
  IonicModule.forRoot(MyApp),
  AngularFireModule.initializeApp(firebaseConfig),
  AngularFireAuthModule,
  AngularFireDatabaseModule,
  AgmCoreModule.forRoot({
    apiKey: googleMapsKey
    }),
  IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
  MyApp,
  OldHomePage
  ],
  providers: [
  StatusBar,
  SplashScreen,
  { provide: ErrorHandler, useClass: IonicErrorHandler },
  AuthProvider,
  EntryProvider,
  GeoProvider,
  GeocodingProvider
  ]
  })
export class AppModule { }
