import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable, ReplaySubject } from 'rxjs';

import { Event } from './event';

@Injectable()
export class EventService  {
  private events: Event[] = [];

  private url = 'http://localhost:9000';
  // private url = 'https://vast-island-87972.herokuapp.com';

  private flightStatsUrl = "https://api.flightstats.com/flex/schedules/rest/v1/json/"
  // flight/SQ/346/departing/2017/2/12?appId=8d4596b2&appKey=ab8b1a3b2f1f66e0db7be662f41425cc
  updateEvent = new ReplaySubject();

  constructor( private http: Http, private route: ActivatedRoute)  {}

  getFlightDetails(criteria)  {
    // const id = '?appId=8d4596b2&appKey=ab8b1a3b2f1f66e0db7be662f41425cc';
    const id = '?appId=c3a7246f&appKey=f214b2595cbf42e49935c44246c09259';
    let myHeaders: Headers = new Headers
    myHeaders.append('Accept', 'application/json')
    myHeaders.append('Access-Control-Allow-Origin', '*')

    return this.http.get(this.flightStatsUrl + criteria + id, { headers: myHeaders })
                    .map((response: Response) => response.json())
                    .catch((error: Response) => Observable.throw(error.json()));
  }

  getEvents(itineraryId) {
    const itinId = '?itinId=' + itineraryId;
    return this.http.get( this.url + "/event" + itinId)
                    .map((response: Response) => {
                      this.events = response.json().events;
                      this.updateEvent.next(this.events);
                      return this.events;
                    })
                    .catch((error: Response) => Observable.throw(error.json()));
  }

  addEvent(event: Event, itineraryId) {
    const body = JSON.stringify(event);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';

    return this.http.post( this.url + "/event/custom/" + itineraryId + token, body, { headers: headers })
                    .map((response: Response) => {
                      let newEvent = response.json().eventItem;
                      newEvent.user = {
                        _Id: event['user']._Id,
                        username: event['user'].username
                      }
                      this.events.push(newEvent);
                      this.updateEvent.next(this.events);

                      return response.json();
                    })
                    .catch((error: Response) => Observable.throw(error.json()));
  }

  editEvent(event: Event)  {
    const body = JSON.stringify(event);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';

    return this.http.patch( this.url + "/event/" + event['_id']+ token, body, { headers: headers })
                    .map((response: Response) => {
                      let index = this.events.indexOf(event);
                      this.events[index] = event;
                      this.updateEvent.next(this.events);

                      return response.json()
                    })
                    .catch((error: Response) => Observable.throw(error.json()));
  }

  deleteEvent(event: Event)  {
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';

    return this.http.delete( this.url + "/event/" + event['_id'] + token)
                    .map((response: Response) => {
                      this.events.splice(this.events.indexOf(event), 1);
                      this.updateEvent.next(this.events);

                      return response.json()
                    })
                    .catch((error: Response) => Observable.throw(error.json()));
  }

}
