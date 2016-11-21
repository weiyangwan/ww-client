import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../user'
import { ItineraryService } from '../itinerary.service'

@Component({
  selector: 'ww-itinerary-new',
  templateUrl: './itinerary-new.component.html',
  styleUrls: ['./itinerary-new.component.scss']
})
export class ItineraryNewComponent implements OnInit {
  itineraryForm: FormGroup;
  userId;
  username;
  accommodations;
  transports;
  transportOption = ['flight'];
  transportType = [ 'flight', 'train', 'bus', 'cruise', 'vehicle rental', 'others' ];
  basicDetails = true;
  transportDetails = false;
  accommodationDetails = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private itineraryService: ItineraryService,
    private router: Router) {
    this.itineraryForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'dateFrom': ['', Validators.required],
      'dateTo': ['', Validators.required],
      'accommodations': this.accommodationsArray(),
      'transports': this.transportsArray()
    });
  }

  toggleBasicDetails()  {
    this.basicDetails = !this.basicDetails;
  }

  toggleTransportDetails()  {
    this.transportDetails = !this.transportDetails;
  }

  toggleAccommodationDetails()  {
    this.accommodationDetails = !this.accommodationDetails;
  }

  onSelect(transport, i)  {
    this.transportOption[i] = transport;
  }

  transportsArray() {
    this.transports = this.formBuilder.array([
      this.formBuilder.group({
        'transportType': 'flight',
        'referenceNumber': '',
        'depTerminal': '',
        'arrTerminal': '',
        'stationFrom': '',
        'stationTo': '',
        'cityFrom': '',
        'cityTo': '',
        'depDate': '',
        'depTime': '',
        'arrDate': '',
        'arrTime': '',
        'rentalCompany': '',
        'contactNumber': '',
        'note': '',
        'editing': false
      })
    ]);
    return this.transports;
  }

  addTransport()  {
    this.transportOption.push('flight');

    this.transports.push(
      this.formBuilder.group({
        'transportType': 'flight',
        'referenceNumber': '',
        'depTerminal': '',
        'arrTerminal': '',
        'stationFrom': '',
        'stationTo': '',
        'cityFrom': '',
        'cityTo': '',
        'depDate': '',
        'depTime': '',
        'arrDate': '',
        'arrTime': '',
        'rentalCompany': '',
        'contactNumber': '',
        'note': '',
        'editing': false
      })
    )
  }

  accommodationsArray()  {
    this.accommodations = this.formBuilder.array([
      this.formBuilder.group({
        'name': '',
        'address': '',
        'checkInDate': '',
        'checkOutDate': '',
        'note': '',
        'editing': false
      })
    ]);
    return this.accommodations;
  }

  addAccommodation()  {
    this.accommodations.push(
      this.formBuilder.group({
        'name': '',
        'address': '',
        'checkInDate': '',
        'checkOutDate': '',
        'note': '',
        'editing': false
      })
    )
  }

  deleteTransport(i)  {
    this.transports.removeAt(i);
    this.transportOption.splice(i,1);
  }

  deleteAccommodation(i)  {
    this.accommodations.removeAt(i);
  }

  onSubmit()  {
    this.itineraryForm.value.members = [{
      username: this.username,
      userId: this.userId
    }]

    this.itineraryService.addItin(this.itineraryForm.value)
        .subscribe(
          data => {
            // this.itineraryService.getItin(data.itinerary._id);
            this.router.navigate(['/itinerary', data.itinerary._id]); //need to redirect to itin ID
          },
          error => console.error(error)
        );
  }

  ngOnInit() {
    this.userService.getCurrentUserId();
    this.userId = this.userService.userId;
    this.username = this.userService.getCurrentUserName();
  }

}
