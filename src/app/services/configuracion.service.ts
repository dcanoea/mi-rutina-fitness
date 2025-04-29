import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {
  private configuracion = {
    nombreUsuario: 'Usuario',
    temaOscuro: false
  };

  constructor() {
    this.cargarConfiguracion();
  }

  async obtenerNombreUsuario(): Promise<string> {
    await this.cargarConfiguracion();
    return this.configuracion.nombreUsuario;
  }

  async obtenerTemaOscuro(): Promise<boolean> {
    await this.cargarConfiguracion();
    return this.configuracion.temaOscuro;
  }

  async cambiarNombreUsuario(nombre: string) {
    this.configuracion.nombreUsuario = nombre;
    await this.guardarConfiguracion();
  }

  async cambiarTemaOscuro(tema: boolean) {
    this.configuracion.temaOscuro = tema;
    await this.guardarConfiguracion();
    this.aplicarTema();
  }

  private async cargarConfiguracion() {
    const { value } = await Preferences.get({ key: 'configuracion' });
    if (value) {
      this.configuracion = JSON.parse(value);
      this.aplicarTema();
    }
  }

  private async guardarConfiguracion() {
    await Preferences.set({
      key: 'configuracion',
      value: JSON.stringify(this.configuracion)
    });
  }

  private aplicarTema() {
    document.body.classList.toggle('dark', this.configuracion.temaOscuro);
  }
}