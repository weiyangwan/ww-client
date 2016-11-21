import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ItineraryService } from '../itinerary.service';
import { Itinerary } from '../itinerary';

@Component({
  selector: 'ww-itinerary-details',
  templateUrl: './itinerary-details.component.html',
  styleUrls: ['./itinerary-details.component.scss']
})
export class ItineraryDetailsComponent implements OnInit {
  // @Input() itinerary: Itinerary;

  constructor(
    private itineraryService: ItineraryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.route.params.forEach((params: Params) => {
    //   let id = params['id'];
    //   this.itineraryService.getItin(id)
    //   .subscribe(
    //     data => {
    //       this.itinerary = data.itinerary;
    //       console.log(this.itinerary)
    //     }
    //   );
    // })
  }
}
