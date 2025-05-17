import { TableBody, TableRow, TableCell } from "@/components/ui/table"
import { Datum } from "@/features/ComisionReceta/interfaces/comisionReceta.interface"

export const TableCombinacion = ({combinacion}: {combinacion: Datum[]}) => {
  return (
    <TableBody>
    {combinacion.map((combinacion:Datum) => (
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
  )
}
