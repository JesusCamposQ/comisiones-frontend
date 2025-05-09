import api from "@/app/service/api";
import { DataResponse } from "../interfaces/comisionServicio.interface";

const obtenerServicios = async (limite: number, pagina: number): Promise<DataResponse> => {
    try {
        const response = await api.get("/api/servicio", {
            params: {
                limite,
                pagina,
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export default obtenerServicios;
