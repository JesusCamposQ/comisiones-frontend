import React from 'react';
import { filtroCombinacionRecetaI } from '../interfaces/comisiones.interface';

export const Buscador = ({
  setFiltro,
}: {
  setFiltro: (data: any) => void;
}) => {
 
const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFiltro((prev: filtroCombinacionRecetaI) => ({
    ...prev,
    [name]: value,
  }));
};
  return (
    <form className='flex flex-row gap-2'>
      <input
        name="tipoLente"
        className='hover:bg-amber-50 hover:rounded-md hover:border hover:py-2 hover:text-black focus:outline-none hover:border-blue-200'
        placeholder="Tipo Lente"
        
        onChange={onChange}
      />
      <input
        name="material"
        className='hover:bg-amber-50 hover:rounded-md hover:border hover:py-2 hover:text-black focus:outline-none hover:border-blue-200'
        placeholder="Material"
        
        onChange={onChange}
      />

      <input
        name="tratamiento"
        className='hover:bg-amber-50 hover:rounded-md hover:border hover:py-2 hover:text-black focus:outline-none hover:border-blue-200'
        placeholder="Tratamiento"
     
        onChange={onChange}
      />


      <input
        name="marcaLente"
        className='hover:bg-amber-50 hover:rounded-md hover:border hover:py-2 hover:text-black focus:outline-none hover:border-blue-200'
        placeholder="Marca"
     
        onChange={onChange}
      />
      <input
        name="tipoColorLente"
        className='hover:bg-amber-50 hover:rounded-md hover:border hover:py-2 hover:text-black focus:outline-none hover:border-blue-200'
        placeholder="Tipo Color Lente"

        onChange={onChange}
      />

      <input
        name="rango"
        className='hover:bg-amber-50 hover:rounded-md hover:border hover:py-2 hover:text-black focus:outline-none hover:border-blue-200'
        placeholder="Rango"
 
        onChange={onChange}
      />

      <input
        name="colorLente"
        className='hover:bg-amber-50 hover:rounded-md hover:border hover:py-2 hover:text-black focus:outline-none hover:border-blue-200'
        placeholder="Color"
   
        onChange={onChange}
      />
    </form>
  );
};
