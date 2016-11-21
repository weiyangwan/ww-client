import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { Itinerary } from './itinerary';

@Injectable()
export class ItineraryService {
  itinerary: Itinerary;
  private itineraries: Itinerary[] = [];
  private url = 'http://localhost:9000';

  constructor( private http: Http)  {}

  getItin(itineraryId) {
    return this.http.get( this.url + "/itinerary/" + itineraryId)
                    .map((response: Response) => {
                      this.itinerary = response.json().itinerary;
                      return response.json();
                    })
                    .catch((error: Response) => Observable.throw(error.json()));
  }

  itin()  {
    return this.itinerary;
  }

  addItin(itinerary: Itinerary) {
    this.itineraries.push(itinerary);
    const body = JSON.stringify(itinerary);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';

    return this.http.post(this.url + '/itinerary/new' + token, body, { headers: headers })
                    .map((response: Response) => response.json())
                    .catch((error: Response) => Observable.throw(error.json()));
  }

  editItin(itinerary: Itinerary)  {
    console.log(itinerary);
    const body = JSON.stringify(itinerary);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';

    return this.http.patch( this.url + "/itinerary/" + itinerary['_id']+ token, body, { headers: headers })
                    .map((response: Response) => response.json())
                    .catch((error: Response) => Observable.throw(error.json()));
  }
}
