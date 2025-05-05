import api from "@/app/service/api";
import { Producto } from "../interfaces/producto.interface";

const obtenerComisionProducto = async (limite: number, pagina: number): Promise<Producto> => {

  try {
    const response = await api.get("/api/producto", {
      params: {
        limite,
        pagina
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener la combinación de receta:", error);
    throw error;
  }
};

export default obtenerComisionProducto;