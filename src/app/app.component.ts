import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfiguracionService } from './services/configuracion.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone:false,
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private translate: TranslateService,
    private configuracionService: ConfiguracionService
  ) {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
    this.configuracionService.obtenerTemaOscuro().then(tema => {
      document.body.classList.toggle('dark', tema);
    });
  }
}