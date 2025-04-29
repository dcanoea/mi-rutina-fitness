import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {
  private configuracion = {
    nombreUsuario: 'Usuario',
    temaOscuro: false,
    idioma: 'es' // Valor por defecto
  };

  constructor(private translate: TranslateService) {
    this.cargarConfiguracion();
  }

  /**
   * Obtiene el nombre de usuario almacenado
   */
  async obtenerNombreUsuario(): Promise<string> {
    await this.cargarConfiguracion();
    return this.configuracion.nombreUsuario;
  }

  /**
   * Obtiene el estado del tema oscuro
   */
  async obtenerTemaOscuro(): Promise<boolean> {
    await this.cargarConfiguracion();
    return this.configuracion.temaOscuro;
  }

  /**
   * Obtiene el idioma actual configurado
   */
  async obtenerIdioma(): Promise<string> {
    await this.cargarConfiguracion();
    return this.configuracion.idioma;
  }

  /**
   * Cambia el nombre de usuario y lo guarda
   * @param nombre Nuevo nombre de usuario
   */
  async cambiarNombreUsuario(nombre: string): Promise<void> {
    this.configuracion.nombreUsuario = nombre;
    await this.guardarConfiguracion();
  }

  /**
   * Cambia el tema oscuro y lo guarda
   * @param tema Estado del tema oscuro (true/false)
   */
  async cambiarTemaOscuro(tema: boolean): Promise<void> {
    this.configuracion.temaOscuro = tema;
    await this.guardarConfiguracion();
    this.aplicarTema();
  }

  /**
   * Cambia el idioma y lo guarda
   * @param idioma Código del idioma (ej. 'es', 'en')
   */
  async cambiarIdioma(idioma: string): Promise<void> {
    this.configuracion.idioma = idioma;
    await this.guardarConfiguracion();
    this.aplicarIdioma();
  }

  /**
   * Carga la configuración desde el almacenamiento
   */
  private async cargarConfiguracion(): Promise<void> {
    const { value } = await Preferences.get({ key: 'configuracion' });
    if (value) {
      this.configuracion = {
        ...this.configuracion, // Valores por defecto
        ...JSON.parse(value)   // Valores guardados
      };
      this.aplicarTema();
      this.aplicarIdioma();
    }
  }

  /**
   * Guarda la configuración actual en el almacenamiento
   */
  private async guardarConfiguracion(): Promise<void> {
    await Preferences.set({
      key: 'configuracion',
      value: JSON.stringify(this.configuracion)
    });
  }

  /**
   * Aplica el tema oscuro/claro al documento
   */
  private aplicarTema(): void {
    document.body.classList.toggle('dark', this.configuracion.temaOscuro);
  }

  /**
   * Aplica el idioma seleccionado al traductor
   */
  private aplicarIdioma(): void {
    this.translate.use(this.configuracion.idioma);
  }

  /**
   * Resetea toda la configuración a valores por defecto
   */
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
}