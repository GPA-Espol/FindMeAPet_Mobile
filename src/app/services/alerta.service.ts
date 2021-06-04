import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertaService {
  private loading: HTMLIonLoadingElement;
  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  async presentToast(message: string, duration?: number) {
    const toast = await this.toastController.create({
      message,
      duration: duration || 2000,
      position: 'top',
      color: 'dark',
    });
    await toast.present();
  }

  async presentLoading(message: string) {
    if (this.loading) {
      this.loading.dismiss();
    }
    this.loading = await this.loadingController.create({
      message,
    });
    await this.loading.present();
  }

  async dismissLoading() {
    await this.loading.dismiss();
  }
}
