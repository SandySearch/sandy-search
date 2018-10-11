// import { Injectable, NgZone } from '@angular/core'
import { Injectable } from '@angular/core' // eslint-disable-line no-unused-vars
// import { MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core'
import { MapsAPILoader } from '@agm/core' // eslint-disable-line no-unused-vars
// import { Observable, Observer } from 'rxjs'
import { Observable } from 'rxjs'

import { of } from 'rxjs/observable/of'
// import { filter, catchError, tap, map, switchMap } from 'rxjs/operators'
import { tap, map, switchMap } from 'rxjs/operators'
import { fromPromise } from 'rxjs/observable/fromPromise'

/*
  Generated class for the GeocodingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
declare var google: any

@Injectable()
// export class GeocodingProvider extends GoogleMapsAPIWrapper{
export class GeocodingProvider {
  private geocoder: any // eslint-disable-line no-undef
  /***
    constructor(private __loader: MapsAPILoader, private __zone: NgZone) {
        super(__loader, __zone);
    }
   ***/
  constructor (private mapLoader: MapsAPILoader) {} // eslint-disable-line no-useless-constructor

  /***
    getLatLon(address: string): Observable<any> {
        console.log('Getting Address - ', address);
        let geocoder = new google.maps.Geocoder();
        return Observable.create(observer => {
            geocoder.geocode( { 'address': address}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    observer.next(results[0].geometry.location);
                    observer.complete();
                } else {
                    console.log('Error - ', results, ' & Status - ', status);
                    observer.next({});
                    observer.complete();
                }
            });
        })
    }
  ***/
  // as per stackblitz.com/edit/angular-google-maps-demo-geocoding
  // and
  // https://github.com/SebastianM/angular-google-maps/issues/689
  private initGeocoder () {
    console.log('Init geocoder!')
    this.geocoder = new google.maps.Geocoder()
  }

  private waitForMapsToLoad (): Observable<boolean> {
    if (!this.geocoder) {
      return fromPromise(this.mapLoader.load())
        .pipe(
          tap(() => this.initGeocoder()),
          map(() => true)
        )
    }
    return of(true)
  }

  // geocodeAddress(location: string): Observable<any> {
  getLatLon (location: string): Observable<any> {
    console.log('Start geocoding!')
    return this.waitForMapsToLoad().pipe(
      // filter(loaded => loaded),
      switchMap(() => {
        return new Observable(observer => {
          this.geocoder.geocode({'address': location}, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
              console.log('Geocoding complete!')
              observer.next({
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
              })
            } else {
              console.log('Error - ', results, ' & Status - ', status)
              observer.next({})
            }
            observer.complete()
          })
        })
      })
    )
  }
}
