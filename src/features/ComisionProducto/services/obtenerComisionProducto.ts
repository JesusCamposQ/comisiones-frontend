import api from "@/app/service/api";
import { Producto } from "../interfaces/producto.interface";

const obtenerComisionProductoMontura = async (limite: number, pagina: number): Promise<Producto> => {

  try {
    const response = await api.get("/api/producto/montura", {
      params: {
        limite,
        pagina
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener la combinación de lente de montura:", error);
    throw error;
  }
};
const obtenerComisionProductoGafa = async (limite: number, pagina: number): Promise<Producto> => {

  try {
    const response = await api.get("/api/producto/gafa", {
      params: {
        limite,
        pagina
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener la combinación de gafa:", error);
    throw error;
  }
};
const obtenerComisionProductoLenteContacto = async (limite: number, pagina: number): Promise<Producto> => {

  try {
    const response = await api.get("/api/producto/lente/contacto", {
      params: {
        limite,
        pagina
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener la combinación de lente contacto:", error);
    throw error;
  }
};

export{
  obtenerComisionProductoMontura,
  obtenerComisionProductoGafa,
  obtenerComisionProductoLenteContacto
};