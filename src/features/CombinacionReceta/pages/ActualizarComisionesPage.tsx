import React, { useState, ChangeEvent, FormEvent } from 'react';
import { actualizarComisiones, cargarCombinaciones } from '../services/serviciosCombinacionReceta';
import toast, { Toaster } from 'react-hot-toast';

export const ActualizarComisionesPage: React.FC = () => {
    const [archivo, setArchivo] = useState<File | null>(null);

    const handleArchivoChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setArchivo(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!archivo) {
            alert("Por favor selecciona un archivo.");
            return;
        }

        const formData = new FormData();
        formData.append("file", archivo);
        try {
            const response = await actualizarComisiones(formData)
            console.log(response.status);

            if (response.status === 200) {
                toast.success('Actualizado')
                return
            }

        } catch (error) {
            toast.error('Ocurrio un error')
            return
      

        }

    };

    return (
        <>
            <Toaster />
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                       Actualizar Comisiones
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="archivo"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Selecciona un archivo:
                            </label>
                            <input
                                type="file"
                                id="archivo"
                                onChange={handleArchivoChange}
                                accept=".csv,.xlsx,.xls,.txt,.json"
                                required
                                className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg shadow-sm cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow transition-colors"
                        >
                            Subir archivo
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};
