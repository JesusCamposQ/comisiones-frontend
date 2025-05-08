import api from "@/app/service/api";
import { Producto } from "../interfaces/producto.interface";
import { ComsionProductoFiltro } from "../interfaces/comsionProductoFiltro";

const obtenerSinComsion = async (limite: number, pagina: number, filtro?: ComsionProductoFiltro): Promise<Producto> => {
  try {
    const response = await api.get("/api/producto/sinComision", {
      params: {
        limite,
        pagina,
        tipoProducto: filtro?.tipoProducto,
        serie: filtro?.serie,
        categoria: filtro?.categoria,
        codigoQR: filtro?.codigoQR,
        marca: filtro?.marca,
        color: filtro?.color
      }
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export default obtenerSinComsion;
