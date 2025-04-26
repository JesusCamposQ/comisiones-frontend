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
    <div className="w-[95%] m-2 p-4 bg-gray-100 rounded-md shadow-md">
      <Table>
        <TableCaption>Detalle de ventas del asesor</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID Venta</TableHead>
            <TableHead>Monto Total</TableHead>
            <TableHead>Descuento</TableHead>

            <TableHead>Detalles</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ventas.map((venta, index) => (
            <TableRow key={index}>
              <TableCell>{venta.idVenta}</TableCell>
              <TableCell>{venta.montoTotal}</TableCell>
              <TableCell>{venta.descuento}</TableCell>
              <TableCell>
                {venta.detalle && venta.detalle.length > 0 ? (
                  <table className="w-full text-sm border border-gray-300 rounded-md">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="px-2 py-1 text-left">Descripción</th>
                        <th className="px-2 py-1 text-left">Importe</th>
                        <th className="px-2 py-1 text-left">Comision</th>
                      </tr>
                    </thead>
                    <tbody>
                      {venta.detalle.map((item, i) => (
                        <tr key={i} className="border-t">
                          <td className="px-2 py-1">
                            {item.producto
                              ? `${item.producto.tipo} ${item.producto.marca}`
                              : item.combinacion
                              ? `${item.combinacion.material}/${item.combinacion.tipoLente}/${item.combinacion.tipoColorLente}/${item.combinacion.tratamiento}/${item.combinacion.rango}/${item.combinacion.marcaLente}/${item.combinacion.colorLente} `
                              : item.servicios?.tipo }
                          </td>
                          <td className="px-2 py-1">{item.importe}</td>
                          <td>{calcularComosion(item.comisiones,gafaVip, monturaVip,lenteDeContacto, metaProductosVip, empresa)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
