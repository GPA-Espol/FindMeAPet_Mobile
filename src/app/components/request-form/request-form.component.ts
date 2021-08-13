import { Component, Input, OnInit } from '@angular/core';
import { Mascota } from 'src/app/model/mascota.model';
import { Mode } from 'src/app/utils/utils';

@Component({
  selector: 'request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss'],
})
export class RequestFormComponent implements OnInit {
  @Input() new: boolean;
  @Input() compareTo: Mascota;
  @Input() mascota: Mascota;
  constructor() {}

  ngOnInit() {}

  returnValue(key) {
    return this.compareTo ? (this.mascota[key] ? this.mascota[key] : this.compareTo[key]) : this.mascota[key];
  }

  returnClass(key) {
    return this.compareTo ? (this.mascota[key] ? 'new' : '') : '';
  }
}
