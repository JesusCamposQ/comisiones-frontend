import {
  Comision,
  MetaProductosVip,
  VentaElement,
} from "../interfaces/venta.interface";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const DetalleVenta = ({
  ventas,
  metaProductosVip,
  empresa,
  gafaVip,
  lenteDeContacto,
  monturaVip,
}: {
  ventas: VentaElement[];
  metaProductosVip: MetaProductosVip | null;
  gafaVip: number;
  monturaVip: number;
  lenteDeContacto: number;
  empresa: string;
}) => {
  return (
    <div className="w-[95%] m-auto p-4 my-4 bg-gray-50 rounded-lg shadow-md">
      <Table>
        <TableCaption>Detalle de ventas del asesor</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID Venta</TableHead>
            <TableHead>Tipo precio</TableHead>
            <TableHead className="text-right">Importe Total</TableHead>
            <TableHead className="text-right">Descuento</TableHead>
            <TableHead className="text-right">Gran total</TableHead>
            <TableHead className="text-center">Detalles</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ventas.map((venta, index) => (
            <TableRow key={index}>
              <TableCell>{venta.idVenta}</TableCell>
              <TableCell>{venta.precio}</TableCell>
              <TableCell className="text-right">{venta.detalle.reduce((acc ,item)=> acc + item.importe,0 )}</TableCell>
              <TableCell className="text-right">{venta.descuento}</TableCell>
              <TableCell className="text-right">{venta.montoTotal }</TableCell>
              <TableCell>
                {venta.detalle && venta.detalle.length > 0 ? (
                  <Table className="w-[95%] m-auto text-sm border border-gray-300 rounded-md bg-gray-100">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="px-2 py-1 text-left">Descripción</TableHead>
                        <TableHead className="px-2 py-1 text-right">Importe</TableHead>
                        <TableHead className="px-2 py-1 text-right">Comision</TableHead>
                        <TableHead className="px-2 py-1 text-right">Porcentaje</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {venta.detalle.map((item, i) => (
                        <TableRow key={i} className="border-t border-zinc-300">
                          <TableCell className="px-2 py-1">
                            {item.producto
                              ? `${item.producto.tipo} ${item.producto.marca}`
                              : item.combinacion
                              ? `${item.combinacion.descripcion} `
                              : item.servicios?.tipo }
                          </TableCell>
                          <TableCell className="px-2 py-1 text-right">{item.importe}</TableCell>
                          <TableCell className="px-4 py-1 text-right">{calcularComosion(item.comisiones,gafaVip, monturaVip,lenteDeContacto, metaProductosVip, empresa)}</TableCell>
                          <TableCell className="px-4 py-1 text-right">{(calcularComosion(item.comisiones,gafaVip, monturaVip,lenteDeContacto, metaProductosVip, empresa)*100/item.importe).toFixed(2)}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <span className="text-gray-500">Sin detalle</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const calcularComosion = (
  comisiones: Comision[],
  gafaVip: number,
  monturaVip: number,
  lenteDeContacto: number,
  metaProductosVip: MetaProductosVip | null,
  empresa: string
) => {
  const productovip = gafaVip + monturaVip;
  let  comisionProducto = 0;  
  if(Array.isArray(comisiones) && comisiones.length > 0){
      if (metaProductosVip && empresa == "OPTICENTRO") {
        if (
          productovip >= metaProductosVip.monturaMasGafa &&
          lenteDeContacto >= metaProductosVip.lenteDeContacto
        ) {
      
          
          const mayorMonto = comisiones.reduce((max, actual) => actual.monto > max.monto ? actual : max);
            comisionProducto += mayorMonto.monto;
          
        } else {
          const menorMonto = comisiones.reduce((min, actual) => 
            actual.monto < min.monto ? actual : min
          );
            comisionProducto += menorMonto.monto;
          
        }
      } else {
        const mayorMonto = comisiones.reduce((max, actual) => actual.monto > max.monto ? actual : max);
                comisionProducto += mayorMonto.monto
              
      }
    
  }
  return comisionProducto;
};
