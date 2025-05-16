import api from "@/app/service/api";
import { Metas } from "../interfaces/metas.interface";

export const registrarMetas = async (data: Metas) => {
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
 
export const obtenerMetas = async () => {
  try {
    const response = await api.get("/api/metas/producto/vip");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editarMetas = async (data: any) => {
  console.log("Esta es la Data: "+data)
  try{
    const response = await api.patch(`/api/metas/producto/vip/${data._id}`, 
      data
    );
    return response.data;
  }catch(error){
    console.log(error)
  }
};

export const eliminarMetas = async (id: string) => {
  console.log("Esta es la Data: "+id)
  try{
    const response = await api.delete(`/api/metas/producto/vip/${id}`);
    return response;
  }catch(error){
    console.log(error)
  }
};

