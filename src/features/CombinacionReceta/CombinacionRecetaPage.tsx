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

const CombinacionRecetaPage = () => {
  const [page, setPage] = useState(1);
  const {data:combinacionReceta, isLoading} = useQuery({
    queryKey: ['combinacion-receta'],
    queryFn: obtenerCombinacionReceta,
  })
  if(isLoading){
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-blue-500 mr-2"></div>
        <span className="text-blue-500 text-2xl">Cargando...</span>
      </div>
    );
  }
  return (
      <Table className="w-[95%] m-2 p-2 rounded-md bg-white shadow-md">
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
          <TableHead className="text-right">TIPO LENTE</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {combinacionReceta?.slice((page - 1) * 10, page * 10).map((combinacion) => (
          <TableRow key={combinacion._id}>
            <TableCell className="font-medium">{combinacion.tipoLente}</TableCell>
            <TableCell>{combinacion.material}</TableCell>
            <TableCell>{combinacion.tratamiento}</TableCell>
            <TableCell>{combinacion.marcaLente}</TableCell>
            <TableCell>{combinacion.tipoColorLente}</TableCell>
            <TableCell>{combinacion.rango}</TableCell>
            <TableCell>{combinacion.colorLente}</TableCell>
            <TableCell className="text-right">{combinacion.tipoLente}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      <div className="flex items-center justify-center">
        <button className="px-4 py-2 bg-gray-200 rounded-md ml-2" onClick={() => setPage(page - 1)}>Previous</button>
        <button className="px-4 py-2 bg-gray-200 rounded-md ml-2" onClick={() => setPage(page + 1)}>Next</button>
      </div>
      </TableFooter>
    </Table>
  );
};
 
export default CombinacionRecetaPage;
