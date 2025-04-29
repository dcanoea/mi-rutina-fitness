import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Rutina } from '../models/rutina.model';

@Injectable({
  providedIn: 'root'
})
export class RutinaService {
  private rutinas: Rutina[] = [];

  constructor() {
    this.cargarRutinas();
  }

  async agregarRutina(rutina: Rutina) {
    this.rutinas.push(rutina);
    await this.guardarRutinas();
  }

  async obtenerRutinas(): Promise<Rutina[]> {
    if (this.rutinas.length === 0) {
      await this.cargarRutinas();
    }
    return this.rutinas;
  }

  async marcarCompletado(id: string) {
    const rutina = this.rutinas.find(r => r.id === id);
    if (rutina) {
      rutina.completado = !rutina.completado;
      await this.guardarRutinas();
    }
  }

  async eliminarRutina(id: string) {
    this.rutinas = this.rutinas.filter(r => r.id !== id);
    await this.guardarRutinas();
  }

  private async guardarRutinas() {
    await Preferences.set({
      key: 'rutinas',
      value: JSON.stringify(this.rutinas)
    });
  }

  private async cargarRutinas() {
    const { value } = await Preferences.get({ key: 'rutinas' });
    if (value) {
      this.rutinas = JSON.parse(value).map((r: any) => new Rutina(
        r.id,
        r.nombre,
        r.repeticiones,
        r.completado,
        r.imagen
      ));
    }
  }
}