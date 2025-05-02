import { useForm } from "react-hook-form";

import {AutenticacionI} from  '@/features/Autenticacion/interface/autenticacionI'
import { autenticacion } from "@/features/Autenticacion/service/autenticaiconService";
import { TokenContext } from "../context/TokenProvider";
import { useContext } from "react";

export const Autenticacion = () => {
  const {asignarToken} = useContext(TokenContext)
    const {register, handleSubmit, formState:{errors} } =useForm<AutenticacionI>()
    const onSubmit =async(data:AutenticacionI)=>{
            try {
                const response = await autenticacion(data)
                if(response.status = 200){
                    asignarToken(response.token)
                    window.location.href = 'ventas'
                }
            } catch (error) {
                console.log(error);
                
            }
    }
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
        <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Bienvenido</h2>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-600 mb-1">username</label>
              <input
              {...register('username',{required:'Ingrese su usuario'})}
                type="username"
                id="username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
               
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-600 mb-1">Contraseña</label>
              <input
                   {...register('password' ,{required:'Ingrese su contraseña'}) }
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition-all shadow-md"
            >
              Iniciar Sesión
            </button>
          </form>
          
        </div>
      </div>
    );
  };
  