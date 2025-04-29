import { Component } from '@angular/core';
import { ConfiguracionService } from '../services/configuracion.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  standalone: false,
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  nombreUsuario: string = '';
  temaOscuro: boolean = false;
  idioma: string = 'es';
  idiomasDisponibles = [
    { codigo: 'es', nombre: 'Español' },
    { codigo: 'en', nombre: 'English' }
  ];

  constructor(
    private configuracionService: ConfiguracionService,
    private translate: TranslateService
  ) {}

  async ionViewWillEnter() {
    await this.cargarConfiguracion();
  }

  private async cargarConfiguracion() {
    this.nombreUsuario = await this.configuracionService.obtenerNombreUsuario();
    this.temaOscuro = await this.configuracionService.obtenerTemaOscuro();
    this.idioma = await this.configuracionService.obtenerIdioma();
  }

  async guardarNombreUsuario() {
    await this.configuracionService.cambiarNombreUsuario(this.nombreUsuario);
  }

  async cambiarTema(event: any) {
    const activado = event.detail.checked;
    await this.configuracionService.cambiarTemaOscuro(activado);
  }

  async cambiarIdioma(event: any) {
    const idiomaSeleccionado = event.detail.value;
    await this.configuracionService.cambiarIdioma(idiomaSeleccionado);
  }
}