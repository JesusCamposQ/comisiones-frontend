import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Glasses, Plus, Trash2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table_detalle_comision";
import { IComisionProducto, IComisionProductoData } from "../interfaces/comisionProducto.interface";
import registrarComisionProducto from "../services/registrarComisionProducto";
import obtenerTipoPrecioProducto from "../services/obtenerTipoPrecioProducto";

interface FormValues {
    idcombinacion: string;
    codigo: string;
}

interface ModalProps {
    valor: FormValues;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    setActualizar: Dispatch<SetStateAction<boolean>>;
}
interface TipoPrecio {
    id: string
    nombre: string
}

export function ModalRegistroSinComisionProducto({ valor, open, setOpen, setActualizar }: ModalProps) {
    const [comisiones, setComisiones] = useState<IComisionProducto[]>([])
    const [tipoPrecio, setTipoPrecio] = useState<string>("")

    const { data: tipoPrecioData, isLoading } = useQuery<TipoPrecio[]>({
        queryKey: ['tipo-precio-producto', valor.idcombinacion],
        queryFn: () => obtenerTipoPrecioProducto(valor.idcombinacion),
        staleTime: 60 * 1000 * 10, // 10 minutos
    })

    const { register, handleSubmit, reset } = useForm<IComisionProducto>({
        mode: "onChange",
        defaultValues: {
            precio: "",
            monto: 0,
        }
    });
    const onSubmit: SubmitHandler<IComisionProducto> = (data) => {
        if (valor.codigo === "") {
          toast.error("Debe agregar una combinacion");
          return;
        }
        data.monto = Number(data.monto);
        const existe = comisiones.filter((comision) => comision.precio === data.precio).length >= 2
        if(existe){
            return toast.error("Solo se pueden agregar 2 comisiones por tipo de precio")
        }
        setComisiones((prev) => [...prev, data]);
      }
    
    /*const onSubmit = async (datos: IComisionReceta) => {
        const { precio, monto } = datos
        const dataCombinacion: IComisionRecetaData = {
            combinacionReceta: valor.idcombinacion,
            data: [{ precio, monto, }]
        }
        console.log(dataCombinacion)
        const { status } = await registrarComisionReceta(dataCombinacion)
        if (status === 200) {
            toast.success("Comision agregada exitosamente")
        }
        setOpen(false)
        setFiltro({})
        reset()
    };
    */
    const eliminarComision = (index: number) => {
        const filteredComisiones = comisiones.filter((_, i) => i !== index);
        setComisiones(filteredComisiones);
    }
    const registrarComision = async () => {
    const { precio, monto } = comisiones[0]
    const dataCombinacion: IComisionProductoData = {
      producto: valor.idcombinacion,
      data: [{ precio, monto, nombre: precio }]
    }
    console.log("Data Combinacion: ", dataCombinacion)
    const { status } = await registrarComisionProducto(dataCombinacion)
    if (status === 201) {
      toast.success("Comisiones registradas exitosamente");
      limpiarComisiones();
      setOpen(false)
      setActualizar(true)
    }
    console.log("Data Combinacion: ", dataCombinacion)
  }
   const limpiarComisiones = () => {
    setComisiones([]);
    reset();
  }

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent className="w-[1200px] h-[800px]">
                <DialogHeader>
                    <DialogTitle className="uppercase">Formulario Combinacion</DialogTitle>
                    <DialogDescription className="border-b p-2">
                        <h2 className="flex items-center justify-center gap-2 text-sm text-blue-600">< Glasses /> {valor.codigo}</h2>

                    </DialogDescription>
                </DialogHeader>
                <Toaster />
                {isLoading ? (
                    <div className="flex items-center justify-center h-[600px] m-auto">
                        <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-blue-500 mr-2"></div>
                        <span className="text-blue-500 text-2xl">Cargando...</span>
                    </div>
                ) : (
                    <form className="mt-12 w-1/3 mx-auto space-y-6" onSubmit={handleSubmit(onSubmit)}>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 text-left" htmlFor="password">
                                Tipo de Precio
                            </label>
                            <select {...register("precio")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected disabled>Seleccione un tipo de precio</option>
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
                                className="flex w-full justify-center items-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                                <Plus className="mr-2 h-4 w-4" /> Listar comision
                            </button>
                        </div>
                    </form>  
                )}
                  <div className="m-auto w-2/3 flex flex-col">
        <p className="text-lg font-bold mb-4 text-center uppercase">Comisiones listadas</p>
        <Table className="rounded-md shadow-md">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="w-1/3 text-center">Tipo Precio</TableHead>
              <TableHead className="w-1/3 text-center">Comision</TableHead>
              <TableHead className="w-1/3 text-center">Monto</TableHead>
              <TableHead className="w-1/3 text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comisiones.map((comision, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="px-6 py-4 text-center">{comision.precio}</TableCell>
                <TableCell className="px-6 py-4 text-center">{`comision ${index + 1}`}</TableCell>
                <TableCell className="px-6 py-4 text-center">{comision.monto}</TableCell>
                <TableCell className="px-6 py-4 flex items-center justify-center">
                  <Button
                    type="button"
                    className="flex items-center justify-center rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    onClick={() => eliminarComision(index)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-end">
          <Button
            type="button"
            className="flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={registrarComision}
          >
            Registrar comisiones
          </Button>
        </div>
      </div>
            </DialogContent>
        </Dialog>
    )
}