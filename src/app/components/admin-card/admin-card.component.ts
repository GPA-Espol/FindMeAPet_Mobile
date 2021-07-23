import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-card',
  templateUrl: './admin-card.component.html',
  styleUrls: ['./admin-card.component.scss'],
})
export class AdminCardComponent implements OnInit {
  /**
   * Absolute path to icon
   */
  @Input() icon: string;

  /**
   * Description that will be shown within the card benath the icon
   */
  @Input() description: string;

  /**
   * Absolute path to redirect to when user press the
   * card
   */
  @Input() redirectTo: string;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}

  /**
   * Method to redirect the user to a new page
   */
  redirect() {
    this.router.navigate([this.redirectTo], { relativeTo: this.route });
  }
}
