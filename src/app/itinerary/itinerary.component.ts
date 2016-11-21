import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ItineraryService } from './itinerary.service';
import { Itinerary } from './itinerary';

@Component({
  selector: 'ww-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.scss']
})
export class ItineraryComponent implements OnInit {
  itinerary: Itinerary;
  basicDetailsForm: FormGroup;
  editing = false;
  editedDetails;

  constructor(
    private itineraryService: ItineraryService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
      this.basicDetailsForm = this.formBuilder.group({
        'name': '',
        'dateFrom': '',
        'dateTo': ''
      })
    }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      this.itineraryService.getItin(id)
      .subscribe(
        data => {
          this.itinerary = data.itinerary;
        }
      );
    })
  }

  editDetails() {
    this.editing = true;
  }

  saveDetails() {
    this.editedDetails = this.basicDetailsForm.value;

    if(this.editedDetails.name !== '')  {
      this.itinerary['name'] = this.editedDetails.name;
    }

    if(this.editedDetails.dateFrom !== '')  {
      this.itinerary['dateFrom'] = this.editedDetails.dateFrom;
    }

    if(this.editedDetails.dateTo !== '')  {
      this.itinerary['dateTo'] = this.editedDetails.dateTo;
    }
    console.log(this.itinerary);

    this.editing = false;

    this.basicDetailsForm.reset({
      'name': '',
      'dateFrom': '',
      'dateTo': ''
    })

    this.itineraryService.editItin(this.itinerary)
        .subscribe(
          data => console.log(data)
        )
  }

}
