import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.page.html',
  styleUrls: ['./add-pet.page.scss'],
})
export class AddPetPage implements OnInit {
  extraInformation: boolean = false;
  ageType: string = '';
  constructor() { }

  ngOnInit() {
  }

}
