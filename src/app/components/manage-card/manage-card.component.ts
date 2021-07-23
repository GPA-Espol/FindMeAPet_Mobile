import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-card',
  templateUrl: './manage-card.component.html',
  styleUrls: ['./manage-card.component.scss'],
})
export class ManageCardComponent implements OnInit {
  description = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima error beatae itaque maxime voluptate
  quae, aliquid ipsa corrupti eos quas quam, iste molestiae ratione odio amet. Officia distinctio vel
  sequi nesciunt saepe qui dolor perferendis odit natus. Autem, architecto sequi!`;

  DISPLAY_TEXT_MAX_LENGTH = 200;
  display_description: string;
  constructor() {}

  ngOnInit() {
    this.truncateText();
  }

  private truncateText() {
    if (this.description.length > this.DISPLAY_TEXT_MAX_LENGTH) {
      this.display_description = this.description.substr(0, this.DISPLAY_TEXT_MAX_LENGTH) + '...';
    } else {
      this.display_description = this.description;
    }
  }
}
