import { Dispatch, SetStateAction } from "react";

interface Props {
  filtrar: any[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  itemsPerPage?: number;
}

const Paginador = ({ filtrar, page, setPage, itemsPerPage = 10 }: Props) => {
const totalPages = Math.ceil(filtrar.length / itemsPerPage);
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
    <>
    {filtrar.length > 0 && (
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
    </>
  );
};

export default Paginador;