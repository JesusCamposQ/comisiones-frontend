import { FC, useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table_detalle_comision"

import { ComisionReceta } from "../interfaces/comisiones.interface"
import { listarTipoPrecio } from "@/features/ComisionReceta/services/obtenerSinComsion"

type DetalleComisionProps = { comisiones: ComisionReceta[], id: string }

type TipoPrecio = {
    _id: string
    nombre: string
}

export const DetalleComision: FC<DetalleComisionProps> = ({ comisiones, id }) => {
    const [comisionesCompletas, setComisionesCompletas] = useState<ComisionReceta[]>([])

    useEffect(() => {
        precios()
    }, [])

    const precios = async () => {
        try {
            const response = await listarTipoPrecio(id) 
            const combinadas = response.map((tipo: TipoPrecio) => {
                const comisionEncontrada = comisiones.find(c => c.precio === tipo.nombre)
                return {
                    _id: comisionEncontrada?._id || tipo._id,
                    precio: tipo.nombre,
                    monto: comisionEncontrada?.monto || 0
                }
            })
            setComisionesCompletas(combinadas)
        } catch (error) {
            console.error("Error al obtener los tipos de precio:", error)
        }
    }

    return (
        <div className="bg-zinc-50 rounded-2xl shadow-lg p-4">
            <h2 className="text-lg font-bold mb-4 text-center uppercase">Comisiones por Recetas</h2>
            <Table className="overflow-x-auto">
                <TableCaption className="sr-only">Lista de comisiones por recetas</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead className="text-left uppercase">Tipo Precio</TableHead>
                        <TableHead className="text-right uppercase">Comisión</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {comisiones.map((comision) => (
                        <TableRow key={comision._id} className="border-t">
                            <TableCell className="font-medium">
                                <span className="inline-block w-full uppercase text-left">{comision.precio}</span>
                            </TableCell>
                            <TableCell className="text-right">Bs. {comision.monto.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
