export interface IComisionProducto {
  nombre: string;
  precio: string;
  monto: number;
  combinacionProducto?: string;
}

export interface IComisionProductoData {
  producto: string
  data: IComisionProducto[];
}