export class Rutina {
  constructor(
    public id: string,
    public nombre: string,
    public repeticiones: number,
    public completado: boolean,
    public imagen?: string
  ) {}
}