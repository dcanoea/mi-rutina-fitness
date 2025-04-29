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

  constructor(
    private configuracionService: ConfiguracionService,
    private translate: TranslateService
  ) {}

  async ionViewWillEnter() {
    this.nombreUsuario = await this.configuracionService.obtenerNombreUsuario();
    this.temaOscuro = await this.configuracionService.obtenerTemaOscuro();
  }

  async guardarNombreUsuario() {
    await this.configuracionService.cambiarNombreUsuario(this.nombreUsuario);
  }

  async guardarTemaOscuro() {
    await this.configuracionService.cambiarTemaOscuro(this.temaOscuro);
  }
}