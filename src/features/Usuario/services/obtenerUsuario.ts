import { Usuario } from "../interfaces/usuario.interface";
import api from "@/app/service/api";

export const obtenerUsuario = async () : Promise<Usuario[]> => {
    try {
        const resultado = await api.get("api/usuario");
        return resultado.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}
    