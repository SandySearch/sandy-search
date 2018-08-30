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
  lat: number = 0
  lng: number = 0
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
    if (this.newEntryForm.value.here) { // only needed if toggled back and forth more than once
      // then get lat lon for this location via GPS  (user is at location)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
         this.lat = position.coords.latitude
         this.lng = position.coords.longitude
         console.log("EntryCreate this.lat/this.lng 1= "+this.lat+'/'+this.lng)
       });
     } else {  // if GPS failed or is disabled
        // should we set here = false to trigger geocoding?
       this.lat = 41.678418
       this.lng = -73.809007
       console.log("EntryCreate this.lat/this.lng 2= "+this.lat+'/'+this.lng)
      }
    }
  }

  createEntry () {
    if (!this.newEntryForm.valid) {
      console.log(this.newEntryForm.value)
    } else {
      if (this.newEntryForm.value.here === false) {
        // FIXME do geoCoding here, if needed (if here === false)
        this.lat = 41.67
        this.lng = -73.80
        console.log("createEntry this.lat/this.lng = "+this.lat+'/'+this.lng)
      }
      this.entryProvider
        .createEntry(
          this.newEntryForm.value.serviceType,
          this.newEntryForm.value.name,
          this.newEntryForm.value.address,
          this.newEntryForm.value.phone,
          this.newEntryForm.value.notes,
          this.lat,
          this.lng,
          this.newEntryForm.value.here
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
