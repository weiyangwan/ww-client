import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ItineraryService } from '../../itinerary.service';
import { Itinerary } from '../../itinerary';

@Component({
  selector: 'ww-itinerary-summary',
  templateUrl: './itinerary-summary.component.html',
  styleUrls: ['./itinerary-summary.component.scss']
})
export class ItinerarySummaryComponent implements OnInit, DoCheck {
  itinerary: Itinerary;

  // for editing accommodation
  accommodationSection = true;
  editAccommodationForm: FormGroup;
  accommodations;

  // for editing transport
  transportSection = true;
  editTransportForm: FormGroup;
  transports;

  // for adding new accommodation/transport
  addAccommodationForm: FormGroup;
  // to see the add new accommodation form
  addNewAccommodation = false;

  addTransportForm: FormGroup;
  // to see the add new transport form
  addNewTransport = false;
  transportType = [ 'flight', 'train', 'bus', 'cruise', 'vehicle rental', 'others' ];
  transportOption = ['flight'];

  constructor(
    private itineraryService: ItineraryService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
      this.editAccommodationForm = this.formBuilder.group({
        'name': '',
        'address': '',
        'checkInDate': '',
        'checkOutDate': '',
        'note': '',
        'editing': false
      }),
      this.editTransportForm = this.formBuilder.group({
        'transportType': '',
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
      }),
      this.addAccommodationForm = this.formBuilder.group({
        'accommodations': this.accommodationsArray()
      }),
      this.addTransportForm = this.formBuilder.group({
        'transports': this.transportsArray()
      })
    }


  // TO SHOW/HIDE THE ACCOMMODATION/TRANSPORT SECTION
  toggleAccommodation() {
    this.accommodationSection = !this.accommodationSection;
  }

  toggleTransport() {
    this.transportSection = !this.transportSection;
  }

  //-------------- SECTION FOR ADDING NEW ACCOMMODATION/TRANSPORT --------

  // TO TOGGLE VIEW, TRUE WILL SHOW THE ADD ACCOMMODATION/TRANSPORT FORM
  addAccommodation()  {
    this.addNewAccommodation = true;
    this.accommodationSection = true;
  }

  addTransport()  {
    this.addNewTransport = true;
    this.transportSection = true;
  }

  // FOR ADDING NEW ACCOMMODATIONS/TRANSPORTS IN THE FORM
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

  addTransportControl()  {
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

  addAccommodationControl()  {
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

  // TO DETERMINE TRANSPORT TYPE AND RENDER THE APPROPRIATE FORM VIEW
  onSelect(transport, i)  {
    this.transportOption[i] = transport;
  }

  // FOR FORM SUBMISSION WHEN ADDING NEW ACCOMMODATION/TRANSPORT
  onAddNewAccommodations()  {
    let newAccommodationArray = this.addAccommodationForm.value.accommodations;

    for (var i = 0; i < newAccommodationArray.length; i++) {
      this.itinerary['accommodations'].push(newAccommodationArray[i])
    }

    this.addNewAccommodation = false;
    this.accommodations.reset([{
      'name': '',
      'address': '',
      'checkInDate': '',
      'checkOutDate': '',
      'note': '',
      'editing': false
    }])

    this.itineraryService.editItin(this.itinerary)
        .subscribe(
          data => console.log(data)
        )
  }

  onAddNewTransports()  {
    let newTransportArray = this.addTransportForm.value.transports;

    for (var i=0; i < newTransportArray.length; i++)  {
      this.itinerary['transports'].push(newTransportArray[i])
    }

    this.transports.reset([{
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
    }])

    this.transportOption = ['flight'];

    this.addNewTransport = false;

    this.itineraryService.editItin(this.itinerary)
        .subscribe(
          data => console.log(data)
        )
  }

  // TO DELETE ADDITIONAL ENTRY
  deleteNewAccommodation(i)  {
    if (this.accommodations.length === 1)  {
      this.addNewAccommodation = false;

      this.accommodations.reset([{
        'name': '',
        'address': '',
        'checkInDate': '',
        'checkOutDate': '',
        'note': '',
        'editing': false
      }])
    } else  {
      this.accommodations.removeAt(i);
    }
  }

  deleteNewTransport(i) {
    if (this.transports.length === 1) {
      this.addNewTransport = false;

      this.transports.reset([{
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
      }])

      this.transportOption = ['flight'];
    } else  {
      this.transports.removeAt(i);
    }
  }

  //-------------- END OF SECTION FOR ADDING NEW ACCOMMODATION/TRANSPORT --------


  //-------------- SECTION FOR EDITING CURRENT ACCOMMODATION/TRANSPORT --------

  // TO SHOW THE EDIT FORM
  editAccommodation(accommodation)  {
    accommodation.editing = true;
  }

  editTransport(transport)  {
    transport.editing = true;
  }

  // WHEN SUBMITTING THE EDITED FORM AND TO SEND TO ITINERARY SERVICE
  onEditAccommodation(index) {
    let editedAccommodation = this.editAccommodationForm.value;
    let originalAccommodation = this.itinerary['accommodations'][index];

    for (var value in editedAccommodation)  {
      if(editedAccommodation[value] === '')  {
        editedAccommodation[value] = originalAccommodation[value];
      }
    }

    originalAccommodation.editing = false;
    this.itinerary['accommodations'][index] = editedAccommodation;

    this.editAccommodationForm.reset({
      'name': '',
      'address': '',
      'checkInDate': '',
      'checkOutDate': '',
      'note': '',
      'editing': false
    })

    this.itineraryService.editItin(this.itinerary)
        .subscribe(
          data => console.log(data)
        )
  }

  onEditTransport(index)  {
    let editedTransport = this.editTransportForm.value;
    let originalTransport = this.itinerary['transports'][index];

    for (var value in editedTransport) {
      if(editedTransport[value] === '')  {
        editedTransport[value] = originalTransport[value];
      }
    }

    originalTransport.editing = false;
    this.itinerary['transports'][index] = editedTransport;

    this.editTransportForm.reset({
      'transportType': '',
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

    this.itineraryService.editItin(this.itinerary)
        .subscribe(
          data => console.log(data)
        )
  }

  //-------------- END OF SECTION FOR EDITING CURRENT ACCOMMODATION/TRANSPORT --------

  // TO DELETE EXISTING ACCOMMODATION/TRANSPORT
  deleteAccommodation(i)  {
    this.itinerary['accommodations'].splice(i, 1);

    this.itineraryService.editItin(this.itinerary)
        .subscribe(
          data => console.log(data)
        )
  }

  deleteTransport(i)  {
    this.itinerary['transports'].splice(i, 1);

    this.itineraryService.editItin(this.itinerary)
        .subscribe(
          data => console.log(data)
        )
  }

  ngOnInit() {
  }

  ngDoCheck() {
    this.itinerary = this.itineraryService.itin();
    // console.log(this.itinerary);
  }

}
