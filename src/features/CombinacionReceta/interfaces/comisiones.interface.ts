export interface Combinacion {
    data:    Datum[] | null;
    paginas: number;
}

export interface Datum {
    _id:            string;
    codigo:         string;
    comisionReceta: any[];
    material:       string;
    tipoLente:      string;
    rango:          string;
    colorLente:     string;
    marcaLente:     string;
    tratamiento:    string;
    tipoColorLente: string;
    precios:        Precio[];
}

export interface Precio {
    _id:    string;
    nombre: string;
    monto:  number;
    __v:    number;
}
