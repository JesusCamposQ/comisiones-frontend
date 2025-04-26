import { Sucursal } from "@/features/Sucursal/interfaces/sucursal.interface";

export interface Metas {
  data: Datum[];
}

export interface Datum {
  monturaMasGafa: number;
  lenteDeContacto: number;
  nombre_sucursal?: string;
  sucursal: string;
}
