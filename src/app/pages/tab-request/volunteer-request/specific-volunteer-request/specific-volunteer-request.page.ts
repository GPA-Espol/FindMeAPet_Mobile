import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-specific-volunteer-request',
  templateUrl: './specific-volunteer-request.page.html',
  styleUrls: ['./specific-volunteer-request.page.scss'],
})
export class SpecificVolunteerRequestPage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor() { }

  ngOnInit() {
  }

}
