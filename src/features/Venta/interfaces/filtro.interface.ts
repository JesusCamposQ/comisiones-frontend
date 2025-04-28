import { Sucursal } from "@/features/Sucursal/interfaces/sucursal.interface";

export interface FiltroI{
    empresa?: string;
    sucursal: string[];
    fechaInicio: string; 
    fechaFin: string;  
    nombresSucursales?: string[];
}
export interface FiltroIWithSucursal{
    empresa?: string;
    sucursal: Sucursal[];
    fechaInicio: string; 
    fechaFin: string;  
}