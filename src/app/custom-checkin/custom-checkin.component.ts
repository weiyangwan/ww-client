import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ww-custom-checkin',
  templateUrl: './custom-checkin.component.html',
  styleUrls: ['./custom-checkin.component.scss']
})
export class CustomCheckinComponent implements OnInit {
  checkinDetail;

  constructor() { }

  ngOnInit() {
  }

  getCheckinDetails(value)  {
    this.checkinDetail = value;
    console.log(value);
  }

  submit()  {
    console.log(this.checkinDetail);
  }

}
