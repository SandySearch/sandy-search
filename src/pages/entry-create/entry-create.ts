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
  public newEntryForm: FormGroup  // eslint-disable-line no-undef
  //isToggled: boolean = false
  lat: number = 999
  lon: number = 999
  constructor (
    public navCtrl: NavController,
    formBuilder: FormBuilder,
    public entryProvider: EntryProvider
  ) {
    /***
    form = new FormGroup(
    { 
      first: new FormControl(
      {value: 'Nancy', disabled: true},
            Validators.required), 
        last: new FormControl('Drew', Validators.required) });
     ***/
    this.newEntryForm = formBuilder.group({
      serviceType: ['GS', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      here: [false],
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

  // https://stackoverflow.com/questions/40729335/ionic2-ion-toggle-get-value-on-ionchange
  atLocation() {
    console.log("toggled: "+ this.newEntryForm.value.here)
    if (this.newEntryForm.value.here) {
      // then get lat lon for this location
      //and store in lat,lon in entry
      this.lat = 123
      this.lon = 456
    } else {
      // don't know yet as address needs to be looked up
      this.lat = 999
      this.lon = 999
    }
    console.log("lat: "+ this.lat)
    console.log("lon: "+ this.lon)
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
          this.lat,
          this.lon
          //this.newEntryForm.value.updatedDate,
          //this.newEntryForm.value.disputed,
          //this.newEntryForm.value.verified,
          //this.newEntryForm.value.votes,
          //this.newEntryForm.value.createDate,
          //this.newEntryForm.value.archive

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
