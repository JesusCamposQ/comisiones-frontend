import React from 'react';
import { filtroCombinacionRecetaI } from '../interfaces/comisiones.interface';

export const Buscador = ({
  filtro,
  setFiltro,
}: {
  filtro: filtroCombinacionRecetaI;
  setFiltro: (data: filtroCombinacionRecetaI) => void;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFiltro({ ...filtro, [name]: value });
  };

  return (
    <form className='flex flex-row gap-2'>
      <input
        name="tipoLente"
        className='hover:bg-amber-50 hover:rounded-md hover:border hover:py-2 hover:text-black focus:outline-none hover:border-blue-200'
        placeholder="Tipo Lente"
        value={filtro.tipoLente}
        onChange={handleChange}
      />
      <input
        name="material"
        className='hover:bg-amber-50 hover:rounded-md hover:border hover:py-2 hover:text-black focus:outline-none hover:border-blue-200'
        placeholder="Material"
        value={filtro.material}
        onChange={handleChange}
      />

      <input
        name="tratamiento"
        className='hover:bg-amber-50 hover:rounded-md hover:border hover:py-2 hover:text-black focus:outline-none hover:border-blue-200'
        placeholder="Tratamiento"
        value={filtro.tratamiento}
        onChange={handleChange}
      />


      <input
        name="marcaLente"
        className='hover:bg-amber-50 hover:rounded-md hover:border hover:py-2 hover:text-black focus:outline-none hover:border-blue-200'
        placeholder="Marca"
        value={filtro.marcaLente}
        onChange={handleChange}
      />
      <input
        name="tipoColorLente"
        className='hover:bg-amber-50 hover:rounded-md hover:border hover:py-2 hover:text-black focus:outline-none hover:border-blue-200'
        placeholder="Tipo Color Lente"
        value={filtro.tipoColorLente}
        onChange={handleChange}
      />

      <input
        name="rango"
        className='hover:bg-amber-50 hover:rounded-md hover:border hover:py-2 hover:text-black focus:outline-none hover:border-blue-200'
        placeholder="Rango"
        value={filtro.rango}
        onChange={handleChange}
      />

      <input
        name="colorLente"
        className='hover:bg-amber-50 hover:rounded-md hover:border hover:py-2 hover:text-black focus:outline-none hover:border-blue-200'
        placeholder="Color"
        value={filtro.colorLente}
        onChange={handleChange}
      />
    </form>
  );
};
