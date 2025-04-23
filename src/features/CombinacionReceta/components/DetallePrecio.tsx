import { FC } from "react"
import { Precio } from "../interfaces/comisiones.interface"

type DetalleVentaProps = { precios: Precio[] }

export const DetallePrecio: FC<DetalleVentaProps> = ({ precios }) => {
    return (
        <div className="bg-white rounded-md shadow-lg p-4">
            <h4 className="text-lg font-bold mb-2">Detalle de precio</h4>
            <ul className="list-disc list-inside">
                {precios.map((precio: Precio) => (
                    <li key={precio._id} className="flex items-center justify-between">
                        <span className="font-medium">{precio.nombre}</span>
                        <span className="text-right font-semibold">${precio.monto}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

