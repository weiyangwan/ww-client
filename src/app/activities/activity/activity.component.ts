import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

import { ItineraryService } from '../../itinerary/itinerary.service';
import { Event, EventService } from '../../event';
import { FlashMessageService } from '../../flash-message';

@Component({
  selector: 'ww-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  @Input() activity: Event;

  editing = false;
  deleteActivity = false;

  editCustomActivityForm: FormGroup;
  categories;
  anytime;

  itinDateSubscription: Subscription;
  itinDateRange = [];

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private flashMessageService: FlashMessageService,
    private itineraryService: ItineraryService) {
      this.editCustomActivityForm = this.formBuilder.group({
        'categories': this.initCategoryArray(),
        'name': '',
        'description': '',
        'subDescription': '',
        'opening_hours': '',
        'entryFee': '',
        'website': '',
        'formatted_address': '',
        'international_phone_number':'',
        'date': '',
        'time': '',
        'note': '',
        'checkedIn': '',

      })
    }

  ngOnInit() {
    this.itinDateSubscription = this.itineraryService.updateDate
                                    .subscribe(
                                      result => {
                                        let updatedItinDate = Object.keys(result).map(key => result[key]);
                                        this.itinDateRange = updatedItinDate;
                                    })
  }

  initCategoryArray() {
    this.categories = this.formBuilder.array([
      this.formBuilder.group({ value:'sight-seeing', icon: 'eye', checked: false }),
      this.formBuilder.group({ value: 'food/drink', icon: 'cutlery', checked: false }),
      this.formBuilder.group({ value: 'adventure', icon: 'hand-peace-o', checked: false })
    ])
    return this.categories;
  }

  onEdit()  {
    console.log(this.activity);
    this.editing = true;
    if(this.activity['time'] === 'anytime') {
      this.anytime = true;
    }
  }

  cancelEditActivity()  {
    this.editing = false;
  }

  onUpdateActivity()  {
    let categoryArray = [
      { value:'sight-seeing', icon: 'eye' },
      { value: 'food/drink', icon: 'cutlery' },
      { value: 'adventure', icon: 'hand-peace-o' }
    ]

    let editedActivity = this.editCustomActivityForm.value;

    for (let i = 0; i < this.activity['categories'].length; i++) {
      this.activity['categories'][i]['value'] = categoryArray[i]['value']
      this.activity['categories'][i]['icon'] = categoryArray[i]['icon']
    }

    for (let value in editedActivity) {
      if(editedActivity[value] === null)  {
        editedActivity[value] = '';
      }
      if(editedActivity[value] !== '')  {
        this.activity[value] = editedActivity[value];
      }
    }

    if(editedActivity['time'] === '' || this.anytime) {
      this.activity['time'] = 'anytime';
    }

    this.eventService.editEvent(this.activity)
        .subscribe(
          data => {
          this.flashMessageService.handleFlashMessage(data.message);
        })

    this.editing = false;

    this.editCustomActivityForm.reset([{
      'categories': this.initCategoryArray(),
      'name': '',
      'description': '',
      'subDescription': '',
      'opening_hours': '',
      'entryFee': '',
      'website': '',
      'formatted_address': '',
      'international_phone_number':'',
      'date': '',
      'time': '',
      'note': '',
      'locationCheckedIn': '',

    }])
  }

  confirmDelete() {
    this.deleteActivity = true;
  }

  cancelDelete()  {
    this.deleteActivity = false;
  }

  onDeleteActivity()  {
    this.eventService.deleteEvent(this.activity)
        .subscribe(
          data => {
            this.flashMessageService.handleFlashMessage(data.message);
          })
    this.deleteActivity = false;
  }

  checkIn() {
    this.activity['locationCheckedIn'].push(new Date);
    this.eventService.editEvent(this.activity)
        .subscribe(
          data => {
            this.flashMessageService.handleFlashMessage(data.message);
          }
        )
  }

  toggleAnytime() {
    this.anytime = !this.anytime;
  }
}
