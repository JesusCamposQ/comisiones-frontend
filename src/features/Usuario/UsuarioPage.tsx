import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table_detalle_comision"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router"
import { obtenerUsuario } from "./services/obtenerUsuario"
import { Button } from "@/components/ui/button"

export const UsuarioPage = () => {
  const {data:usuario, isLoading} = useQuery({
    queryKey: ['usuario'],
    queryFn: () => obtenerUsuario(),
    staleTime: 60 * 1000 * 10,
  })
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <h2 className="text-2xl font-bold">Registra un nuevo usuario</h2>
      <Link
        to="/usuarios/registro"
        className="ml-4 px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 transition duration-150 ease-in-out"
      >
        Registrate
      </Link>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombres</TableHead>
            <TableHead>Apellidos</TableHead>
            <TableHead>Rol</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usuario?.map((usuario) => (
            <TableRow key={usuario.id}>
              <TableCell>{usuario.nombre}</TableCell>
              <TableCell>{usuario.apellidos}</TableCell>
              <TableCell>{usuario.rol}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
