import api from "@/app/service/api";
import { IComisionRecetaData } from "@/features/ComisionReceta/interfaces/comisionReceta.interface";

const registrarComisionReceta = async (comisionReceta: IComisionRecetaData) => {
  try {
    const response = await api.post("/api/comision/receta", comisionReceta);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export default registrarComisionReceta;
