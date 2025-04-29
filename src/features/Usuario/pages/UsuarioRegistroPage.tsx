
import { useState } from "react"
import { Ban, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { Usuario } from "../interfaces/usuario.interface";
import { crearUsuario } from "../services/crearUsuario";
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from "react-router";

export const UsuarioRegistroPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<Usuario>();
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = async (data: Usuario) => {
    try {
      const response = await crearUsuario(data);
      console.log(response);
      if(response?.status === 201){
        toast.success("Usuario creado exitosamente");
        setTimeout(() => {
            navigate("/usuarios");
        }, 1000);
      }
      else{
        toast.error("Error: " + response?.status);
      }
    } catch (error) {
      toast.error("Error al crear el usuario");
    }
  }
  return (
    <>
    <Toaster />
    <Card className="w-full max-w-md mx-auto">
    <CardHeader className="text-center space-y-1">
      <CardTitle className="text-2xl font-bold">Registro de usuario</CardTitle>
      <CardDescription>
        Registra un nuevo usuario
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            placeholder="Ingresa tu nombre"
            {...register("nombre", { required: true })}
          />
          {errors.nombre && <p className="text-red-600 text-sm flex items-center gap-1"><Ban className="h-3 w-3" /> El nombre es requerido</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="apellidos">Apellidos</Label>
          <Input
            id="apellidos"
            placeholder="Ingresa tus apellidos"
            {...register("apellidos", { required: true })}
          />
          {errors.apellidos && <p className="text-red-600 text-sm flex items-center gap-1"><Ban className="h-3 w-3" /> El apellido es requerido</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Nombre de usuario</Label>
          <Input
            id="username"
            placeholder="Ingresa tu nombre de usuario"
            {...register("username", { required: true })}
          />
          {errors.username && <p className="text-red-600 text-sm flex items-center gap-1"><Ban className="h-3 w-3" /> El nombre de usuario es requerido</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Ingresa tu contraseña"
              {...register("password", {
                required: true,
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: "La contraseña debe tener al menos 8 caracteres, una letra mayuscula, una minuscula, un numero y un caracter especial"
                }
              })}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span className="sr-only">{showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}</span>
            </Button>
          </div>
          {errors.password && <p className="text-yellow-600 text-sm flex items-center gap-2">{errors.password.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="rol">Rol</Label>
          <select
            id="rol"
            {...register("rol", { required: true })}
            className="w-1/2 rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-sm shadow-gray-200"
          >
            <option value="" className="text-gray-400">Selecciona un rol</option>
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
          {errors.rol && <p className="text-red-600 text-sm flex items-center gap-1"><Ban className="h-3 w-3" /> El rol es requerido</p>}   
        </div>

        <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800 uppercase">
          Agregar usuario
        </Button>
        
      </form>
    </CardContent>
  </Card>
  </>
  )
}
