import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { BookPlus, FileDown, Sparkles } from "lucide-react";
import { ComsionProductoFiltro } from "../interfaces/comsionProductoFiltro";
import obtenerSinComsionProducto, {
  descargarSinComisionProducto,
} from "../services/obtenerSinComsionProducto";
import { Datum, Producto } from "../interfaces/producto.interface";
import { FiltroComisionProducto } from "../components/FiltroComisionProducto";
import { ModalRegistroSinComisionProducto } from "../components/ModalRegistroSinComisionProducto";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";

interface FormValues {
  idcombinacion: string;
  codigo: string;
}

export const RegistroSinComisionProducto = () => {
  const [filtro, setFiltro] = useState<ComsionProductoFiltro>({});
  const [actualizar, setActualizar] = useState(false);
  const [open, setOpen] = useState(false);
  const [valor, setValor] = useState<FormValues>({
    idcombinacion: "",
    codigo: "",
  });
  const [page, setPage] = useState(1);
  const {
    data: combinacionProducto,
    isLoading,
    refetch,
  } = useQuery<Producto>({
    queryKey: ["combinacion-sin-comision-producto", page],
    queryFn: () => obtenerSinComsionProducto(10, page, filtro),
    staleTime: 60 * 1000 * 10, // 10 minutos
  });
  useEffect(() => {
    setTimeout(() => {
      if (actualizar) {
        toast.success("Comisiones actualizadas exitosamente");
        refetch();
      }
      setActualizar(false);
    }, 100);
  }, [actualizar]);
  useEffect(() => {
    refetch();
  }, [filtro]);

  const agregarComision = (combinacion: Datum) => {
    const descripcion = `${combinacion.tipoProducto} / ${combinacion.serie} / ${combinacion.categoria} / ${combinacion.codigoQR} / ${combinacion.marca} / ${combinacion.color}`;
    setOpen(true);
    setValor({ idcombinacion: combinacion._id!, codigo: descripcion });
  };

  const combinaciones: Datum[] = combinacionProducto?.data || [];
  return (
    <div className="mx-auto flex flex-col gap-4">
      <Toaster />
      <div className="flex justify-center items-center gap-4 p-4">
        <div className="text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">
              Productos
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Registro Sin Comision
          </h1>
        </div>
        <Button
          className="cursor-pointer group relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-out transform hover:scale-105 px-8 py-4 min-w-[200px]"
          type="button"
          onClick={() => descargarSinComisionProducto()}
        >
          {/* Efecto de brillo en hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

          <div className="relative flex items-center justify-center gap-3">
            <FileDown className="w-5 h-5 group-hover:animate-bounce" />
            <span className="font-semibold text-base">Descargar</span>
          </div>
        </Button>
      </div>
      <FiltroComisionProducto setFiltro={setFiltro} />
      {isLoading ? (
        <div className="flex items-center justify-center h-[600px] m-auto">
          <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-blue-500 mr-2"></div>
          <span className="text-blue-500 text-2xl">Cargando...</span>
        </div>
      ) : (
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 uppercase">Tipo Producto</th>
              <th className="px-6 py-3 uppercase">Serie</th>
              <th className="px-6 py-3 uppercase">Codigo QR</th>
              <th className="px-6 py-3 uppercase">Marca</th>
              <th className="px-6 py-3 uppercase">Color</th>
              <th className="px-6 py-3 uppercase">Seleccionar</th>
            </tr>
          </thead>
          <tbody>
            {combinaciones.map((combinacion: Datum) => (
              <tr key={combinacion._id} className="border-b border-gray-200">
                <td className="px-6 py-4 text-xs">
                  {combinacion.tipoProducto}
                </td>
                <td className="px-6 py-4 text-xs">{combinacion.serie}</td>
                <td className="px-6 py-4 text-xs">{combinacion.codigoQR}</td>
                <td className="px-6 py-4 text-xs">{combinacion.marca}</td>
                <td className="px-6 py-4 text-xs">{combinacion.color}</td>
                <td className="px-6 py-4 text-xs">
                  <button
                    className="px-4 py-2 flex items-center gap-2 bg-green-500 hover:bg-green-700 text-white rounded-md shadow-md cursor-pointer"
                    type="button"
                    onClick={() => agregarComision(combinacion)}
                  >
                    <BookPlus />
                    Agregar Comision
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <div className="flex justify-center items-center gap-4">
              <div className="flex items-center justify-center my-4">
                <nav className="flex items-center justify-center gap-1">
                  <button
                    className="px-2 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => setPage(page - 1)}
                    disabled={page <= 1 || !combinacionProducto?.paginas}
                  >
                    Anterior
                  </button>
                  <span className="px-2 text-sm">
                    Página {page} de {combinacionProducto?.paginas || 0}
                  </span>
                  <button
                    className="px-2 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => setPage(page + 1)}
                    disabled={
                      page >= (combinacionProducto?.paginas || 1) ||
                      !combinacionProducto?.paginas
                    }
                  >
                    Siguiente
                  </button>
                </nav>
              </div>
            </div>
          </tfoot>
        </table>
      )}
      <ModalRegistroSinComisionProducto
        valor={valor}
        setOpen={setOpen}
        open={open}
        setActualizar={setActualizar}
      />
    </div>
  );
};
