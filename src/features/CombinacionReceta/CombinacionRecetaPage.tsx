import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table"



import obtenerCombinacionReceta from './services/obtenerCombinacionReceta';
import { useQuery } from '@tanstack/react-query';
import { useState } from "react";
import { ComisionReceta, Datum } from "./interfaces/comisiones.interface";
import { DetalleComision } from "./components/DetalleComision";
import { Button } from "@/components/ui/button";
import descargarCombinacionReceta from "./services/descargaCombinacionReceta";

const CombinacionRecetaPage = () => {
  const [page, setPage] = useState(1);
  const [showDetalle, setShowDetalle] = useState<string | null>(null);
  const { data: combinacionReceta, isLoading } = useQuery({
    queryKey: ['combinacion-receta', page],
    queryFn: () => obtenerCombinacionReceta(20, page),
    staleTime: 60 * 1000 * 10,
  })
  const combinacion: Datum[] = combinacionReceta?.data || [];
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-blue-500 mr-2"></div>
        <span className="text-blue-500 text-2xl">Cargando...</span>
      </div>
    );
  }
  return (
    <>
    <Button onClick={descargarCombinacionReceta}>Descargar</Button>
    <Table className="w-[95%] m-auto p-2 rounded-md bg-white shadow-md">
      <TableCaption>Combinación de recetas</TableCaption>
      <TableHeader className="bg-blue-100">
        <TableRow>
          <TableHead className="w-[100px]">TIPO LENTE</TableHead>
          <TableHead>MATERIAL</TableHead>
          <TableHead>TRATAMIENTO</TableHead>
          <TableHead>MARCA</TableHead>
          <TableHead>TIPO COLOR LENTE</TableHead>
          <TableHead>RANGOS</TableHead>
          <TableHead>COLOR</TableHead>
          <TableHead>TIPO LENTE</TableHead>
          <TableHead className="text-center">DETALLE COMISION</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {combinacion.map((combinacion: Datum) => (
          <>
            <TableRow key={combinacion._id} className="border-b-indigo-100 hover:bg-indigo-50">
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
                <TableCell colSpan={3} />
                <TableCell colSpan={3} className="text-center mx-auto" >
                  <DetalleComision key={combinacion._id} comisiones={combinacion.comisionReceta as ComisionReceta[] || []} />
                </TableCell>
                <TableCell colSpan={3} />
              </TableRow>
            )}
          </>

))}
      </TableBody>
      <TableFooter className="border-t-blue-400">
        <TableRow className="bg-blue-50 hover:bg-indigo-50">
          <TableCell className="w-full flex items-center justify-center">
            <nav className="flex items-center justify-center gap-2" aria-label="Pagination">
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md shadow-md" onClick={() => setPage(page - 1)} disabled={page <= 1}>Anterior</button>
              <span className="px-2">
                Página {page} de {combinacionReceta?.paginas}
              </span>
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md shadow-md" onClick={() => setPage(page + 1)} disabled={page >= (combinacionReceta?.paginas || 0)}>Siguiente</button>
            </nav>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
</>
  );
};

export default CombinacionRecetaPage;
