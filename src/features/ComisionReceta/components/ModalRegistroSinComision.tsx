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
import { IComisionReceta, IComisionRecetaData } from "../interfaces/comisionReceta.interface";
import obtenerTipoPrecio from "../services/obtenerTipoPrecio";
import registrarComisionReceta from "../services/registrarComisionReceta";
import toast, { Toaster } from "react-hot-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table_detalle_comision";


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

export function ModalRegistroSinComision({ valor, open, setOpen, setActualizar }: ModalProps) {
  const [comisiones, setComisiones] = useState<IComisionReceta[]>([])
  const [tipoPrecio, setTipoPrecio] = useState<string>("")

  const { data: tipoPrecioData, isLoading } = useQuery<TipoPrecio[]>({
    queryKey: ['tipo-precio', valor.idcombinacion],
    queryFn: () => obtenerTipoPrecio(valor.idcombinacion),
    staleTime: 60 * 1000 * 10, // 10 minutos
  })

  const { register, handleSubmit, reset, formState: { errors }} = useForm<IComisionReceta>({
    mode: "onChange",
    defaultValues: {
      precio: "",
      monto: 0,
    }
  });


  const onSubmit: SubmitHandler<IComisionReceta> = (data) => {
    if (valor.codigo === "") {
      toast.error("Debe agregar una combinacion");
      return;
    }
    data.monto = Number(data.monto);
    const existe = comisiones.filter((comision) => comision.precio === data.precio).length >= 2
    if (existe) {
      return toast.error("Solo se pueden agregar 2 comisiones por tipo de precio")
    }
    setComisiones((prev) => [...prev, data]);
  }

  const eliminarComision = (index: number) => {
    const filteredComisiones = comisiones.filter((_, i) => i !== index);
    setComisiones(filteredComisiones);
  }
  const registrarComision = async () => {
    const { precio, monto } = comisiones[0]
    const dataCombinacion: IComisionRecetaData = {
      combinacionReceta: valor.idcombinacion,
      data: [{ precio, monto, nombre: tipoPrecio }]
    }
    console.log("Data Combinacion: ", dataCombinacion)
    const { status } = await registrarComisionReceta(dataCombinacion)
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
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      limpiarComisiones();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange} >
      <DialogContent className="w-full h-full max-w-[750px] max-h-[600px] md:w-[750px] md:h-[550px] m-auto ">
        <DialogHeader>
          <DialogTitle className="uppercase text-center text-sm">Formulario Combinacion</DialogTitle>
          <DialogDescription className="border-b p-2">
            <p className="flex items-center justify-center gap-2 text-[12px] text-blue-600">< Glasses /> {valor.codigo}</p>

          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="flex items-center justify-center h-[600px] m-auto">
            <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-blue-500 mr-2"></div>
            <span className="text-blue-500 text-2xl">Cargando...</span>
          </div>
        ) : (
          <form className=" w-2/3 mx-auto space-y-2" onSubmit={handleSubmit(onSubmit)}>

            <div>
              <label className="block text-sm font-medium text-gray-700 text-left text-[12px] mb-1" htmlFor="password">
                Tipo de Precio
              </label>
              <select {...register("precio", { required:"Debe seleccionar un tipo de precio" })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                             focus:ring-blue-500 focus:border-blue-500 block w-full p-2 text-[12px] dark:bg-gray-700 dark:border-gray-600
                              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected disabled>Seleccione un tipo de precio</option>
                {tipoPrecioData?.map((tipoPrecio: TipoPrecio) => (
                  <option key={tipoPrecio.id} value={tipoPrecio.nombre}>
                    {tipoPrecio.nombre}
                  </option>
                ))}
              </select>
              {errors.precio && <p className="text-red-500 text-xs mt-1">{errors.precio.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 text-left text-[12px] mb-1" htmlFor="password">
                Monto
              </label>
              <input
                type="number"
                {...register("monto", {
                  required: "El monto debe ser mayor a cero",
                  min: 0.01,
                  pattern: {
                    value: /^[0-9]*\.?[0-9]+$/,
                    message: "El monto debe ser mayor a cero"
                  }
                })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500
                                 focus:ring-indigo-500 sm:text-sm h-[38px] text-[12px] dark:text-white dark:bg-gray-700 dark:border-gray-600
                                  dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 p-2"
                placeholder="Monto de comision"
              />
              {errors.monto && <p className="text-red-500 text-xs mt-1">{errors.monto?.message}</p>}
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
        <div className="mx-auto w-2/3 flex flex-col">
          <p className="text-md font-bold mb-2 text-center uppercase">Comisiones listadas</p>
          <div className="overflow-y-auto max-h-[150px]">
            <Table className="rounded-md shadow-md">
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="w-1/4 text-center uppercase text-[12px]">Tipo Precio</TableHead>
                  <TableHead className="w-1/4 text-center uppercase text-[12px]">Comision</TableHead>
                  <TableHead className="w-1/4 text-center uppercase text-[12px]">Monto</TableHead>
                  <TableHead className="w-1/4 text-center uppercase text-[12px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comisiones.map((comision, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="text-center text-[12px]">{comision.precio}</TableCell>
                    <TableCell className="text-center text-[12px] uppercase">{`comision ${index + 1}`}</TableCell>
                    <TableCell className="text-center text-[12px]">Bs. {comision.monto?.toFixed(2)}</TableCell>
                    <TableCell className="flex items-center justify-center">
                      <Button
                        type="button"
                        className="flex items-center justify-center rounded-md bg-red-500 
                        px-2 py-1 text-xs font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
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
          </div>
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