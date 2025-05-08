export interface ComsionProductoFiltro {
  _id?: string;
  codigoMia?: string;
  tipoProducto?: string;
  serie?: string;
  categoria?: string | null;
  codigoQR?: string;
  comisionProducto?: ComisionProducto[];
  marca?: string;
  color?: string;
}

export interface ComisionProducto {
  _id?: string;
  precio?: string;
  nombre?: string;
  monto?: number;
  producto?: string;
  diferencia?: number;
  comision?: number;
}
  
