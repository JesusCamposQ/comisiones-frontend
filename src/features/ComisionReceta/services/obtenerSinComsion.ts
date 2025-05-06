import api from "@/app/service/api";
import { Combinacion } from "@/features/CombinacionReceta/interfaces/comisiones.interface";

const obtenerSinComsion = async (limite: number, pagina: number): Promise<Combinacion> => {
    const response = await api.get("/api/combinacion/receta/sinComision", {
      params: {
        limite,
        pagina
      }
    });
    return response.data;
  };
export default obtenerSinComsion;
