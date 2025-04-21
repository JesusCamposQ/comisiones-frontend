import { useState } from 'react';
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
import { useQuery } from '@tanstack/react-query';


import { Venta } from './interfaces/venta.interface';
import obtenerVentas from './services/obtenerVentas';
import { Link } from 'react-router';

const VentaPage = () => {
  const [page, setPage] = useState(1);
  const {data:ventas, isLoading} = useQuery({
    queryKey: ['ventas',],
    queryFn: obtenerVentas,
  })
  
  const obtenerVentasAsesores = (asesor: string): Venta[] => {
    return ventas?.filter((venta) => venta.asesor === asesor) || [];
  };
  const {data:ventasAsesores} = useQuery<Venta[]>({
    queryKey: ['ventasAsesores'],
    queryFn: () => obtenerVentasAsesores(''),
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
    <TableCaption>Lista de ventas</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">SUCURSAL</TableHead>
        <TableHead>ASESOR</TableHead>
        <TableHead>GAFAS VIP</TableHead>
        <TableHead>MONTURA VIP</TableHead>
        <TableHead>LENTE DE CONTACTO</TableHead>
        <TableHead className="text-right">VENTAS</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {ventas?.slice((page - 1) * 20, page * 20).map((venta: Venta, index:number) => (
        <TableRow key={index}>
          <TableCell className="font-medium">{venta.sucursal}</TableCell>
          <TableCell>{venta.asesor}</TableCell>
          <TableCell>{venta.gafaVip}</TableCell>
          <TableCell>{venta.monturaVip}</TableCell>
          <TableCell>{venta.lenteDeContacto}</TableCell>
          <TableCell className="text-right"><Link to={`/venta/${venta._id}`}>Ver</Link></TableCell>
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

export default VentaPage;
