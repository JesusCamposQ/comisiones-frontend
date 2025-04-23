import api from "@/app/service/api";
import { Datum } from "../interfaces/metas.interface";

const registrarMetas = async (data: Datum[]): Promise<Datum[]> => {
  const response = await api.post("/api/metas/producto/vip", {
    data
  });
  return response.data;
};

export default registrarMetas;