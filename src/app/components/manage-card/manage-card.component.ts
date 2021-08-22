import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Publicacion } from 'src/app/model/publicacion.model';
import { PublicationObserverService } from 'src/app/observables/publication-observer.service';

/**
 * Component that shows a card with information of the title, description date
 * of a given publication.
 * @category Components
 */
@Component({
  selector: 'app-manage-card',
  templateUrl: './manage-card.component.html',
  styleUrls: ['./manage-card.component.scss'],
})
export class ManageCardComponent implements OnInit {
  /**
   * The maximun length of the publication description that will be
   * shown in the view
   */
  DISPLAY_TEXT_MAX_LENGTH = 200;
  display_description: string;
  @Input() publicacion: Publicacion;
  private publicationSubscription: Subscription;
  constructor(private publicationObserver: PublicationObserverService) {}

  ngOnInit() {
    this.truncateText();
    this.publicationSubscription = this.publicationObserver.getObservable().subscribe(() => {
      this.truncateText();
    });
  }

  /**
   * Truncate the text showed in the view to a max length of this.DISPLAY_TEXT_MAX_LENGTH
   * characters, it the text is larger, it truncate the text at character 200, and add
   * an elipsis
   */
  private truncateText() {
    const description = this.publicacion.descripcion;
    if (description.length > this.DISPLAY_TEXT_MAX_LENGTH) {
      this.display_description = description.substr(0, this.DISPLAY_TEXT_MAX_LENGTH) + '...';
    } else {
      this.display_description = description;
    }
  }

  /**
   * Will unsubscribe from the publication observer when component
   * is destroyed.
   */
  ngOnDestroy() {
    this.publicationSubscription.unsubscribe();
  }
}
