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
    <div>
      <h2>Buscador de Lentes</h2>
      <form>
        <input
          name="tipoLente"
          placeholder="tipo Lente"
          value={filtro.tipoLente}
          onChange={handleChange}
        />
        <input
          name="material"
          placeholder="Material"
          value={filtro.material}
          onChange={handleChange}
        />
        <input
          name="tratamiento"
          placeholder="Tratamiento"
          value={filtro.tratamiento}
          onChange={handleChange}
        />
        <input
          name="marcaLente"
          placeholder="Marca"
          value={filtro.marcaLente}
          onChange={handleChange}
        />
        <input
          name="tipoColorLente"
          placeholder="Tipo Color Lente"
          value={filtro.tipoColorLente}
          onChange={handleChange}
        />
        <input
          name="rango"
          placeholder="Rangos"
          value={filtro.rango}
          onChange={handleChange}
        />
        <input
          name="colorLente"
          placeholder="Color"
          value={filtro.colorLente}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};
