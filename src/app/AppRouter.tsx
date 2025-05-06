import ProductoPage from '../features/Producto/ProductoPage';
import VentaPage from '../features/Venta/VentaPage';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import { MetasPage } from '@/features/Metas';
import { CombinacionRecetaPage } from '@/features/CombinacionReceta';
import { ComisionRecetaPage } from '@/features/ComisionReceta';
import { Autenticacion } from '@/features/Autenticacion/components/Autenticacion';
import { UsuarioPage } from '@/features/Usuario/UsuarioPage';
import { UsuarioRegistroPage } from '@/features/Usuario/pages/UsuarioRegistroPage';
import { useContext } from 'react';
import { TokenContext } from '@/features/Autenticacion/context/TokenProvider';
import { ComisionProductoPage } from '@/features/ComisionProducto';

 function AppRouter() {
  
  const {isAunteticacion,token}=  useContext(TokenContext)

  
  
  return (
    <BrowserRouter>
  
        <Routes>
          <Route path="/" element={<Autenticacion />} />
          {token && isAunteticacion ? <Route path="/" element={<Layout />}>
            <Route path="/ventas" element={<VentaPage />} />
            <Route path="/productos" element={<ProductoPage />}>
              <Route index element={<CombinacionRecetaPage />} />
              <Route path="combinacion-receta" element={<CombinacionRecetaPage />} />
            </Route>
            <Route path="/metas" element={<MetasPage />} />
            <Route path="/usuarios">
              <Route index element={<UsuarioPage />} />
              <Route path="registro" element={<UsuarioRegistroPage />} />
            </Route>
            <Route path="/comision/registro" element={<ComisionRecetaPage />} />
            <Route path="/comision/gestion/receta" element={<CombinacionRecetaPage />} />
            <Route path="/comision/gestion/producto" element={<ComisionProductoPage />} />
          </Route> : 
                <Route path="/" element={<Autenticacion />} />
          }
        </Routes>
      
    </BrowserRouter>
  );
}

export default AppRouter