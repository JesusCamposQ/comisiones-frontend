import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table_detalle_comision";
import { useQuery } from "@tanstack/react-query";

import { Datum, Metas } from "./interfaces/metas.interface";
import { obtenerEmpresas } from "../Empresa/services/obternerEmpresas";
import registrarMetas from "./services/registrarMetas";
import { obtenerSucursalByEmpresa } from "../Sucursal/services/obtenerSurcusal";
import { Sucursal } from "../Sucursal/interfaces/sucursal.interface";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {toast, Toaster } from "react-hot-toast";


export const MetasPage = () => {
  const [datos, setDatos] = useState<Datum[]>();
  const [sucursales, setSucursales] = useState<Sucursal[]>();
  const { register, handleSubmit } = useForm<Datum>()
  const { data: empresas } = useQuery({
    queryKey: ["empresas"],
    queryFn: obtenerEmpresas,
  });
  const buscarSucursal = async (empresaId: string) => {
    const sucursales = await obtenerSucursalByEmpresa(empresaId)
    setSucursales(sucursales)
  }
  const onSubmit: SubmitHandler<Datum> = async (valores) => {
    if (!sucursales?.length) return;
    const nombre_sucursal = sucursales?.filter((item) => item._id === valores.sucursal)
    const datos: Datum = {
      sucursal: valores.sucursal,
      nombre_sucursal: nombre_sucursal?.[0].nombre,
      monturaMasGafa: valores.monturaMasGafa,
      lenteDeContacto: valores.lenteDeContacto,
    }
    setDatos((prev) => prev?.length ? [...prev, datos] : [datos]);
    //await registrarMetas(data);
  }
  const handleDelete = (sucursal: string) => {
    if (!datos?.length) return;
    if (!sucursal) return;
    if (sucursal.length === 0) {
      setDatos([]);
      return;
    }
    const newData = datos.filter((dataValue) => dataValue.sucursal !== sucursal);
    setDatos(newData);
}

const handleExport = async () => {
  if(!datos?.length) return;
  const response: Metas = {
    data: datos.map((item: Datum) => {
      return {
        sucursal: item.sucursal,
        monturaMasGafa: Number(item.monturaMasGafa),
        lenteDeContacto: Number(item.lenteDeContacto)
      }
    })
  }
  try{
    await registrarMetas(response);
    toast.success("Metas registradas correctamente");
  } catch (error) {
    toast.error("Error al registrar metas");
  }
};
return (
  <div className="container mx-auto p-4 md:p-6 lg:p-12 space-y-6">
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-3xl font-bold leading-tight mb-4">Registro de Metas</h2>
      <p className="text-xl leading-relaxed">
        Registra las metas de cada sucursal.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-bold">Empresa</label>
          <Select
            onValueChange={(value) => buscarSucursal(value as string)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccione una empresa" />
            </SelectTrigger>
            <SelectContent className="shadow-lg">
              {empresas?.map((empresa) => (
                <SelectItem key={empresa._id} value={empresa._id}>
                  {empresa.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-bold">Sucursal</label>
          <select
            {...register("sucursal", { required: true })}
            className="mt-1 block w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          >
            {sucursales?.map((sucursal: Sucursal) => (
              <option key={sucursal._id} value={sucursal._id}>
                {sucursal.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-bold">Montura + Gafa</label>
          <input
            type="number"
            {...register("monturaMasGafa", { required: true, valueAsNumber: true })}
            className="mt-1 block w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-bold">Lente de Contacto</label>
          <input
            type="number"
            {...register("lenteDeContacto", { required: true, valueAsNumber: true })}
            className="mt-1 block w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600">
          Guardar
        </button>
      </form>
    </div>
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-3xl font-bold leading-tight mb-4">Lista de Metas</h2>
      <p className="text-xl leading-relaxed">
        Aqui puedes ver la lista de metas registradas para cada sucursal.
      </p>
      <Table>
        <TableCaption className="p-2">
          <div className="flex justify-between">
            <p className="text-lg font-bold text-center uppercase">Lista de metas por sucursal</p>
            <Button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg" onClick={() => handleExport()}>
              Exportar
            </Button>
          </div>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sucursal</TableHead>
            <TableHead>Montura + Gafa</TableHead>
            <TableHead>Lente de Contacto</TableHead>
            <TableHead className="w-[100px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {datos?.map((data: Datum) => (
            <TableRow key={data.sucursal}>
              <TableCell className="font-medium">{data.nombre_sucursal}</TableCell>
              <TableCell className="text-right">{data.monturaMasGafa}</TableCell>
              <TableCell className="text-right">{data.lenteDeContacto}</TableCell>
              <TableCell className="text-right">
                <Button onClick={() => handleDelete(data.sucursal)} className="bg-red-600 text-white font-bold py-2 px-2 rounded-full">
                  <X className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    <Toaster position="top-right" />
  </div>
);
};
