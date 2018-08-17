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
    this.afAuth.authState.subscribe(user => {
      this.userId = user.uid;
      this.entryList = this.afDatabase.list(`/userProfile/${user.uid}/billList`);
    });
  }

  getEntryList(): AngularFireList<any> {
    return this.entryList;
  }

  getEntry(entryId: string): AngularFireObject<any> {
    return this.afDatabase.object(
      `/userProfile/${this.userId}/billList/${entryId}`
    );
  }

  createEntry(
    type: string = 'GS',
    name: string,
    address: string,
    phone: number,
    notes: string,
    amount: number,
    dueDate: string = null,
    verified: boolean = false,
    paid: boolean = false
  ): Promise<any> {
    const newEntryRef: firebase.database.ThenableReference = this.entryList.push(
      {}
    );
    return newEntryRef.set({
      type,
      name,
      address,
      phone,
      notes,
      amount,
      dueDate,
      verified,
      paid,
      id: newEntryRef.key
    });
  }

  removeEntry(entryId: string): Promise<any> {
    return this.entryList.remove(entryId);
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
