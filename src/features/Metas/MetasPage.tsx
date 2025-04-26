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
  <div className="flex flex-col m-auto justify-center items-center gap-5">
    <label className="flex flex-col mb-4 mx-auto justify-center items-center gap-3">
      EMPRESA
      <Select onValueChange={(value) => buscarSucursal(value as string)}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Seleccione una empresa" />
        </SelectTrigger>
        <SelectContent>
          {empresas?.map((empresa) => (
            <SelectItem key={empresa._id} value={empresa._id}  >
              {empresa.nombre}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 space-y-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center">Registro de Metas</h2>
      <div className="grid grid-cols-1 gap-4">
        <label className="flex flex-col">
          Montura + Gafa
          <input type="number" {...register("monturaMasGafa", { required: true, valueAsNumber: true })} className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" />
        </label>
        <label className="flex flex-col">
          Lente de Contacto
          <input type="number" {...register("lenteDeContacto", { required: true, valueAsNumber: true })} className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" />
        </label>
        <label className="flex flex-col">
          Sucursales
          <select {...register("sucursal", { required: true })} className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200">
            {sucursales?.map((sucursal: Sucursal) => (
              <option key={sucursal._id} value={sucursal._id}>
                {sucursal.nombre}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg">Guardar</button>
    </form>
    <Table>
      <TableCaption className="p-2">
        <div className="flex justify-between">
          <p className="text-lg font-bold text-center uppercase">Lista de metas por sucursal</p>
          <Button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg" onClick={() => handleExport()}>Exportar</Button>
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
              <Button onClick={() => handleDelete(data.sucursal)} className="bg-red-600 text-white font-bold py-2 px-2 rounded-full"><X className="w-4 h-4" /></Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <Toaster position="top-right" />
  </div>
);
};
