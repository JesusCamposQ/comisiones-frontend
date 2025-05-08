export interface IComisionReceta {
  nombre?: string;
  precio?: string;
  monto?: number;
  combinacionReceta?: string;
}

export interface IComisionRecetaData {
  combinacionReceta: string
  data: IComisionReceta[];
}