export interface Sucursal {
    id: string;
    nombre: string;
    empresa: string;
    fecha: Date;
    flag: flag;
}
enum flag {
    nuevo='nuevo',
    eliminado="eliminado"
}