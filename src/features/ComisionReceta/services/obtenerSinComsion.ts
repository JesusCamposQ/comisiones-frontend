import api from "@/app/service/api";
import { CombinacionResponse } from "../interfaces/comisionReceta.interface";
import { ComsionRecetaFiltro } from "../interfaces/comsionRecetaFiltro";

const obtenerSinComsion = async (limite: number, pagina: number, filtro?: ComsionRecetaFiltro): Promise<CombinacionResponse | undefined> => {
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

export const descargarSinComision = async () => {
  try {
    const response = await api.get("/api/combinacion/receta/descargar/sinComision", {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "combinaciones_sin_comision.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

