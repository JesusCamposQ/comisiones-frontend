import api from "@/app/service/api";

const obtenerCombinacionRecetaParaDescargar = async ()=> {
    try {
        const response = await api.get("/api/combinacion/receta/descargar");
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export default obtenerCombinacionRecetaParaDescargar;