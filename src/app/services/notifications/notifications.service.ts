import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationType } from 'src/app/utils/utils';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private STORAGE_KEY = 'notifications';
  private notifSubject = new Subject<NotificationType>();

  constructor(private storage: StorageService) {}

  /**
   * Add a new notification to the notifications stored in localeStorage
   * and then publish the new Change
   * @param notif The actual notification, an object that must have set the
   * notifType property
   */
  async newNotif(notif: any) {
    let notifications = await this.storage.get(this.STORAGE_KEY);
    if (!notifications) {
      notifications = this.newNotifObject();
    }
    notifications[notif.notifType].push(notif);
    await this.storage.set(this.STORAGE_KEY, notifications);
    this.notifSubject.next(notif.notifType);
  }

  /**
   * Method that remove a specific notification from its array of
   * typeNotification, and then publish the new Change
   * @param notif The actual notification to be removed from the
   * array of non-readed notifications
   */
  async readedNotif(notif: any) {
    const notifications = await this.storage.get(this.STORAGE_KEY);
    const typeNotif = notifications[notif.notifType];
    const indexNotif = typeNotif.findIndex((notification) => (notification.id = notif.id));
    typeNotif.splice(indexNotif, 1);
    await this.storage.set(this.STORAGE_KEY, notifications);
    this.notifSubject.next(notif.notifType);
  }

  /**
   * Clear all non-readed notifications of a given type and then
   * publish the new Change
   * @param notifType The type of notifications to be cleared
   */
  async clearNotif(notifType: NotificationType) {
    const notifications = await this.storage.get(this.STORAGE_KEY);
    notifications[notifType] = [];
    await this.storage.set(this.STORAGE_KEY, notifications);
    this.notifSubject.next(notifType);
  }

  /**
   * Get all the notifications object from the localStorage, if it doesnt exist
   * then return an empty notifications Object
   * @returns the notifications object
   */
  async getAllNotifications() {
    const notifications = await this.storage.get(this.STORAGE_KEY);
    return notifications || this.newNotifObject();
  }

  /**
   * Get the notification of a specific notification type, if the
   * notifications object doesnt exist in local storage yet, then
   * return an empty array
   * @param {NotificationType} notifType Notification Type which will
   * @returns
   */
  async getNotifications(notifType: NotificationType) {
    const notifications = await this.storage.get(this.STORAGE_KEY);
    return notifications ? notifications[notifType] : [];
  }

  getObservable() {
    return this.notifSubject;
  }
  /**
   * Create a new empty Notification Object that will be saved on localStorage
   * its structure consists of an object that have as keys the codes of the different
   * types of notifications, and as a values an empty array which will be used to
   * store the non-readed notifications.
   * @returns The actual new Notification object
   */
  private newNotifObject() {
    let notifications = {};
    Object.values(NotificationType).forEach((type) => (notifications[type] = []));
    return notifications;
  }
}
