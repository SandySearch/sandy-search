import { Component, ChangeDetectorRef } from '@angular/core' // eslint-disable-line no-unused-vars
import { IonicPage, NavController } from 'ionic-angular' // eslint-disable-line no-unused-vars
import { FormBuilder, FormGroup, Validators } from '@angular/forms' // eslint-disable-line no-unused-vars
import { EntryProvider } from '../../providers/entry/entry' // eslint-disable-line no-unused-vars
import { GeocodingProvider } from '../../providers/geocoding/geocoding' // eslint-disable-line no-unused-vars

@IonicPage()
@Component({
  selector: 'page-entry-create',
  templateUrl: 'entry-create.html'
  })
export class EntryCreatePage {
  public newEntryForm: FormGroup // eslint-disable-line no-undef
  // isToggled: boolean = false
  lat: number = 0 // eslint-disable-line no-undef
  lng: number = 0 // eslint-disable-line no-undef
  mapsClient: any // eslint-disable-line no-undef
  location: {lat: number, lng: number} // eslint-disable-line no-undef
  loading: boolean // eslint-disable-line no-undef

  constructor (
    public navCtrl: NavController,
    formBuilder: FormBuilder,
    public entryProvider: EntryProvider,
    private geocodingProvider: GeocodingProvider,
    private ref: ChangeDetectorRef
    // private __zone: NgZone
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
      // updatedDate: [''],
      // disputed: [''],
      // verified: [''],
      // votes: [''],
      // createDate: [''],
      // archive: ['']
    })
  }

  // https://stackoverflow.com/questions/40729335/ionic2-ion-toggle-get-value-on-ionchange
  atLocation () {
    console.log('toggled: ' + this.newEntryForm.value.here)
    if (this.newEntryForm.value.here) { // only needed if toggled back and forth more than once
      // then get lat lon for this location via GPS  (user is at location)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.lat = position.coords.latitude
          this.lng = position.coords.longitude
          console.log('EntryCreate this.lat/this.lng 1= ' + this.lat + '/' + this.lng)
        })
      } else { // if GPS failed or is disabled
        // should we set here = false to trigger geocoding?
        this.lat = 41.678418
        this.lng = -73.809007
        console.log('EntryCreate this.lat/this.lng 2= ' + this.lat + '/' + this.lng)
      }
    }
  }

  /***
  googleMapsClient.geocode({address: '1600 Amphitheatre Parkway, Mountain View, CA'})
    .asPromise()
    .then((response) => {
      console.log("geocode= ",response.json.results);
    })
    .catch((err) => {
      console.log(err);
  });
  ***/

  getAddress (address: string): any {
    /***
    this.geocodingProvider.getLatLon('Andorra')
      .subscribe(
        result => {
            this.__zone.run(() => {
                this.lat = result.lat();
                this.lng = result.lng();
            })
        },
        error => console.log(error),
        () => console.log('Geocoding completed!')
      );
     ***/
    this.loading = true
    this.geocodingProvider.getLatLon(address)
      .subscribe(
        location => {
          this.location = location
          this.lat = location.lat
          this.lng = location.lng
          this.loading = false
          // this.ref.detectChanges()
          console.log('address [' + address + '] has lat/lon =' + this.lat + '/' + this.lng)
          this.addEntry()
        },
        error => console.log('Geocoding error: ', error),
        () => {
          console.log('Geocoding completed!')
        }
      )
  }

  createEntry () {
    if (!this.newEntryForm.valid) {
      console.log(this.newEntryForm.value)
    } else {
      if (this.newEntryForm.value.here === false) {
        // FIXME do geoCoding here, if needed (if here === false)
        /***
        this.mapsClient.geocode({address: '1600 Amphitheatre Parkway, Mountain View, CA'})
          .asPromise().then((response) => {
            console.log("geocode= ",response.json.results);
          })
          .catch((err) => {
            console.log(err);
        })
        ***/

        // this.getAddress('1148 New Britain Ave, West Hartford, CT')
        /***
        this.getAddress('West Haven, CT').then(() => {
            console.log("after address lat/lon ="+this.lat+"/"+this.lng)
          })
        ***/

        // this.getAddress('West Haven, CT')
        this.getAddress(this.newEntryForm.value.address)
        // console.log("after address lat/lon ="+this.lat+"/"+this.lng)
      } else {
        // no geocoding
        this.addEntry()
      }

      console.log('createEntry this.lat/this.lng = ' + this.lat + '/' + this.lng)
    }
  }

  addEntry () {
    // validate lat lon first
    if ((this.lat < -89) || (this.lat > 89) || (this.lat === 0)) {
      this.lat = 41.67
    }
    if ((this.lng < -179) || (this.lng > 179) || (this.lng === 0)) {
      this.lng = -73.80
    }
    console.log('addEntry this.lat/this.lng = ' + this.lat + '/' + this.lng)

    this.entryProvider
      .createEntry(
        this.newEntryForm.value.serviceType,
        this.newEntryForm.value.name,
        'anon', // for owner
        this.newEntryForm.value.address,
        this.newEntryForm.value.phone,
        this.newEntryForm.value.notes,
        this.lat,
        this.lng,
        this.newEntryForm.value.here
        // this.newEntryForm.value.updatedDate,
        // this.newEntryForm.value.disputed,
        // this.newEntryForm.value.verified,
        // this.newEntryForm.value.votes,
        // this.newEntryForm.value.createDate,
        // this.newEntryForm.value.archive
      )
      .then(
        () => {
          this.navCtrl.pop() // back to homePage
        },
        error => {
          console.log('error building entry', error)
        }
      )
  }
}
