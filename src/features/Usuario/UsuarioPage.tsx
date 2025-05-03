import { Link } from "react-router"

export const UsuarioPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
    <h2 className="text-2xl font-bold">Registra un nuevo usuario</h2>
    <Link
      to="/usuarios/registro"
      className="ml-4 px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 transition duration-150 ease-in-out"
    >
      Registrate
    </Link>
  </div>
  )
}
