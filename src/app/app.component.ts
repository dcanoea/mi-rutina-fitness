import { Component } from '@angular/core';
import { ConfiguracionService } from './services/configuracion.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: false,
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private configuracionService: ConfiguracionService) {
    this.inicializarConfiguracion();
  }

  private async inicializarConfiguracion() {
    // Esto carga la configuración y aplica el tema e idioma guardados
    await this.configuracionService.obtenerTemaOscuro();
    await this.configuracionService.obtenerIdioma();
  }
}