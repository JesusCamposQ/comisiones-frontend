import api from "@/app/service/api";
import { Producto } from "../interfaces/producto.interface";
import { ComsionProductoFiltro } from "../interfaces/comsionProductoFiltro";

const obtenerSinComsionProducto = async (limite: number, pagina: number, filtro?: ComsionProductoFiltro): Promise<Producto> => {
  try {
    const response = await api.get("/api/producto/sinComision", {
      params: {
        limite,
        pagina,
        tipoProducto: filtro?.tipoProducto?.toUpperCase(),
        serie: filtro?.serie?.toUpperCase(),
        codigoQr: filtro?.codigoQr?.toUpperCase(),
        marca: filtro?.marca?.toUpperCase(),
        color: filtro?.color?.toUpperCase()
      }
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export default obtenerSinComsionProducto;
