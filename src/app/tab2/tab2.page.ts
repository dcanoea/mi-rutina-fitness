import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RutinaService } from '../services/rutina.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { LoadingController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Rutina } from '../models/rutina.model';

@Component({
  selector: 'app-tab2',
  standalone: false,
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  rutinaForm: FormGroup;
  imagen: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private rutinaService: RutinaService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private translate: TranslateService
  ) {
    this.rutinaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      repeticiones: ['', [Validators.required, Validators.min(1)]]
    });
  }

  async seleccionarImagen() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri
      });
      
      this.imagen = image.webPath;
    } catch (error) {
      console.error('Error al seleccionar imagen:', error);
      const toast = await this.toastCtrl.create({
        message: this.translate.instant('ERROR'),
        duration: 2000,
        position: 'bottom'
      });
      await toast.present();
    }
  }

  async agregarRutina() {
    if (this.rutinaForm.invalid) return;

    const loading = await this.loadingCtrl.create({
      message: this.translate.instant('SAVING')
    });
    await loading.present();

    try {
      const nuevaRutina = new Rutina(
        Date.now().toString(),
        this.rutinaForm.value.nombre,
        this.rutinaForm.value.repeticiones,
        false,
        this.imagen
      );

      await this.rutinaService.agregarRutina(nuevaRutina);
      
      this.rutinaForm.reset();
      this.imagen = undefined;

      const toast = await this.toastCtrl.create({
        message: this.translate.instant('ROUTINE_ADDED'),
        duration: 2000,
        position: 'bottom'
      });
      await toast.present();
    } catch (error) {
      console.error('Error al guardar rutina:', error);
      const toast = await this.toastCtrl.create({
        message: this.translate.instant('ERROR'),
        duration: 2000,
        position: 'bottom'
      });
      await toast.present();
    } finally {
      await loading.dismiss();
    }
  }
}