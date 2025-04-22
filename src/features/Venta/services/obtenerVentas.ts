import api from "@/app/service/api";
import { Venta } from "../interfaces/venta.interface";

const obtenerVentas = async ():Promise<Venta[]> => {
  const response = await api.get("/api/venta")
  return response.data;
};

export default obtenerVentas;