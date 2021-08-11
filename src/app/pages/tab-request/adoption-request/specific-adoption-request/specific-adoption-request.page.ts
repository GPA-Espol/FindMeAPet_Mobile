import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-specific-adoption-request',
  templateUrl: './specific-adoption-request.page.html',
  styleUrls: ['./specific-adoption-request.page.scss'],
})
export class SpecificAdoptionRequestPage implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const idAdoptReq = +this.route.snapshot.paramMap.get('id');
  }
}
