import { useEffect, useState } from "react";

import { BookPlus, Frown } from "lucide-react";
import { ComsionProductoFiltro } from "../interfaces/comsionProductoFiltro";
import { Datum } from "../interfaces/producto.interface";
import { FiltroComisionProducto } from "../components/FiltroComisionProducto";
import { ModalRegistroSinComisionProducto } from "../components/ModalRegistroSinComisionProducto";
import toast, { Toaster } from "react-hot-toast";
import { Banner } from "@/shared/components/Banner/Banner";
import { obtenerSinComisionProductoLenteContacto } from "../services/serviciosComisionProducto";
import { exportarExcelProducto } from "../utils/exportarExcelProducto";
import { FiltrarCombinacion } from "../hooks/FiltrarCombinacion";
import { useQuery } from "@tanstack/react-query";

interface FormValues {
  idcombinacion: string;
  codigo: string;
  tipoPrecio: string;
}

export const SinComisionLenteContactoPage = () => {
  const [filtro, setFiltro] = useState<ComsionProductoFiltro>({});
  const [actualizar, setActualizar] = useState(false);
  const [isDownload, setIsDownload] = useState(false);
  const [open, setOpen] = useState(false);
  const [filtrarCombinacion, setFiltrarCombinacion] = useState<Datum[]>([]);
  const [valor, setValor] = useState<FormValues>({
    idcombinacion: "",
    codigo: "",
    tipoPrecio: "",
  });
  const [page, setPage] = useState(1);
  const itemsPerPage = 10; // Número de elementos por página

  const {
    data: combinacionProducto,
    isLoading,
    refetch,
  } = useQuery<Datum[]>({
    queryKey: ["combinacion-sin-comision-producto-lente-contacto", page],
    queryFn: () => obtenerSinComisionProductoLenteContacto(),
    staleTime: 60 * 1000 * 10, // 10 minutos
  });

  useEffect(() => {
    setTimeout(() => {
      if (actualizar) {
        toast.success("Comisiones actualizadas exitosamente");
      }
      setActualizar(false);
    }, 100);
  }, [actualizar]);
  useEffect(() => {
    refetch();
  }, [filtro]);

  const agregarComision = (combinacion: Datum) => {
    const descripcion = `${combinacion.tipoProducto} / ${combinacion.serie} / ${combinacion.codigoQR} / ${combinacion.marca} / ${combinacion.color}`;
    setOpen(true);
    setValor({ idcombinacion: combinacion._id!, codigo: descripcion, tipoPrecio: combinacion.tipoPrecio || "" });
  };

  const descargar = async () => {
    setIsDownload(true);
    if (!combinacionProducto) return;
    await exportarExcelProducto(combinacionProducto);
    setIsDownload(false);
  };
  const combinaciones: Datum[] = combinacionProducto || [];
  FiltrarCombinacion({ combinaciones, filtro, setFiltrarCombinacion, setPage }); 
  // Calcular datos paginados
  const totalPages = Math.ceil(filtrarCombinacion.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const datosPaginados = filtrarCombinacion.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="mx-auto flex flex-col gap-4">
      <Toaster />
      <Banner
        title="Registro Sin Comision"
        subtitle="Lente Contacto"
        handleDownload={descargar}
        isDownload={isDownload}
      />
      <FiltroComisionProducto setFiltro={setFiltro} />
      <p className="mx-2 text-xs text-gray-500 dark:text-gray-400">
        Mostrando <span className="font-medium">{datosPaginados.length}</span> de <span className="font-medium">{filtrarCombinacion.length}</span> registros
      </p>

      {isLoading ? (
        <div className="flex items-center justify-center h-[600px] m-auto">
          <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-blue-500 mr-2"></div>
          <span className="text-blue-500 text-2xl">Cargando...</span>
        </div>
      ) : (
        <>
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 uppercase">Codigo MIA</th>
                <th className="px-6 py-3 uppercase">Tipo Producto</th>
                <th className="px-6 py-3 uppercase">Serie</th>
                <th className="px-6 py-3 uppercase">Codigo QR</th>
                <th className="px-6 py-3 uppercase">Marca</th>
                <th className="px-6 py-3 uppercase">Color</th>
                <th className="px-6 py-3 uppercase">Tipo Precio</th>
                <th className="px-6 py-3 uppercase">Importe</th>
                <th className="px-6 py-3 uppercase">Seleccionar</th>
              </tr>
            </thead>
            <tbody>
              {filtrarCombinacion && ( filtrarCombinacion.map((combinacion: Datum,index: number) => (
                <tr key={combinacion._id+index} className="border-b border-gray-200">
                  <td className="px-6 py-4 text-xs">{combinacion.codigoMia}</td>
                  <td className="px-6 py-4 text-xs">
                    {combinacion.tipoProducto}
                  </td>
                  <td className="px-6 py-4 text-xs">{combinacion.serie}</td>
                  <td className="px-6 py-4 text-xs">{combinacion.codigoQR}</td>
                  <td className="px-6 py-4 text-xs">{combinacion.marca}</td>
                  <td className="px-6 py-4 text-xs">{combinacion.color}</td>
                  <td className="px-6 py-4 text-xs">{combinacion.tipoPrecio}</td>
                  <td className="px-6 py-4 text-xs">{combinacion.importe}</td>
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
              )))} 
            </tbody>
          </table>

          {/* Paginación mejorada */}
          {filtrarCombinacion.length > 0 && (
            <div className="flex justify-center items-center gap-4 my-4">
              <nav className="flex items-center justify-center gap-2">
                <button
                  className="px-3 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handlePreviousPage}
                  disabled={page <= 1}
                >
                  Anterior
                </button>
                <span className="px-3 py-2 text-sm">
                  Página {page} de {totalPages}
                </span>
                <button
                  className="px-3 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleNextPage}
                  disabled={page >= totalPages}
                >
                  Siguiente
                </button>
              </nav>
            </div>
          )}

          {/* Mensaje cuando no hay datos */}
          {filtrarCombinacion.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center py-8 gap-4">
              <Frown className="w-12 h-12 text-gray-500" />
              <p className="text-center text-gray-500 font-semibold">
                No se encontraron registros con los filtros aplicados
              </p>
            </div>
          )}
        </>
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
