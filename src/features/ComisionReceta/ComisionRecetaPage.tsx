import { ModalRegistro } from "./components/ModalRegistro";
import { useForm, SubmitHandler } from "react-hook-form";
import { IComisionReceta } from "./interfaces/comisionReceta.interface";
import { useQueryClient } from "@tanstack/react-query";

const ComisionRecetaPage = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm<IComisionReceta>({
    mode: "onChange",
    defaultValues: {
      nombre: "",
      base: false,
      combinacionReceta: ""
    }
  });
  const onSubmit: SubmitHandler<IComisionReceta> = (data) => {
    const valor = queryClient.getQueryData<string[]>(["id_combinacion"])
    console.log(data)
    console.log(valor[0])
  };
  return (
    <>
    <div className="flex items-center justify-center">
      <h1 className="text-3xl">Registro de Comisiones</h1>
    </div>
    <form className="mt-12 w-1/3 mx-auto space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700 text-center" htmlFor="email">
          Nombre
        </label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-12"
          placeholder="Nombre de comision"
          {...register("nombre")}
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 text-center" htmlFor="password">
          Monto
        </label>
        <input
          type="text"
          {...register("monto")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-12"
          placeholder="Monto de comision"
        />
      </div>
      <div className="space-y-2">
        <div className="flex flex-row gap-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register("base")}
              className="mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <span className="ml-2 text-sm">Base</span>
          </label>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex flex-row gap-2">
          <label className="flex items-center">
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-12"
              placeholder="Combinacion de receta"
            />
            <ModalRegistro/>
          </label>
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Registrar
        </button>
      </div>
    </form>
    </>
  );
};

export default ComisionRecetaPage;
