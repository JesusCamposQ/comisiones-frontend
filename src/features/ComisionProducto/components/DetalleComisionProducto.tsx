import { Dispatch, FC, SetStateAction, useState } from "react"
import { ComisionProducto } from "../interfaces/comsionProductoFiltro"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table_detalle_comision"
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { ModalEditar } from "@/shared/components/ModalEditar";
import toast, { Toaster } from "react-hot-toast"
import { eliminarComisionProducto } from "../services/serviciosComisionProducto";


interface DetalleComisionProps {
    comisiones: ComisionProducto[];
    setUpdate: Dispatch<SetStateAction<boolean>>
}
interface ValorProps {
    idComision: string;
    monto: number;
    precio: string;
}


export const DetalleComisionProducto: FC<DetalleComisionProps> = ({ comisiones, setUpdate }) => {
    const comisionesActuales = comisiones.filter((comision) => comision.flag != "eliminado")
    const [openModalEditar, setOpenModalEditar] = useState(false)
    const [valor, setValor] = useState<ValorProps>({
        idComision: "",
        monto: 0,
        precio: ""
    })
    const handleDelete = async (id: string) => {
        const response = await eliminarComisionProducto(id)
        if (response.status === 200) {
            toast.success("Comision eliminada correctamente")
            setUpdate(prev => !prev)
            return
        }
        toast.error("Error al eliminar la comision")
    }

    const handleUpdate = (id: string) => {
        const comision = comisionesActuales.find((comision) => comision._id === id)
        if (comision) {
            setValor({
                idComision: comision._id || "",
                monto: comision.monto || 0,
                precio: comision.precio || ""
            })
            setOpenModalEditar(true)
        }
    }
    return (
        <div className="bg-zinc-50 rounded-2xl shadow-lg p-4">
            <Toaster position="top-center" reverseOrder={false} />
            {comisionesActuales.length === 0 ? (
                <p className="text-center text-gray-500 text-sm">No hay comisiones</p>
            ) : (
            <>
            <h2 className="text-lg font-bold mb-4 text-center uppercase">Comisiones por Producto</h2>
            <Table className="overflow-x-auto">
                <TableCaption className="sr-only">Lista de comisiones por producto</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead className="text-left uppercase">Tipo Precio</TableHead>
                        <TableHead className="w-[100px] text-left uppercase">Tipo de comision</TableHead>
                        <TableHead className="text-right uppercase">Comision</TableHead>
                        <TableHead className="text-center uppercase">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {comisionesActuales.map((comision) => (
                        <TableRow key={comision._id} className="border-t">
                            <TableCell className="font-medium">
                                <span className="inline-block w-full uppercase text-left">{comision.precio}</span>
                            </TableCell>
                            <TableCell className="text-center">
                                {comision.nombre}
                            </TableCell>
                            <TableCell className="text-right">Bs. {comision.monto?.toFixed(2)}</TableCell>
                            <TableCell className="text-right">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleUpdate(comision._id || "")}
                                    className="text-green-500 hover:bg-green-500 hover:text-white"
                                >
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleDelete(comision._id || "")}
                                    className="text-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {openModalEditar && (
                <ModalEditar
                    open={openModalEditar}
                    setOpen={setOpenModalEditar}
                    setActualizar={setUpdate}
                    valor={valor}
                />
            )}
            </>
            )}
        </div>
    )
}
