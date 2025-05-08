import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Combinacion, Datum } from "@/features/CombinacionReceta/interfaces/comisiones.interface";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import obtenerSinComsion from "../services/obtenerSinComsion";
import { useForm, SubmitHandler } from "react-hook-form";
import { ComsionRecetaFiltro } from "../interfaces/comsionRecetaFiltro";
import { Glasses } from "lucide-react";
import { IComisionReceta } from "../interfaces/comisionReceta.interface";
import obtenerTipoPrecio from "../services/obtenerTipoPrecio";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormValues {
    idcombinacion: string;
    codigo: string;
}

interface ModalProps {
    valor: FormValues;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}
interface TipoPrecio {
    id: string
    nombre: string
}

export function ModalRegistroSinComision({ valor, open, setOpen }: ModalProps) {
    const [filtro, setFiltro] = useState<ComsionRecetaFiltro>({})
    const [tipoPrecio, setTipoPrecio] = useState<string>("")
    const [page, setPage] = useState(1);

    const { data: tipoPrecioData, isLoading} = useQuery<TipoPrecio[]>({
        queryKey: ['tipo-precio', valor.idcombinacion],
        queryFn: () => obtenerTipoPrecio(valor.idcombinacion),
        staleTime: 60 * 1000 * 10, // 10 minutos
    })

    const { register, handleSubmit, reset } = useForm<IComisionReceta>({
        mode: "onChange",
        defaultValues: {
            nombre: "",
            precio: "",
            monto: 0,
            combinacionReceta: ""
        }
    });
    const onSubmit = (data: IComisionReceta) => {

        data.combinacionReceta = valor.idcombinacion
        data.precio = tipoPrecio
        console.log(data)
        setOpen(false)
        setFiltro({})
        reset()
    };


    const handleTipoPrecioChange = (value: string) => {
        setTipoPrecio((prev) => value)
    }

    return (
        isLoading ? (
            <div className="flex items-center justify-center h-[600px] m-auto">
                <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-blue-500 mr-2"></div>
                <span className="text-blue-500 text-2xl">Cargando...</span>
            </div>
        ) : (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">Combinaciones</Button>
                </DialogTrigger>
                <DialogContent className="w-[1200px] h-[800px]">
                    <DialogHeader>
                        <DialogTitle className="uppercase">Formulario Combinacion</DialogTitle>
                        <DialogDescription className="border-b p-2">
                            <h2 className="flex items-center justify-center gap-2 text-sm text-blue-600">< Glasses /> {valor.codigo}</h2>

                        </DialogDescription>
                    </DialogHeader>
                    <form className="mt-12 w-1/3 mx-auto space-y-6" onSubmit={handleSubmit(onSubmit)}>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 text-left" htmlFor="password">
                                Tipo de Precio
                            </label>
                            <select {...register("precio")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Seleccione un tipo de precio</option>
                                {tipoPrecioData?.map((tipoPrecio: TipoPrecio) => (
                                    <option key={tipoPrecio.id} value={tipoPrecio.nombre}>
                                        {tipoPrecio.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="block m-2 text-sm font-medium text-gray-700 text-left" htmlFor="password">
                                Monto
                            </label>
                            <input
                                type="number"
                                {...register("monto", {
                                    required: true,
                                    valueAsNumber: true
                                })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-12"
                                placeholder="Monto de comision"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                                Agregar comision
                            </button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        )
    )
}