import { Comision, MetaProductosVip, VentaElement } from "../interfaces/venta.interface";

export function porcentaje(total:number, monto:number, sucursal?:string ) {

    if(sucursal && sucursal.includes("PARAGUAY")){
      return 3.00
    }
    const porcentaje =(monto /total) * 100
    return Number(porcentaje.toFixed(2)) || 0
}

export function descontarPorcentajeAcomision(comision:number, porcentaje:number) {
    const nuevaComision = comision * (1 - porcentaje/ 100)
    return Number(nuevaComision.toFixed(2)) || 0
}

export const calcularComision = (
  comisiones: Comision[],
  gafaVip: number,
  monturaVip: number,
  lenteDeContacto: number,
  metaProductosVip: MetaProductosVip | null,
  empresa: string,
  porcentaje:number,
  sucursal?: string,
  importe?:number
) => {
  const productovip = gafaVip + monturaVip;
  let comisionProducto = 0;

  // Condición especial para Paraguay - aplica 3% del importe
  if(sucursal && sucursal.includes("PARAGUAY")){
    comisionProducto = importe ? importe * 0.03 : 0;
    return descontarPorcentajeAcomision(comisionProducto, porcentaje); // Retorna directamente la comisión del 3% sin aplicar porcentaje de descuento
  }
  
  if(Array.isArray(comisiones) && comisiones.length > 0){
      if (metaProductosVip && empresa == "OPTICENTRO") {
        if (
          productovip >= metaProductosVip.monturaMasGafa &&
          lenteDeContacto >= metaProductosVip.lenteDeContacto
        ) {
          const mayorMonto = comisiones.reduce((max, actual) => actual.monto > max.monto ? actual : max);
          comisionProducto += mayorMonto.monto;
        } else {
          const menorMonto = comisiones.reduce((min, actual) => 
            actual.monto < min.monto ? actual : min
          );
          comisionProducto += menorMonto.monto;
        }
      } else {
        const mayorMonto = comisiones.reduce((max, actual) => actual.monto > max.monto ? actual : max);
        comisionProducto += mayorMonto.monto;
      }
  }
  return descontarPorcentajeAcomision(comisionProducto, porcentaje || 0);
};

export function calcularComisionTotal (
  ventas: VentaElement[],
  metaProductosVip: MetaProductosVip | null,
  gafaVip: number,
  monturaVip: number,
  lenteDeContacto: number,
  empresa: string,
  sucursal?: string
 ) {
  let totalComision = 0
  for (const venta of ventas) {
     for (const detalle of venta.detalle) {
      const comision = calcularComision(
        detalle.comisiones,
        gafaVip, 
        monturaVip,
        lenteDeContacto, 
        metaProductosVip, 
        empresa, 
        porcentaje(venta.detalle.reduce((acc ,item)=> acc + item.importe,0 ), venta.descuento),
        sucursal,
        detalle.importe  // Pasamos el importe del detalle actual
      )  
      totalComision += comision
    }
  }
  return totalComision
}

// Esta función ya no es necesaria ya que hemos integrado su lógica en calcularComisionTotal
// export function calcularComisionTotalParaguay (
//   ventas: VentaElement[],
//   metaProductosVip: MetaProductosVip | null,
//   gafaVip: number,
//   monturaVip: number,
//   lenteDeContacto: number,
//   empresa: string,
//   sucursal?: string,
//   importe?:number
//  ) {
//   // Código redundante eliminado
// } 

export const totalImporte = (ventas: VentaElement[]) => {
    let importe: number = 0;
    for (const venta of ventas) {
      for (const detalle of venta.detalle) {
        importe += detalle.importe;
      }
    }
    return importe;
};