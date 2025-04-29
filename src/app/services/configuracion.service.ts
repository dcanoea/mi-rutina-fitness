import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {
  private configuracion = {
    nombreUsuario: 'Usuario',
    temaOscuro: false,
    idioma: 'es'
  };

  constructor(
    private translate: TranslateService,
    private platform: Platform
  ) {
    this.inicializarConfiguracion();
  }

  private async inicializarConfiguracion() {
    await this.cargarConfiguracion();
    this.aplicarTema();
    this.aplicarIdioma();
  }

  // Métodos para el nombre de usuario
  async obtenerNombreUsuario(): Promise<string> {
    await this.cargarConfiguracion();
    return this.configuracion.nombreUsuario;
  }

  async cambiarNombreUsuario(nombre: string): Promise<void> {
    this.configuracion.nombreUsuario = nombre;
    await this.guardarConfiguracion();
  }

  // Métodos para el tema oscuro
  async obtenerTemaOscuro(): Promise<boolean> {
    await this.cargarConfiguracion();
    return this.configuracion.temaOscuro;
  }

  async cambiarTemaOscuro(activado: boolean): Promise<void> {
    this.configuracion.temaOscuro = activado;
    await this.guardarConfiguracion();
    this.aplicarTema();
  }

  // Métodos para el idioma
  async obtenerIdioma(): Promise<string> {
    await this.cargarConfiguracion();
    return this.configuracion.idioma;
  }

  async cambiarIdioma(idioma: string): Promise<void> {
    this.configuracion.idioma = idioma;
    await this.guardarConfiguracion();
    this.aplicarIdioma();
  }

  // Métodos privados
  private async cargarConfiguracion() {
    const { value } = await Preferences.get({ key: 'configuracion' });
    if (value) {
      this.configuracion = {
        ...this.configuracion, // Valores por defecto
        ...JSON.parse(value)   // Valores guardados
      };
    }
  }

  private async guardarConfiguracion() {
    await Preferences.set({
      key: 'configuracion',
      value: JSON.stringify(this.configuracion)
    });
  }

  private aplicarIdioma() {
    this.translate.use(this.configuracion.idioma);
  }

  // Método para resetear configuración
  async resetearConfiguracion(): Promise<void> {
    this.configuracion = {
      nombreUsuario: 'Usuario',
      temaOscuro: false,
      idioma: 'es'
    };
    await this.guardarConfiguracion();
    this.aplicarTema();
    this.aplicarIdioma();
  }

  private aplicarTema() {
    this.platform.ready().then(() => {
      const body = document.body;
      const html = document.documentElement;
      
      // Resetear clases
      body.classList.remove('dark', 'light');
      html.classList.remove('dark', 'light');
      
      if (this.configuracion.temaOscuro) {
        body.classList.add('dark');
        html.classList.add('dark');
        body.setAttribute('data-theme', 'dark');
        this.aplicarVariablesDark();
      } else {
        body.classList.add('light');
        html.classList.add('light');
        body.setAttribute('data-theme', 'light');
        this.aplicarVariablesLight();
      }
    });
  }
  
  private aplicarVariablesDark() {
    const root = document.documentElement;
    
    // Colores base
    root.style.setProperty('--ion-background-color', '#121212');
    root.style.setProperty('--ion-background-color-rgb', '18,18,18');
    
    // Textos
    root.style.setProperty('--ion-text-color', '#ffffff');
    root.style.setProperty('--ion-text-color-rgb', '255,255,255');
    root.style.setProperty('--ion-text-color-contrast', '#ffffff');
    
    // Componentes específicos
    root.style.setProperty('--ion-item-background', '#1e1e1e');
    root.style.setProperty('--ion-toolbar-background', '#1f1f1f');
    root.style.setProperty('--ion-card-background', '#1c1c1c');
    root.style.setProperty('--ion-border-color', '#222222');
  }
  
  private aplicarVariablesLight() {
    const root = document.documentElement;
    
    // Colores base
    root.style.setProperty('--ion-background-color', '#ffffff');
    root.style.setProperty('--ion-background-color-rgb', '255,255,255');
    
    // Textos
    root.style.setProperty('--ion-text-color', '#000000');
    root.style.setProperty('--ion-text-color-rgb', '0,0,0');
    root.style.setProperty('--ion-text-color-contrast', '#000000');
    
    // Componentes específicos
    root.style.setProperty('--ion-item-background', '#ffffff');
    root.style.setProperty('--ion-toolbar-background', '#f8f8f8');
    root.style.setProperty('--ion-card-background', '#ffffff');
    root.style.setProperty('--ion-border-color', '#c8c7cc');
  }
  
  private aplicarVariablesCSS() {
    const root = document.documentElement;
    
    if (this.configuracion.temaOscuro) {
      root.style.setProperty('--ion-background-color', '#121212');
      root.style.setProperty('--ion-text-color', '#ffffff');
      root.style.setProperty('--ion-toolbar-background', '#1a1a1a');
      root.style.setProperty('--ion-item-background', '#1e1e1e');
    } else {
      root.style.setProperty('--ion-background-color', '#ffffff');
      root.style.setProperty('--ion-text-color', '#000000');
      root.style.setProperty('--ion-toolbar-background', '#f8f8f8');
      root.style.setProperty('--ion-item-background', '#ffffff');
    }
  }
}