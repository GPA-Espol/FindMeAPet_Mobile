import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { NotificationType } from 'src/app/utils/utils';

@Component({
  selector: 'app-tab-request',
  templateUrl: './tab-request.page.html',
  styleUrls: ['./tab-request.page.scss'],
})
export class TabRequestPage implements OnInit {
  Object = Object;
  options = {
    adoption: {
      redirectTo: 'adopcion',
      icon: '/assets/icon/adopcion.svg',
      description: 'Adopción',
      notifications: 0,
    },
    requests: {
      redirectTo: 'propuesta-voluntarios',
      icon: '/assets/icon/voluntario.svg',
      description: 'Propuestas de voluntarios',
      notifications: 0,
    },
    externals: {
      redirectTo: 'casos-ext',
      icon: '/assets/icon/mascotas.png',
      description: 'Casos externos',
      notifications: 0,
    },
  };

  private notificationSubscription: Subscription;

  constructor(private notificationService: NotificationsService) {}

  async ngOnInit() {
    await this.setNotificationsNumber();
    this.notificationSubscription = this.notificationService.getObservable().subscribe((notifType) => {
      if (this.isRellevantNotifType(notifType)) {
        this.setNotificationsNumber();
      }
    });
  }

  private async setNotificationsNumber() {
    const notifications = await this.notificationService.getAllNotifications();
    this.options.adoption.notifications = notifications[NotificationType.ADOPT_PET_REQUEST].length;
    this.options.externals.notifications = notifications[NotificationType.EXTERNAL_REQUEST].length;
    const volunteersRequests =
      notifications[NotificationType.ADD_PET_REQUEST].length +
      notifications[NotificationType.EDIT_PET_REQUEST].length;
    this.options.requests.notifications = volunteersRequests;
  }

  isRellevantNotifType(notifType: NotificationType) {
    return (
      notifType == NotificationType.ADD_PET_REQUEST ||
      notifType == NotificationType.EDIT_PET_REQUEST ||
      notifType == NotificationType.ADOPT_PET_REQUEST ||
      notifType == NotificationType.EXTERNAL_REQUEST
    );
  }

  ngOnDestroy() {
    this.notificationSubscription.unsubscribe();
  }
}
