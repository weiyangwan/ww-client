import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Event, EventService } from '../../event';

@Component({
  selector: 'ww-activity-list',
  template: `
    <div>
      <ww-activity [activity]="activity" *ngFor="let activity of activities"></ww-activity>
    </div>
  `,
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {
  activities: Event[] = [];

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.eventService.getEvents(this.route.snapshot['_urlSegment'].segments[2].path)
        .subscribe(
          data => {
            this.activities = data;
          }
        )
  }
}
