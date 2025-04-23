import { useForm, SubmitHandler } from "react-hook-form"
import { Datum } from "./interfaces/metas.interface";
import registrarMetas from "./services/registrarMetas";


export const MetasPage = () => {
  const { register, handleSubmit } = useForm<Datum>()

  const onSubmit: SubmitHandler<Datum> = async (valores) => {
    const sucursales: string[] = valores.sucursal as string[] || [];
    const data: { data: Datum[] } = {
      data: sucursales.map((sucursal: string) => ({
        sucursal,
        monturaMasGafa: valores.monturaMasGafa as number,
        lenteDeContacto: valores.lenteDeContacto as number,
      })),
    };
    console.log(data);
    //await registrarMetas(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 space-y-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center">Registro de Metas</h2>
      <div className="grid grid-cols-1 gap-4">
        <label className="flex flex-col">
          Montura + Gafa
          <input type="number" {...register("monturaMasGafa")} className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" />
        </label>
        <label className="flex flex-col">
          Lente de Contacto
          <input type="number" {...register("lenteDeContacto")} className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" />
        </label>
        <label className="flex flex-col">
          Sucursales
          <select multiple {...register("sucursal", { value: [] })} className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" size={5}>
            <option value="La Plata">La Plata</option>
            <option value="Berazategui">Berazategui</option>
            <option value="Quilmes">Quilmes</option>
            <option value="Lanus">Lanus</option>
            <option value="Avellaneda">Avellaneda</option>
          </select>
        </label>
      </div>
      <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg">Guardar</button>
    </form>
  )
}
