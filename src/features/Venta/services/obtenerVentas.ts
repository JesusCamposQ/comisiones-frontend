import api from "@/app/service/api";
import { Venta } from "../interfaces/venta.interface";
import { FiltroI } from "../interfaces/filtro.interface";

const obtenerVentas = async (filtro: FiltroI): Promise<Venta[]> => {
  console.log("filtro", JSON.stringify(filtro))
  try {
    const response = await api.post("/api/venta", filtro)
    return response.data;
  } catch (error) {
    throw error

  }
};

export default obtenerVentas;