import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList
} from 'angularfire2/database';

import firebase from 'firebase/app';

@Injectable()
export class EntryProvider {
  public entryList: AngularFireList<any>;
  public userId: string;

  constructor(
    public afAuth: AngularFireAuth,
    public afDatabase: AngularFireDatabase
  ) {

    //const dbUrl = `/userProfile/${user.uid}/billList`;
    const dbUrl = `/serviceList`;

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      } else {
        this.userId = 'anon';
      }
      this.entryList = this.afDatabase.list(dbUrl);
    });
  }

  getEntryList(): AngularFireList<any> {
    return this.entryList;
  }

  getEntry(entryId: string): AngularFireObject<any> {
    const dbUrl = `/serviceList`;
    return this.afDatabase.object(
      dbUrl +`/${entryId}`
    );
  }

  createEntry(
    serviceType: string = 'GS',
    name: string,
    address: string,
    phone: number,
    notes: string,
    updatedDate: string = null,
    disputed: number = 0,
    verified: boolean = false,
    votes: number = 0,
    createDate: string = new Date().toLocaleString(),
    archive: boolean = false
    //amount: number,
    //dueDate: string = null,
    //paid: boolean = false
  ): Promise<any> {
    const newEntryRef: firebase.database.ThenableReference = this.entryList.push(
      {}
    );
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
      //amount,
      //dueDate,
      //paid,
      id: newEntryRef.key
    });
  }

  removeEntry(entryId: string): Promise<any> {
    return this.entryList.remove(entryId);
  }

  updateEntry(entryId: string): Promise<any> {
	  // need to add transactions
	  // and vote display
    //let now = Date.now();
    var nowTime = new Date().toLocaleString();
    //const nowTime: string = 'just now time';
    const newVotes: number = 3;

    return this.entryList.update(entryId, { updatedDate: nowTime, votes: newVotes });
  }

  disputeEntry(entryId: string): Promise<any> {
    // need to add transactions
    // entry = getEntry(entryId)
    const dis: number = 4;	  
    return this.entryList.update(entryId, { disputed: dis });
  }

  resetDisputeEntry(entryId: string): Promise<any> {
    // need to add transactions
    // entry = getEntry(entryId)
    const dis: number = 0;	  
    return this.entryList.update(entryId, { disputed: dis });
  }
  
  archiveEntry(entryId: string): Promise<any> {
    // need to add transactions? 
    return this.entryList.update(entryId, { archive: true });
  }

  payEntry(entryId: string): Promise<any> {
    return this.entryList.update(entryId, { paid: true });
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

  storeDownloadUrl(entryId: string, downloadUrl: string): Promise<any> {
    console.log(entryId, downloadUrl);
    return this.entryList.update(entryId, { picture: downloadUrl });
  }

}
