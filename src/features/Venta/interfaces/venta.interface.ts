export interface Venta {
  _id: string;
  metaProductosVip: MetaProductosVip | null;
  sucursal:         string;
  empresa:          string
  asesor:           string;
  gafaVip:          number;
  monturaVip:       number;
  lenteDeContacto:  number;
  montoTotal:        number;
  totalDescuento:     number;
  ventas:           VentaElement[];
}

export interface MetaProductosVip {
  _id:             string;
  monturaMasGafa:         number;
  lenteDeContacto: number;
  sucursal:        string;
  __v:             number;
}

export interface VentaElement {
  idVenta:       string;
  descuento:     number;
  montoTotal:    number;
  comisiona:     boolean;
  tipo:          string;
  tipo2:         string;
  tipoDescuento: string | null;
  detalle:       Detalle[];
}

export interface Detalle {
  producto?:    Producto;
  importe:      number;
  comisiones:   Comision[];
  combinacion?: Combinacion;
  servicios?:ServiciosI
}

export interface Combinacion {
  id:             string;
  descripcion:       string;
 
}

export interface Comision {
  id:     string;
  nombre: string;
  monto:  number;
  base:   boolean;
}

export interface Producto {
  id:        string;
  tipo:      string;
  marca:     string;
  categoria: string | null;
}

interface ServiciosI {
  id: string;
  tipo: string;

}


