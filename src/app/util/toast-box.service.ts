import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastBoxService {

  constructor(public toastController: ToastController) { }
  async presentToast(msg: any, msg2?: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top',

    });
    toast.present();
  }

}
