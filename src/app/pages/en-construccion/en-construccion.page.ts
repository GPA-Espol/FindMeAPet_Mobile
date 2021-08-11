import { Component, OnInit } from '@angular/core';

/**
 * Class Page in charge to show a in construction graph to the user
 * when he/she visits a page that hasn't been constructed yet.
 * @category Components
 */
@Component({
  selector: 'app-en-construccion',
  templateUrl: './en-construccion.page.html',
  styleUrls: ['./en-construccion.page.scss'],
})
export class EnConstruccionPage implements OnInit {
  ngOnInit() {
    console.log('construction page works');
  }
}
