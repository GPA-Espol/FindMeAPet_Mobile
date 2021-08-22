import { Component, Input, OnInit } from '@angular/core';

/**
 * Component that shows an empty list message, with a button to add
 * a new instance to the list.
 * @category Components
 */
@Component({
  selector: 'app-empty-list',
  templateUrl: './empty-list.component.html',
  styleUrls: ['./empty-list.component.scss'],
})
export class EmptyListComponent implements OnInit {
  @Input() emptyDescription: string;
  @Input() linkDescription: string;
  @Input() link: string;
  constructor() {}

  ngOnInit() {}
}
