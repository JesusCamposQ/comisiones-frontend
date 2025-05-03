import { v4 } from "uuid"
import obtenerCombinacionRecetaParaDescargar from "./obternerCombinacionesRecetaParaDescargar";
const descargarCombinacionReceta = async () => {

    try {
        const response = await obtenerCombinacionRecetaParaDescargar();
        console.log("response: ",response);
        const blob = response;
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${ v4() }.xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.log(error);
    }

}

export default descargarCombinacionReceta;
