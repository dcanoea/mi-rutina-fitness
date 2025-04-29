import { Component } from '@angular/core';
import { RutinaService } from '../services/rutina.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tab1',
  standalone: false,
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  rutinas: any[] = [];

  constructor(
    private rutinaService: RutinaService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private translate: TranslateService
  ) {}

  async ionViewWillEnter() {
    const loading = await this.loadingCtrl.create({
      message: this.translate.instant('LOADING')
    });
    await loading.present();
    
    this.rutinas = await this.rutinaService.obtenerRutinas();
    
    await loading.dismiss();
  }

  async marcarCompletado(id: string) {
    await this.rutinaService.marcarCompletado(id);
  }

  async eliminarRutina(id: string) {
    await this.rutinaService.eliminarRutina(id);
    this.rutinas = await this.rutinaService.obtenerRutinas();
    
    const toast = await this.toastCtrl.create({
      message: this.translate.instant('ROUTINE_DELETED'),
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}