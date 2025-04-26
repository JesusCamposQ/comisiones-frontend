export interface IComisionReceta {
  nombre: string;
  monto: number;
  base: boolean;
  combinacionReceta: string
}

export interface IComisionRecetaData {
  data: IComisionReceta[];
}