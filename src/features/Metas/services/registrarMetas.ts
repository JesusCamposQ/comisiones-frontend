import api from "@/app/service/api";
import { Datum, Metas } from "../interfaces/metas.interface";

const registrarMetas = async (data: any) => {
  console.log("Esta es la Data: "+data)
  try{
    const response = await api.post("/api/metas/producto/vip", 
      data
    );
    return response.data;
  }catch(error){
    console.log(error)
  }
};
 

export default registrarMetas;