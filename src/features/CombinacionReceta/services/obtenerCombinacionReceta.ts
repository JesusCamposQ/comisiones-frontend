import api from "@/app/service/api";
import { Combinacion } from "../interfaces/comisiones.interface";

const obtenerCombinacionReceta = async (limite: number, pagina: number): Promise<Combinacion> => {
  const response = await api.get("/api/combinacion/receta", {
    params: {
      limite,
      pagina
    }
  });
  return response.data;
};

export default obtenerCombinacionReceta;