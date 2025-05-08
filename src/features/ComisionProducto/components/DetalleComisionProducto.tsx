import { FC } from "react"
import { ComisionProducto } from "../interfaces/comsionProductoFiltro"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table_detalle_comision"

type DetalleComisionProps = { comisiones: ComisionProducto[] }
export const DetalleComisionProducto: FC<DetalleComisionProps> = ({ comisiones }) => {
  return (
    <div className="bg-zinc-50 rounded-2xl shadow-lg p-4">
    <h2 className="text-lg font-bold mb-4 text-center uppercase">Comisiones por Recetas</h2>
    <Table className="overflow-x-auto">
        <TableCaption className="sr-only">Lista de comisiones por recetas</TableCaption>
        <TableHeader>
            <TableRow className="bg-gray-100">
                <TableHead className="text-left uppercase">Tipo Precio</TableHead>
                <TableHead className="w-[100px] text-left uppercase">Tipo de comision</TableHead>
                <TableHead className="text-right uppercase">Comision</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {comisiones.map((comision) => (
                <TableRow key={comision._id} className="border-t">
                    <TableCell className="font-medium">
                        <span className="inline-block w-full uppercase text-left">{comision.precio}</span>
                    </TableCell>
                    <TableCell className="text-center">
                        {comision.nombre}
                    </TableCell>
                    <TableCell className="text-right">Bs. {comision.monto.toFixed(2)}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
</div>
  )
}
