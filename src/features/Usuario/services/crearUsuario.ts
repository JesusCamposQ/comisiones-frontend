import { Usuario } from "../interfaces/usuario.interface";
import api from "@/app/service/api";

export const crearUsuario = async (usuario: Usuario) => {
    try {
        const resultado = await api.post("api/usuario", usuario);
        return resultado;
    } catch (error) {
        console.log(error);
    }
}
    
