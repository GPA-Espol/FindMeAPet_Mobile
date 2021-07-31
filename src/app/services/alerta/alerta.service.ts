import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

/**
 * Service Class in charge of presenting some visual feedback to user
 * like modals or toasts.
 * @category Services
 */
@Injectable({
  providedIn: 'root',
})
export class AlertaService {
  private loading: HTMLIonLoadingElement;
  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    public alertController: AlertController
  ) {}

  /**
   * Present a dark toast from the top of the screen
   * @param {string} message Message to show whithin the toast
   * @param {number=} duration [Optional] If set, set the duration (in ms) the toast remain on
   * the screen, default is 2000 ms
   */
  async presentToast(message: string, duration?: number) {
    const toast = await this.toastController.create({
      message,
      duration: duration || 2000,
      position: 'top',
      color: 'dark',
    });
    await toast.present();
  }

  /**
   * Present a Loading modal on screen blocking the background.
   * This modal will be on the screen until you call {@link AlertaService#dismissLoading}
   * @param {string} message The message to show within the loading modal
   */
  async presentLoading(message: string) {
    if (this.loading) {
      this.loading.dismiss();
    }
    this.loading = await this.loadingController.create({
      message,
    });
    await this.loading.present();
  }

  /**
   * If a Loading modal is on the screen, it will dimsmiss it.
   * The modals presented on screen by {@link AlertaService#presentLoading} will remain
   * on screen until you call dismissLoading()
   */
  async dismissLoading() {
    if (this.loading) {
      await this.loading.dismiss();
    }
  }

  /*async confirmationAlert(mensaje,OkHandler: Function) {
    const alert = await this.alertController.create({
      cssClass: '',
      header: 'Confirmacion',
      message: mensaje,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: async () => {
            await OkHandler();
          },
        },
      ],
    });

    await alert.present();

    
  }*/
}
