export interface Producto {
    data:    Datum[];
    paginas: number;
}

export interface Datum {
    _id:          string;
    codigoMia:    string;
    tipoProducto: string;
    serie:        string;
    categoria:    null;
    codigoQR:     string;
    marca:        string;
    color:        string;
    tipoPrecio?:   string;
    importe?: number;
    comisionProducto: ComisionProducto[];
}
export interface ComisionProducto {
    _id?: string;
    precio?: string;
    nombre?: string;
    monto?: number;
    producto?: string;
    diferencia?: number;
    comision?: number;
    __v?: number;
}
