import {Injectable} from '@angular/core' // eslint-disable-line no-unused-vars
import {AngularFireDatabase} from 'angularfire2/database' // eslint-disable-line no-unused-vars

// import { EntryProvider } from '../../providers/entry/entry'  // eslint-disable-line no-unused-vars

// import * as GeoFire from "geofire"
import {GeoFire} from 'geofire'
import {Observable} from 'rxjs/Observable' // eslint-disable-line no-unused-vars
import {BehaviorSubject} from 'rxjs/BehaviorSubject'

/*
  Generated class for the GeoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeoProvider {
  dbRef: any // eslint-disable-line no-undef
  geoFire: any // eslint-disable-line no-undef
  // entry: any;
  // public entry: any;       // eslint-disable-line no-undef

  hits = new BehaviorSubject([]) // eslint-disable-line no-undef

  constructor (
    private db: AngularFireDatabase
    // private entryProvider: EntryProvider
  ) {
    // Reference database location for GeoFire
    this.dbRef = this.db.list('/locations')

    // this.entryList = this.db.list('/serviceList')

    // this.geoFire = new GeoFire(this.dbRef.$ref); // <= old
    // this.geoFire = new GeoFire(this.dbRef); // <= changed
    this.geoFire = new GeoFire(this.dbRef.query.ref)
  }

  // Adds GeoFire data to database
  setLocation (key: string, coords: Array<number>) {
    this.geoFire.set(key, coords)
      .then(_ => console.log('location updated'))
      .catch(err => console.log(err))
  }

  // Queries database for nearby locations
  // Maps results to the hits BehaviorSubject
  getLocations (radius: number, coords: Array<number>) {
    this.geoFire.query({
      center: coords,
      radius: radius
    })
      .on('key_entered', (key, location, distance) => {
        let miles = Math.round(((distance * 0.62137) + 0.00001) * 100) / 100
        console.log(miles)
        let hit = {
          location: location,
          // distance: distance * 0.62137, // https://www.metric-conversions.org/length/kilometers-to-miles.htm
          distance: miles,
          serviceType: '',
          name: '',
          owner: '',
          address: '',
          phone: 0,
          notes: '',
          lat: 999,
          lon: 999,
          here: false,
          updatedDate: '',
          disputed: 0,
          verified: false,
          votes: 0,
          createDate: '',
          archive: false,
          dupe: 0,
          id: ''
        }

        let currentHits = this.hits.value
        console.log('key = ', key)
        const listingsSubscription = this.getEntryData(key).subscribe(
          (entry) => {
            // newName = location.name
            console.log('entry = ', JSON.stringify(entry, null, 4))
            if (entry) {
              hit.name = entry.name
              hit.serviceType = entry.serviceType
              hit.owner = entry.owner
              hit.address = entry.address
              hit.phone = entry.phone
              hit.notes = entry.notes
              hit.lat = entry.lat
              hit.lon = entry.lon
              hit.here = entry.here
              hit.updatedDate = entry.updatedDate
              hit.disputed = entry.disputed
              hit.verified = entry.verified
              hit.votes = entry.votes
              hit.createDate = entry.createDate
              hit.archive = entry.archive
              hit.dupe = entry.dupe
              hit.id = entry.id

              console.log('key2 = ', key)
              currentHits.push(hit)
              this.hits.next(currentHits)
            }
            // else just skip null
          },
          err => console.log('Error Getting Service: ', err),
          () => console.log('Getting Locations complete')
        )

        // Stop listening for listings after 5 seconds
        setTimeout(() => { listingsSubscription.unsubscribe() }, 5000)

        /***
        this.entryProvider
        .getEntry(key)
        .valueChanges()
        .subscribe(entry => {
          //this.entry = entry;
          hit.name = entry.name;
            hit.serviceType = entry.serviceType;
            hit.address = entry.address;

            console.log("key2 = ", key)
            currentHits.push(hit);
            this.hits.next(currentHits);
         })
                   ***/
      })
  }

  getEntryData (entryId: string): Observable<any> {
    return this.db.object('/serviceList/' + entryId).valueChanges()
  }
}
