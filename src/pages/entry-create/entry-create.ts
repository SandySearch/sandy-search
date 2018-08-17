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
          this.newEntryForm.value.name,
          this.newEntryForm.value.amount,
          this.newEntryForm.value.dueDate
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
