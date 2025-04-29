
import ProductoPage from '../features/Producto/ProductoPage';

import VentaPage from '../features/Venta/VentaPage';

import { BrowserRouter, Routes } from 'react-router';
import { Route } from 'react-router';
import Layout from './Layout/Layout';
import { MetasPage } from '@/features/Metas';
import { CombinacionRecetaPage } from '@/features/CombinacionReceta';
import { ComisionRecetaPage } from '@/features/ComisionReceta';
import { Autenticacion } from '@/features/autenticacion/components/Autenticacion';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Autenticacion />} />
        <Route path="/" element={<Layout />} >
          <Route path="/ventas" element={<VentaPage />} />
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
