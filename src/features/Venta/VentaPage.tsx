import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";

import {
  MetaProductosVip,
  Venta,
  VentaElement,
} from "./interfaces/venta.interface";
import obtenerVentas from "./services/obtenerVentas";
import { DetalleVenta } from "./components/DetalleVenta";
import { isArray } from "util";


const VentaPage = () => {
  const [expandedRowIndex, setExpandedRowIndex] = useState<number | null>(null);
  const { data: ventas, isLoading } = useQuery({
    queryKey: ["ventas"],
    queryFn: obtenerVentas,
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000 * 10,
  });


  
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

  const toggleDetalle = (index: number) => {
    setExpandedRowIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <Table className="w-[95%] m-2 p-2 rounded-md bg-white shadow-md">
      <TableCaption>Lista de ventas</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SUCURSAL</TableHead>
          <TableHead>ASESOR</TableHead>
          <TableHead>Importe Total</TableHead>
          <TableHead>Monto Total</TableHead>
          <TableHead>Descuento</TableHead>
          <TableHead>Total comisión</TableHead>
          <TableHead className="text-right">VENTAS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ventas?.map((venta: Venta, index: number) => (
          <>
            <TableRow key={index}>
              <TableCell className="font-medium">{venta.sucursal}</TableCell>
              <TableCell>{venta.asesor}</TableCell>
              <TableCell>{totalImporte(venta.ventas)}</TableCell>
              <TableCell>{venta.montoTotal}</TableCell>
              <TableCell>{venta.totalDescuento}</TableCell>
              <TableCell>
                {comisiones(
                  venta.ventas,
                  venta.gafaVip,
                  venta.monturaVip,
                  venta.lenteDeContacto,
                  venta.metaProductosVip,
                  venta.empresa
                )}
              </TableCell>
              <TableCell className="text-right">
                <button
                  className="text-blue-600 underline"
                  onClick={() => toggleDetalle(index)}
                >
                  {expandedRowIndex === index ? "Ocultar" : "Ver"}
                </button>
              </TableCell>
            </TableRow>
            {expandedRowIndex === index && (
              <TableRow>
                <TableCell colSpan={7}>
                  <DetalleVenta ventas={venta.ventas} 
                  metaProductosVip={venta.metaProductosVip} 
                    empresa={venta.empresa}
                    gafaVip={venta.gafaVip}
                    lenteDeContacto={venta.lenteDeContacto}
                    monturaVip={venta.monturaVip}
                  
                  />
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

      </TableFooter>
    </Table>
  );
};

export default VentaPage;


const comisiones = (
  ventas: VentaElement[],
  gafaVip: number,
  monturaVip: number,
  lenteDeContacto: number,
  metaProductosVip: MetaProductosVip | null,
  empresa: string
) => {
  let comisionProducto = 0;
  const productovip = gafaVip + monturaVip;


  for (const venta of ventas) {
    for (const detalle of venta.detalle) {
        if(Array.isArray(detalle.comisiones) && detalle.comisiones.length > 0){
         
        
            if (metaProductosVip && empresa == 'OPTICENTRO') {
              if (
                productovip >= metaProductosVip.monturaMasGafa &&
                lenteDeContacto >= metaProductosVip.lenteDeContacto
              ) {

                  const mayorMonto = detalle.comisiones.reduce((max, actual) => actual.monto > max.monto ? actual : max);
                  comisionProducto += mayorMonto.monto;
                
              } else {
                const menorMonto = detalle.comisiones.reduce((min, actual) => 
                  actual.monto < min.monto ? actual : min
                );
                  comisionProducto += menorMonto.monto;
                
              }
            } else {
               const mayorMonto = detalle.comisiones.reduce((max, actual) => actual.monto > max.monto ? actual : max);
                comisionProducto += mayorMonto.monto
              
            }
          
        }
    }
  }

  return comisionProducto;
};

const totalImporte = (ventas: VentaElement[]) => {
  let importe: number = 0;
  for (const venta of ventas) {
    for (const detalle of venta.detalle) {
      importe += detalle.importe;
    }
  }
  return importe;
};
