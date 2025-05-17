import ProductoPage from '../features/Producto/ProductoPage';
import VentaPage from '../features/Venta/VentaPage';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import { RegistroMetasPage } from '@/features/Metas/pages/RegistroMetasPage';
import { CombinacionRecetaPage } from '@/features/CombinacionReceta';
import { Autenticacion } from '@/features/Autenticacion/components/Autenticacion';
import { UsuarioPage } from '@/features/Usuario/UsuarioPage';
import { UsuarioRegistroPage } from '@/features/Usuario/pages/UsuarioRegistroPage';
import { useContext } from 'react';
import { TokenContext } from '@/features/Autenticacion/context/TokenProvider';
import { ComisionProductoPage } from '@/features/ComisionProducto';
import ComisionGafasPage from '@/features/ComisionProducto/pages/ComisionGafasPage';
import ComisionMonturaPage from '@/features/ComisionProducto/pages/ComisionMontura';
import ComisionLenteContactoPage from '@/features/ComisionProducto/pages/ComisionLenteContactoPage';
import { RegistroSinComisionReceta } from '@/features/ComisionReceta/pages/RegistroSinComisionReceta';
import { RegistroSinComisionProducto } from '@/features/ComisionProducto/pages/RegistroSinComisionProducto';
import { ComisionServicioPage } from '@/features/ComisionServicio/pages/ComisionServicioPage';
import { MetasPages } from '@/features/Metas/pages/MetasPages';
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
            <Route path="/metas/registro" element={<RegistroMetasPage />} />
            <Route path="/metas" element={<MetasPages />} />
            <Route path="/usuarios">
              <Route index element={<UsuarioPage />} />
              <Route path="registro" element={<UsuarioRegistroPage />} />
            </Route>
            <Route path="/comision/registro/receta" element={<RegistroSinComisionReceta />} />
            <Route path="/comision/registro/producto" element={<RegistroSinComisionProducto />} /> 
            <Route path="/comision/gestion/receta" element={<CombinacionRecetaPage />} />
            <Route path="/comision/gestion/servicio" element={<ComisionServicioPage />} />
            <Route path="/comision/gestion/producto" element={<ComisionProductoPage />} />
            <Route path="/comision/gestion/producto/gafas" element={<ComisionGafasPage />} />
            <Route path="/comision/gestion/producto/montura" element={<ComisionMonturaPage />} />
            <Route path="/comision/gestion/producto/lente-contacto" element={<ComisionLenteContactoPage />} />
          </Route> : 
                <Route path="/" element={<Autenticacion />} />
          }
        </Routes>
      
    </BrowserRouter>
  );
}

export default AppRouter