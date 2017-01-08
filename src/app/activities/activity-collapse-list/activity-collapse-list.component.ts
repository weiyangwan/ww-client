import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { ItineraryService } from '../../itinerary/itinerary.service';
import { Event, EventService } from '../../event';

@Component({
  selector: 'ww-activity-collapse-list',
  templateUrl:'./activity-collapse-list.component.html' ,
  styleUrls: ['./activity-collapse-list.component.scss']
})
export class ActivityCollapseListComponent implements OnInit {
  eventSubscription: Subscription;
  events: Event[] = [];

  itinDateSubscription: Subscription;
  itinDateRange = [];
  collapseDate = [];

  constructor(
    private eventService: EventService,
    private itineraryService: ItineraryService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.eventService.getEvents(this.route.snapshot['_urlSegment'].segments[2].path)
        .subscribe(
          data => {
            this.events = data;
          }
        )

    this.eventSubscription = this.eventService.updateEvent
                                 .subscribe(
                                  result => {
                                    this.events = Object.keys(result).map(key => result[key]);
                                  })

    this.itinDateSubscription = this.itineraryService.updateDate
                                    .subscribe(
                                      result => {
                                        this.itinDateRange = Object.keys(result).map(key => result[key]);
                                        for (let i = 0; i < this.itinDateRange.length; i++) {
                                          this.collapseDate.push(false);
                                        }
                                    })
  }

  toggleCollapse(i) {
    this.collapseDate[i] = !this.collapseDate[i];
  }

  expandAll() {
    for (let i = 0; i < this.collapseDate.length; i++) {
        this.collapseDate[i] = false;
    }
  }

  collapseAll() {
    for (let i = 0; i < this.collapseDate.length; i++) {
        this.collapseDate[i] = true;
    }
  }

}
