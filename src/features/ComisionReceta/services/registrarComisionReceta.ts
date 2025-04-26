import api from "@/app/service/api";
import { IComisionRecetaData } from "@/features/ComisionReceta/interfaces/comisionReceta.interface";

const registrarComisionReceta = async (comisionReceta: IComisionRecetaData) => {
  const response = await api.post("/api/comision/receta", comisionReceta);
  console.log(response.status);
  return response.data;
};
export default registrarComisionReceta;
