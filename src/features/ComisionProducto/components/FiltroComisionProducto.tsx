import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Dispatch, SetStateAction } from "react"
import { ComsionProductoFiltro } from "../interfaces/comsionProductoFiltro"

interface Props {
  setFiltro: Dispatch<SetStateAction<ComsionProductoFiltro>>
}

export const FiltroComisionProducto = ({ setFiltro }: Props) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFiltro((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    return (
        <Table className="w-full text-left text-sm">
            <TableBody>
                <TableRow>
                    <TableCell className="text-left m-0 p-2">
                        <input type="text" name="tipoProducto" placeholder="Tipo Producto" className="border rounded-md p-2 w-full hover:bg-amber-50 hover:text-black focus:outline-none hover:border-blue-200" onChange={onChange} />
                    </TableCell>
                    <TableCell className="text-left m-0 p-2">
                        <input type="text" name="serie" placeholder="Serie" className="border rounded-md p-2 w-full hover:bg-amber-50 hover:text-black focus:outline-none hover:border-blue-200" onChange={onChange} />
                    </TableCell>
                    <TableCell className="text-left m-0 p-2">
                        <input type="text" name="codigoQr" placeholder="Codigo QR" className="border rounded-md p-2 w-full hover:bg-amber-50 hover:text-black focus:outline-none hover:border-blue-200" onChange={onChange} />
                    </TableCell>
                    <TableCell className="text-left m-0 p-2">
                        <input type="text" name="marca" placeholder="Marca" className="border rounded-md p-2 w-full hover:bg-amber-50 hover:text-black focus:outline-none hover:border-blue-200" onChange={onChange} />
                    </TableCell>
                    <TableCell className="text-left m-0 p-2">
                        <input type="text" name="color" placeholder="Color" className="border rounded-md p-2 w-full hover:bg-amber-50 hover:text-black focus:outline-none hover:border-blue-200" onChange={onChange} />
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}
