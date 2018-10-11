import {Injectable} from '@angular/core' // eslint-disable-line no-unused-vars
import {AngularFireAuth} from 'angularfire2/auth' // eslint-disable-line no-unused-vars
import {
  AngularFireDatabase, // eslint-disable-line no-unused-vars
  AngularFireObject, // eslint-disable-line no-unused-vars
  AngularFireList // eslint-disable-line no-unused-vars
} from 'angularfire2/database'

import firebase from 'firebase/app' // eslint-disable-line no-unused-vars
import { GeoProvider } from '../../providers/geo/geo' // eslint-disable-line no-unused-vars
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

@Injectable()
export class EntryProvider {
  public entryList: AngularFireList<any>;  // eslint-disable-line
  public entryList$: Observable<any>;  // eslint-disable-line
  public userId: string;  // eslint-disable-line

  constructor (
    public afAuth: AngularFireAuth,
    public afDatabase: AngularFireDatabase,
    private geo: GeoProvider
  ) {
    // const dbUrl = `/userProfile/${user.uid}`;
    const dbUrl = `/serviceList`

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid
      } else {
        this.userId = 'anon'
      }
      this.entryList = this.afDatabase.list(dbUrl)
    })
  }

  getEntryList (): AngularFireList<any> {
    // getEntryList (): Observable<any> {
    return this.entryList
    // return this.entryList.filter(it => it.serviceType === "GS")
    // this.entryList$ = this.entryList
    // return this.entryList$.map(it => it.serviceType === "GS")
  }

  getEntry (entryId: string): AngularFireObject<any> {
    const dbUrl = `/serviceList`
    return this.afDatabase.object(
      dbUrl + `/${entryId}`
    )
  }

  createEntry (
    serviceType: string = 'GS',
    name: string,
    // owner: string = this.userId,
    owner: string = 'anon',
    address: string,
    phone: number,
    notes: string,
    lat: number = 9,
    lon: number = 99,
    here: false,
    updatedDate: string = new Date().toLocaleString(),
    disputed: number = 0,
    verified: boolean = false,
    votes: number = 0,
    createDate: string = new Date().toLocaleString(),
    archive: boolean = false,
    dupe: number = 0
  ): Promise<any> {
    const newEntryRef: firebase.database.ThenableReference = this.entryList.push(
      {}
    )
    // set geohash here?
    this.geo.setLocation(newEntryRef.key, [lat, lon])
    return newEntryRef.set({
      serviceType,
      name,
      owner,
      address,
      phone,
      notes,
      lat,
      lon,
      here,
      updatedDate,
      disputed,
      verified,
      votes,
      createDate,
      archive,
      dupe,
      id: newEntryRef.key
    })
  }

  removeEntry (entryId: string): Promise<any> {
    // need to remove matching geohash
    return this.entryList.remove(entryId)
  }

  // from https://stackoverflow.com/questions/50215622/firebase-database-transaction-with-angularfire2
  // and
  // https://stackoverflow.com/questions/42596866/angularfire2-best-way-to-increment-a-value
  incrementVote (entryId: string) {
    /**
        this.afDatabase.object('serviceList/${entryId}/votes').query.ref.transaction(votes => {
          //if ( (votes === null) || (votes === 0 ) ) {
          if (votes === null) {
            return votes = 1;
          } else {
            return votes + 1;
          }
        });
        **/
    // this.afDatabase.object('serviceList/'+entryId+'/votes').query.ref.transaction(votes => { votes ? ++votes : 1; return votes });
    this.afDatabase.object('serviceList/' + entryId + '/votes').query.ref.transaction(votes => votes ? ++votes : 1)
  }

  updateEntry (entryId: string): Promise<any> {
    let nowTime = new Date().toLocaleString()
    // const newVotes: number = this.incrementVote(entryId);
    this.incrementVote(entryId)
    // return this.entryList.update(entryId, { updatedDate: nowTime, votes: newVotes });
    return this.entryList.update(entryId, {updatedDate: nowTime})
  }

  duplicateEntry (entryId: string): Promise<any> {
    return this.afDatabase.object('serviceList/' + entryId + '/dupe').query.ref.transaction(dupe => dupe ? ++dupe : 1)
  }

  disputeEntry (entryId: string): Promise<any> {
    // const dis: number = 4;
    // return this.entryList.update(entryId, { disputed: dis });
    return this.afDatabase.object('serviceList/' + entryId + '/disputed').query.ref.transaction(disputed => disputed ? ++disputed : 1)
  }

  resetDisputeEntry (entryId: string): Promise<any> {
    // TODO need to add transactions
    const dis: number = 0
    return this.entryList.update(entryId, {disputed: dis})
  }

  archiveEntry (entryId: string): Promise<any> {
    // need to add transactions?
    return this.entryList.update(entryId, {archive: true})
  }

  storeDownloadUrl (entryId: string, downloadUrl: string): Promise<any> {
    console.log(entryId, downloadUrl)
    return this.entryList.update(entryId, {picture: downloadUrl})
  }
}
