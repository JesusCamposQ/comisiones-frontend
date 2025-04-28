import api from "@/app/service/api";
import { Venta } from "../interfaces/venta.interface";
import { FiltroI } from "../interfaces/filtro.interface";

const obtenerVentas = async (filtro: FiltroI):Promise<Venta[]> => {
  console.log('api', filtro);
  try {
      
  const response = await api.post("/api/venta",filtro)
  return response.data;
  } catch (error) {
    console.log(error);
    
  }
};

export default obtenerVentas;