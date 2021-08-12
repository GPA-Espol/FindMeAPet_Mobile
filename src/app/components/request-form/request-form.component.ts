import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss'],
})
export class RequestFormComponent implements OnInit {
  @Input() new: boolean;
  @Input() object: string;
  constructor() { }

  ngOnInit() {}

}
