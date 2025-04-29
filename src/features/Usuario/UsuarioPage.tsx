import { Link } from "react-router"

export const UsuarioPage = () => {
  return (
    <div className="flex items-center justify-center">
    <h2 className="text-2xl font-bold">Registra un nuevo usuario</h2>
    <Link
      to="/usuarios/registro"
      className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
    >
      Registrate
    </Link>
  </div>
  )
}
