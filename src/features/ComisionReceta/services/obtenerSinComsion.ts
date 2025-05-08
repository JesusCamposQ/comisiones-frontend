import api from "@/app/service/api";
import { Combinacion } from "@/features/CombinacionReceta/interfaces/comisiones.interface";
import { ComsionRecetaFiltro } from "../interfaces/comsionRecetaFiltro";

const obtenerSinComsion = async (limite: number, pagina: number, filtro?: ComsionRecetaFiltro): Promise<Combinacion> => {
  try {
    const response = await api.get("/api/combinacion/receta/sinComision", {
      params: {
        limite,
        pagina,
        material: filtro?.material,
        tipoLente: filtro?.tipoLente,
        colorLente: filtro?.colorLente,
        marcaLente: filtro?.marcaLente,
        tratamiento: filtro?.tratamiento,
        tipoColorLente: filtro?.tipoColorLente,
        rango: filtro?.rango
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export default obtenerSinComsion;

export const listarTipoPrecio = async (combinacion:string) => {
  try {
    const response = await api.get(`/api/precios/combinacion/${combinacion}`)
    return response.data;
  } catch (error) {
    throw error;
  }
};