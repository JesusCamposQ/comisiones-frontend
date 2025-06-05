import { useEffect } from "react";
import { Datum } from "../interfaces/producto.interface";
import { ComsionProductoFiltro } from "../interfaces/comsionProductoFiltro";

interface Props {
    combinaciones: Datum[];
    filtro: ComsionProductoFiltro;
    setFiltrarCombinacion: React.Dispatch<React.SetStateAction<Datum[]>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const FiltrarCombinacion = ({ combinaciones, filtro, setFiltrarCombinacion, setPage }: Props) => {
useEffect(() => {
    const filtrar = () => {
      const combinacionesFiltradas = combinaciones.filter((combinacion) => {
        return (
          (!filtro.codigoMia || combinacion.codigoMia?.toLowerCase().includes(filtro.codigoMia.toLowerCase())) &&
          (!filtro.tipoProducto || combinacion.tipoProducto?.toLowerCase().includes(filtro.tipoProducto.toLowerCase())) &&
          (!filtro.serie || combinacion.serie?.toLowerCase().includes(filtro.serie.toLowerCase())) &&
          (!filtro.codigoQR || combinacion.codigoQR?.toLowerCase().includes(filtro.codigoQR.toLowerCase())) &&
          (!filtro.marca || combinacion.marca?.toLowerCase().includes(filtro.marca.toLowerCase())) &&
          (!filtro.color || combinacion.color?.toLowerCase().includes(filtro.color.toLowerCase())) &&
          (!filtro.tipoPrecio || combinacion.tipoPrecio?.toLowerCase().includes(filtro.tipoPrecio.toLowerCase())) &&
          (!filtro.importe || combinacion.importe?.toString().includes(filtro.importe.toString()))
        );
      });
      setFiltrarCombinacion(combinacionesFiltradas);
      setPage(1); // Resetear a la primera página cuando se aplica un filtro
    };
    filtrar();
  }, [filtro, combinaciones]);
}