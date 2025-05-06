import api from "@/app/service/api";
import { CombinacionResponse, filtroCombinacionRecetaI } from "../interfaces/comisiones.interface";

const obtenerCombinacionReceta = async (limite: number, pagina: number, filter:filtroCombinacionRecetaI): Promise<CombinacionResponse> => {
  const response = await api.get("/api/combinacion/receta", {
    params: {
      limite,
      pagina,
      ...filter
    }
  });
  return response.data;
};

export default obtenerCombinacionReceta;