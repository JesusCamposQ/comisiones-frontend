import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


import obtenerCombinacionReceta from './services/obtenerCombinacionReceta';
import { useQuery } from '@tanstack/react-query';
import { useState } from "react";
import { Datum, Precio  } from "./interfaces/comisiones.interface";
import { DetallePrecio } from "./components/DetallePrecio";

const CombinacionRecetaPage = () => {
  const [page, setPage] = useState(1);
  const [showDetalle, setShowDetalle] = useState<string | null>(null);
  const {data:combinacionReceta, isLoading} = useQuery({
    queryKey: ['combinacion-receta', page],
    queryFn: () => obtenerCombinacionReceta(20, page),
    staleTime: 60 * 1000 * 10,
  })
  const combinacion: Datum[] = combinacionReceta?.data || [];
  if(isLoading){
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-blue-500 mr-2"></div>
        <span className="text-blue-500 text-2xl">Cargando...</span>
      </div>
    );
  }
  return (
      <Table className="w-[95%] m-5 p-2 rounded-md bg-white shadow-md">
      <TableCaption>Combinación de recetas</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">TIPO LENTE</TableHead>
          <TableHead>MATERIAL</TableHead>
          <TableHead>TRATAMIENTO</TableHead>
          <TableHead>MARCA</TableHead>
          <TableHead>TIPO COLOR LENTE</TableHead>
          <TableHead>RANGOS</TableHead>
          <TableHead>COLOR</TableHead>
          <TableHead>TIPO LENTE</TableHead>
          <TableHead className="text-center">DETALLE DE PRECIO</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {combinacion.map((combinacion:Datum) => (
          <>
          <TableRow key={combinacion._id}>
            <TableCell className="font-medium">{combinacion.tipoLente}</TableCell>
            <TableCell>{combinacion.material}</TableCell>
            <TableCell>{combinacion.tratamiento}</TableCell>
            <TableCell>{combinacion.marcaLente}</TableCell>
            <TableCell>{combinacion.tipoColorLente}</TableCell>
            <TableCell>{combinacion.rango}</TableCell>
            <TableCell>{combinacion.colorLente}</TableCell>
            <TableCell className="text-right">{combinacion.tipoLente}</TableCell>
            <TableCell className="text-center">
              <button type="button" className="text-blue-500 hover:text-blue-700 m-1" 
              onClick={() => 
                setShowDetalle(c => c !== combinacion._id ? combinacion._id : null)}>
                {showDetalle === combinacion._id ? 'Ocultar Detalle' : 'Mostrar Detalle'}
              </button>
            </TableCell>
          </TableRow>
          {showDetalle === combinacion._id && (
            <TableRow key={combinacion._id}>
            <TableCell colSpan={3} className="text-center mx-auto" >
              <DetallePrecio key={combinacion._id} precios={combinacion.precios as Precio[] || []} />
            </TableCell>
            </TableRow>
            )}
          </>
          
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      <nav className="flex items-center justify-center" aria-label="Pagination">
        <div className="flex items-center justify-center gap-2">
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md shadow-md" onClick={() => setPage(page - 1)} disabled={page <= 1}>Anterior</button>
          <span className="px-2">
            Página {page} de {combinacionReceta?.paginas}
          </span>
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md shadow-md" onClick={() => setPage(page + 1)} disabled={page >= Math.ceil((combinacionReceta?.paginas || 0) / 20)}>Siguiente</button>
        </div>
      </nav>
      </TableFooter>
    </Table>
  );
};
 
export default CombinacionRecetaPage;
