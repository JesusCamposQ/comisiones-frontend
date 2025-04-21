import api from "@/app/service/api";
import { Comision } from "../interfaces/comisiones.interface";

const obtenerCombinacionReceta = async (): Promise<Comision[]> => {
  const response = await api.get("/api/combinacion/receta").then(res=>{
    console.log(res.data);
    return res.data;
  })
  return response;
};

export default obtenerCombinacionReceta;	