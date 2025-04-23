import api from "@/app/service/api";
import { IComisionReceta } from "@/features/ComisionReceta/interfaces/comisionReceta.interface";

const registrarComisionReceta = async (comisionReceta: IComisionReceta) => {
  const response = await api.post("/api/comision/receta", comisionReceta);
  return response.data;
};
export default registrarComisionReceta;
