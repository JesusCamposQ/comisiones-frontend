import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Datum } from "@/features/CombinacionReceta/interfaces/comisiones.interface";
import obtenerCombinacionReceta from "@/features/CombinacionReceta/services/obtenerCombinacionReceta";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormValues {
  idcombinacion: string;
}
export function ModalRegistro() {
  const [valor, setValor] = useState('');
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient()
  const {data:combinacionReceta, isLoading} = useQuery({
    queryKey: ['combinacion-receta', page],
    queryFn: () => obtenerCombinacionReceta(10, page),
    staleTime: 60 * 1000 * 10,
  })
  const combinacion: Datum[] = combinacionReceta?.data || [];
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit = () => {
    setValor('');
    queryClient.setQueryData(['id_combinacion'], () => 
      [valor]
    )
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Combinaciones</Button>
      </DialogTrigger>
      <DialogContent className="w-[1200px] h-[800px]">
        <DialogHeader>
          <DialogTitle>Combinaciones</DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        {
          isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-blue-500 mr-2"></div>
              <span className="text-blue-500 text-2xl">Cargando...</span>
            </div>
          ) : (
            <div onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 divide-y divide-gray-200">
              {combinacion.map((combinacion:Datum) => (
                <div key={combinacion._id} className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                  <input
                    type="radio"
                    value={combinacion._id}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    {...register("idcombinacion", { required: true })}
                    onChange={() => setValor(combinacion._id)}
                  />
                  <div className="ml-3">
                    <p className="text-xs font-medium text-gray-900">
                      {combinacion.tipoLente}
                    </p>
                    <p className="text-xs text-gray-500">
                      {combinacion.material} {combinacion.tratamiento} {combinacion.marcaLente} {combinacion.tipoColorLente} {combinacion.rango} {combinacion.colorLente}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
          
        <DialogFooter className="flex justify-center">
          <Button type="button" onClick={onSubmit}>Seleccionar</Button>
        <div className="flex justify-center mt-4">
            <nav className="flex items-center justify-center gap-1">
              <button className="px-2 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded-md shadow-md" onClick={() => setPage(page - 1)} disabled={page <= 1}>Anterior</button>
              <span className="px-2 text-sm">
                Página {page} de {combinacionReceta?.paginas}
              </span>
              <button className="px-2 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded-md shadow-md" onClick={() => setPage(page + 1)} disabled={page >= Math.ceil((combinacionReceta?.paginas || 0) / 10)}>Siguiente</button>
            </nav>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
