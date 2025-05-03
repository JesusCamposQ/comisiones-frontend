import api from "@/app/service/api";
import { Producto } from "../interfaces/producto.interface";

const obtenerComisionProducto = async (limite: number, pagina: number): Promise<Producto> => {
  const response = await api.get("/api/producto", {
    params: {
      limite,
      pagina
    }
  });
  return response.data;
};

export default obtenerComisionProducto;