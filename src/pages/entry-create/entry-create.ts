import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntryProvider } from '../../providers/entry/entry';

@IonicPage()
@Component({
  selector: 'page-entry-create',
  templateUrl: 'entry-create.html'
})
export class EntryCreatePage {
  public newEntryForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    formBuilder: FormBuilder,
    public entryProvider: EntryProvider
  ) {
    this.newEntryForm = formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      notes: ['', Validators.required],
      amount: ['', Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  createEntry() {
    if (!this.newEntryForm.valid) {
      console.log(this.newEntryForm.value);
    } else {
      this.entryProvider
        .createEntry(
          this.newEntryForm.value.type,
          this.newEntryForm.value.name,
          this.newEntryForm.value.address,
          this.newEntryForm.value.phone,
          this.newEntryForm.value.notes,
          this.newEntryForm.value.updatedDate,
          this.newEntryForm.value.disputed,
          this.newEntryForm.value.verified,
          this.newEntryForm.value.votes,
          this.newEntryForm.value.amount,
          this.newEntryForm.value.dueDate
          // paid: boolean = false
        )
        .then(
          () => {
            this.navCtrl.pop();
          },
          error => {
            console.log(error);
          }
        );
    }
  }
}
