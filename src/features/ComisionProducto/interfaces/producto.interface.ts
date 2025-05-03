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
}
