import React from 'react';
import AsesorPage from '../features/Asesor/AsesorPage';
import ColorPage from '../features/Color/ColorPage';
import ColorLentePage from '../features/ColorLente/ColorLentePage';
import CombinacionRecetaPage from '../features/CombinacionReceta/CombinacionRecetaPage';
import ComisionProductoPage from '../features/ComisionProducto/ComisionProductoPage';
import ComisionRecetaPage from '../features/ComisionReceta/ComisionRecetaPage';
import DetallePrecioPage from '../features/DetallePrecio/DetallePrecioPage';
import DetalleVentaPage from '../features/DetalleVenta/DetalleVentaPage';
import EmpresaPage from '../features/Empresa/EmpresaPage';
import MarcaPage from '../features/Marca/MarcaPage';
import MarcaLentePage from '../features/MarcaLente/MarcaLentePage';
import MaterialPage from '../features/Material/MaterialPage';
import PrecioPage from '../features/Precio/PrecioPage';
import ProductoPage from '../features/Producto/ProductoPage';
import RangoPage from '../features/Rango/RangoPage';
import SucursalPage from '../features/Sucursal/SucursalPage';
import TipoColorLentePage from '../features/TipoColorLente/TipoColorLentePage';
import TipoLentePage from '../features/TipoLente/TipoLentePage';
import TipoMonturaPage from '../features/TipoMontura/TipoMonturaPage';
import TratamientoPage from '../features/Tratamiento/TratamientoPage';
import VentaPage from '../features/Venta/VentaPage';

import { BrowserRouter, Routes } from 'react-router';
import { Route } from 'react-router';
import Layout from './Layout/Layout';
import { MetasPage } from '@/features/Metas';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Layout />} >
          <Route path={"/ventas"} element={<VentaPage />} />
          <Route path='/productos' element={<ProductoPage />}>
            <Route index element={<CombinacionRecetaPage />} />
            <Route path="/productos/combinacion-receta" element={<CombinacionRecetaPage />} />
          </Route>
          <Route path="/metas" element={<MetasPage />} />
          <Route path="/comision/calculo" element={<ComisionRecetaPage />} />
          <Route path="/comision/gestion/receta" element={<CombinacionRecetaPage />} />
          <Route path='/comision/gestion/producto' element={<ComisionRecetaPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
