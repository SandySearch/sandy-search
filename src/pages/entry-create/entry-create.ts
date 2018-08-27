import { Component } from '@angular/core'  // eslint-disable-line no-unused-vars
import { IonicPage, NavController } from 'ionic-angular'  // eslint-disable-line no-unused-vars
import { FormBuilder, FormGroup, Validators } from '@angular/forms'  // eslint-disable-line no-unused-vars
import { EntryProvider } from '../../providers/entry/entry'  // eslint-disable-line no-unused-vars

@IonicPage()
@Component({
  selector: 'page-entry-create',
  templateUrl: 'entry-create.html'
})
export class EntryCreatePage {
  public newEntryForm: FormGroup;  // eslint-disable-line no-undef

  constructor (
    public navCtrl: NavController,
    formBuilder: FormBuilder,
    public entryProvider: EntryProvider
  ) {
    this.newEntryForm = formBuilder.group({
      serviceType: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: [''],
      notes: ['']
      //updatedDate: [''],
      //disputed: [''],
      //verified: [''],
      //votes: [''],
      //createDate: [''],
      //archive: ['']
    })
  }

  createEntry () {
    if (!this.newEntryForm.valid) {
      console.log(this.newEntryForm.value)
    } else {
      this.entryProvider
        .createEntry(
          this.newEntryForm.value.serviceType,
          this.newEntryForm.value.name,
          this.newEntryForm.value.address,
          this.newEntryForm.value.phone,
          this.newEntryForm.value.notes,
          this.newEntryForm.value.updatedDate,
          this.newEntryForm.value.disputed,
          this.newEntryForm.value.verified,
          this.newEntryForm.value.votes,
          this.newEntryForm.value.createDate,
          this.newEntryForm.value.archive
          // paid: boolean = false
        )
        .then(
          () => {
            this.navCtrl.pop()
          },
          error => {
            console.log(error)
          }
        )
    }
  }
}
