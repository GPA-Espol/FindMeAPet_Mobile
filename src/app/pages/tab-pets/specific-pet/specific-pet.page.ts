import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-specific-pet',
  templateUrl: './specific-pet.page.html',
  styleUrls: ['./specific-pet.page.scss'],
})
export class SpecificPetPage implements OnInit {
  ngOnInit() {
    console.log('Specific pets page works!');
  }
}
