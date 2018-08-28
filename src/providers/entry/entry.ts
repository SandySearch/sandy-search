import {Injectable} from '@angular/core'  // eslint-disable-line no-unused-vars
import {AngularFireAuth} from 'angularfire2/auth'  // eslint-disable-line no-unused-vars
import {
  AngularFireDatabase,  // eslint-disable-line no-unused-vars
  AngularFireObject,  // eslint-disable-line no-unused-vars
  AngularFireList  // eslint-disable-line no-unused-vars
} from 'angularfire2/database'

import firebase from 'firebase/app'  // eslint-disable-line no-unused-vars

@Injectable()
export class EntryProvider {
  public entryList: AngularFireList<any>;  // eslint-disable-line
  public userId: string;  // eslint-disable-line

  constructor (
    public afAuth: AngularFireAuth,
    public afDatabase: AngularFireDatabase
  ) {
        //const dbUrl = `/userProfile/${user.uid}`;
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
    return this.entryList
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
        address: string,
        phone: number,
        notes: string,
        updatedDate: string = new Date().toLocaleString(),
        disputed: number = 0,
        verified: boolean = false,
        votes: number = 0,
        createDate: string = new Date().toLocaleString(),
        archive: boolean = false
      ): Promise<any> {
    const newEntryRef: firebase.database.ThenableReference = this.entryList.push(
          {}
        )
    return newEntryRef.set({
      serviceType,
      name,
      address,
      phone,
      notes,
      updatedDate,
      disputed,
      verified,
      votes,
      createDate,
      archive,
      id: newEntryRef.key
    })
  }

  removeEntry (entryId: string): Promise<any> {
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
        //this.afDatabase.object('serviceList/'+entryId+'/votes').query.ref.transaction(votes => { votes ? ++votes : 1; return votes });
    this.afDatabase.object('serviceList/' + entryId + '/votes').query.ref.transaction(votes => votes ? ++votes : 1)
  }

  updateEntry (entryId: string): Promise<any> {
        // need to add transactions
        // and vote display
    let nowTime = new Date().toLocaleString()
        //const newVotes: number = this.incrementVote(entryId);
    this.incrementVote(entryId)
        //return this.entryList.update(entryId, { updatedDate: nowTime, votes: newVotes });
    return this.entryList.update(entryId, {updatedDate: nowTime})
  }

  disputeEntry (entryId: string): Promise<any> {
        // need to add transactions
        //const dis: number = 4;
        //return this.entryList.update(entryId, { disputed: dis });
    return this.afDatabase.object('serviceList/' + entryId + '/disputed').query.ref.transaction(disputed => disputed ? ++disputed : 1)
  }

  resetDisputeEntry (entryId: string): Promise<any> {
        // need to add transactions
    const dis: number = 0
    return this.entryList.update(entryId, {disputed: dis})
  }

  archiveEntry (entryId: string): Promise<any> {
        // need to add transactions?
    return this.entryList.update(entryId, {archive: true})
  }

      /***
        takeBillPhoto(billId: string, imageURL: string): AngularFireUploadTask {
          const storageRef: AngularFireStorageReference = this.afStorage.ref(
            `${this.userId}/${entryId}/billPicture/`
          );

          return storageRef.putString(imageURL, 'base64', {
            contentType: 'image/png'
          });
        }
        ***/

  storeDownloadUrl (entryId: string, downloadUrl: string): Promise<any> {
    console.log(entryId, downloadUrl)
    return this.entryList.update(entryId, {picture: downloadUrl})
  }
}
