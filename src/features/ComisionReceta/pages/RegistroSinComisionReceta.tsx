
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import obtenerSinComsion from "../services/obtenerSinComsion";
import { ComsionRecetaFiltro } from "../interfaces/comsionRecetaFiltro";
import { FiltroComision } from "../components/FiltroComision";
import { BookPlus } from "lucide-react";
import { ModalRegistroSinComision } from "../components/ModalRegistroSinComision";
import toast, { Toaster } from "react-hot-toast";
import { CombinacionResponse, Datum } from "../interfaces/comisionReceta.interface";

interface FormValues {
    idcombinacion: string;
    codigo: string;
}

export const RegistroSinComisionReceta = () => {
    const [filtro, setFiltro] = useState<ComsionRecetaFiltro>({})
    const [actualizar, setActualizar] = useState(false)
    const [open, setOpen] = useState(false)
    const [valor, setValor] = useState<FormValues>({ idcombinacion: '', codigo: '' })
    const [page, setPage] = useState(1);
    const { data: combinacionReceta, isLoading, refetch } = useQuery<CombinacionResponse>({
        queryKey: ['combinacion-receta', page],
        queryFn: () => obtenerSinComsion(10, page, filtro) as any,
        staleTime: 60 * 1000 * 10, // 10 minutos
    })
    useEffect(() => {
        setTimeout(() => {
            if(actualizar){
                toast.success("Comisiones actualizadas exitosamente")
                refetch()
            }
            setActualizar(false)
          }, 100)
      }, [actualizar])
      useEffect(() => {
        refetch()
      }, [filtro])
    
    const agregarComision = (combinacion:Datum) => {
        const descripcion = `${combinacion.tipoLente} / ${combinacion.material} / ${combinacion.tratamiento} / ${combinacion.marcaLente} / ${combinacion.tipoColorLente} / ${combinacion.rango} / ${combinacion.colorLente}`
        setOpen(true)
        setValor({ idcombinacion: combinacion._id!, codigo: descripcion });
      };

    const combinaciones: Datum[] = combinacionReceta?.data || [];
    return (
        <div className="mx-auto flex flex-col gap-4">
            <Toaster />
            <h1 className="text-2xl font-bold text-center text-blue-500 uppercase">Registro Sin Comision</h1>
            <FiltroComision setFiltro={setFiltro} />
        {isLoading ? (
            <div className="flex items-center justify-center h-[600px] m-auto">
              <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-blue-500 mr-2"></div>
              <span className="text-blue-500 text-2xl">Cargando...</span>
            </div>
        ) : (
        <table className="w-full text-left text-sm">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3">Tipo Lente</th>
                    <th className="px-6 py-3">Material</th>
                    <th className="px-6 py-3">Tratamiento</th>
                    <th className="px-6 py-3">Marca</th>
                    <th className="px-6 py-3">Tipo Color Lente</th>
                    <th className="px-6 py-3">Rango</th>
                    <th className="px-6 py-3">Color</th>
                    <th className="px-6 py-3">Action</th>
                </tr>
            </thead>
            <tbody>
                {combinaciones.map((combinacion: Datum) => (
                    <tr key={combinacion._id} className="border-b border-gray-200">
                        <td className="px-6 py-4 text-xs">{combinacion.tipoLente}</td>
                        <td className="px-6 py-4 text-xs">{combinacion.material}</td>
                        <td className="px-6 py-4 text-xs">{combinacion.tratamiento}</td>
                        <td className="px-6 py-4 text-xs">{combinacion.marcaLente}</td>
                        <td className="px-6 py-4 text-xs">{combinacion.tipoColorLente}</td>
                        <td className="px-6 py-4 text-xs">{combinacion.rango}</td>
                        <td className="px-6 py-4 text-xs">{combinacion.colorLente}</td>
                        <td className="px-6 py-4 text-xs">
                            <button className="px-4 py-2 flex items-center gap-2 bg-green-500 hover:bg-green-700 text-white rounded-md shadow-md" type="button" onClick={() => agregarComision(combinacion)}> <BookPlus />Agregar Comision</button>
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <div className="flex justify-center items-center gap-4">
                    <div className="flex items-center justify-center my-4">
                        <nav className="flex items-center justify-center gap-1">
                            <button className="px-2 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => setPage(page - 1)} disabled={page <= 1 || !combinacionReceta?.paginas}>Anterior</button>
                            <span className="px-2 text-sm">
                                Página {page} de {combinacionReceta?.paginas || 0}
                            </span>
                            <button className="px-2 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => setPage(page + 1)} disabled={page >= (combinacionReceta?.paginas || 1) || !combinacionReceta?.paginas}>Siguiente</button>
                        </nav>
                    </div>
                </div>
            </tfoot>
        </table>
        )}
        <div className="flex items-center justify-center">
            <ModalRegistroSinComision valor={valor} setOpen={setOpen} open={open} setActualizar={setActualizar} />
        </div>
        </div>
    )
}
