import { useEffect, useState } from "react";
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

import {
  MetaProductosVip,
  Venta,
  VentaElement,
} from "./interfaces/venta.interface";
import obtenerVentas from "./services/obtenerVentas";
import { DetalleVenta } from "./components/DetalleVenta";
import { FiltroI } from "./interfaces/filtro.interface";
import { formatDate } from "@/shared/utils/formatDate";
import FiltroOC from "@/shared/components/Filtro/FiltroOC";
import { calcularComisionTotal, descontarPorcentajeAcomision, porcentaje, totalImporte } from "./utils/ventaUtils";

const VentaPage = () => {
  const [ventas, setVentas]=useState<Venta[]>([])
  const [comision, setComision]=useState(0)
  const [isLoading, setIsloading]=useState<boolean>(false)
  const [filtro, setFiltro] = useState<FiltroI>({
    empresa: '',
    sucursal: [],
    fechaInicio: formatDate(new Date().toLocaleDateString()),
    fechaFin: formatDate(new Date().toLocaleDateString()),
    sucursales: [],
    tipoVenta: [],
  });
  const [expandedRowIndex, setExpandedRowIndex] = useState<number | null>(null);

  useEffect(()=>{
     fetch()
     console.log('filtro: ',filtro);
  },[filtro])

  const fetch =  async()=>{
    try {
      setIsloading(true)
      const { empresa, sucursales, ...rest } = filtro;
      const response = await obtenerVentas(rest)
      setVentas(response)
      
     
      setIsloading(false)
    } catch (error) {
      setIsloading(false)
      console.log(error);
    
    }
   }
  

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
    <>
      <FiltroOC setFiltros={setFiltro} initialFilters={filtro} />
      <Table className="w-[95%] m-auto p-2 rounded-md bg-white shadow-md">
        <TableCaption>Lista de ventas</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">SUCURSAL</TableHead>
            <TableHead>ASESOR</TableHead>
            <TableHead>Tickets</TableHead>
            <TableHead>Importe Total</TableHead>

            <TableHead>Descuento</TableHead>
           
            <TableHead>Gran Total</TableHead>
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
                <TableCell>{venta.ventas.length}</TableCell>
                <TableCell>{totalImporte(venta.ventas)}</TableCell>
                <TableCell>{venta.totalDescuento}</TableCell>
                <TableCell>{venta.montoTotal}</TableCell>
        
                <TableCell>
                 {calcularComisionTotal(venta.ventas, venta.metaProductosVip, venta.gafaVip,venta.monturaVip, venta.lenteDeContacto, venta.empresa).toFixed(2)}
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
    </>
  );
};

export default VentaPage;





