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

const VentaPage = () => {
  const [page, setPage] = useState(1);
  const { data: ventas, isLoading } = useQuery({
    queryKey: ["ventas"],
    queryFn: obtenerVentas,
  });

  if (isLoading) {
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
          <TableHead>Importe Total</TableHead>
          <TableHead>Monto Total</TableHead>
          <TableHead>Descuento</TableHead>
          <TableHead>Total comision</TableHead>
          <TableHead className="text-right">VENTAS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ventas?.map((venta: Venta, index: number) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{venta.sucursal}</TableCell>
            <TableCell>{venta.asesor}</TableCell>
            <TableCell>{importeImporte(venta.ventas)}</TableCell>
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
              <button>Ver</button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
        <div className="flex items-center justify-center">
          <button
            className="px-4 py-2 bg-gray-200 rounded-md ml-2"
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 bg-gray-200 rounded-md ml-2"
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </TableFooter>
    </Table>
  );
};

export default VentaPage;

const detalletventa = (
  venta: VentaElement[],
 
) => {};

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
      for (const comision of detalle.comisiones) {
        if (metaProductosVip && empresa =='OPTICENTRO') {
          if (
            productovip >= metaProductosVip.monturaMasGafa &&
            lenteDeContacto >= metaProductosVip.lenteDeContacto
          ) {
            if (comision.base) {
              comisionProducto += comision.monto;
            }
          } else {
            if (comision.base == false) {
              comisionProducto += comision.monto;
            }
          }
        }else {
          if(comision.base){
            comisionProducto += comision.monto
          }
        }
      }
    }
  }

  return comisionProducto;
};

const importeImporte = (ventas: VentaElement[]) => {
  let importe: number = 0;
  for (const venta of ventas) {
    for (const detalle of venta.detalle) {
      importe += detalle.importe;
    }
  }
  return importe;
};
