import { Comision, MetaProductosVip, VentaElement } from "../interfaces/venta.interface";

export function porcentaje(total:number, monto:number, sucursal?:string ) {
  if(total <= 0){
    return 0
  }
    if(sucursal && sucursal.includes("PARAGUAY")){
      return 3.00
    }
    const porcentaje =(monto /total) * 100
    return Number(porcentaje.toFixed(2)) || 0
}

export function descontarPorcentajeAcomision(comision: number, porcentaje: number): number {
    if (
        !Number.isFinite(comision) || 
        !Number.isFinite(porcentaje) || 
        comision < 0 || 
        porcentaje < 0 || 
        porcentaje > 100
    ) {
        return 0;
    }

    const resultado = comision * (1 - porcentaje / 100);
    return Number(resultado.toFixed(2));
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

  if(sucursal?.includes("PARAGUAY")) {
    comisionProducto = importe ? importe * 0.03 : 0;
    return descontarPorcentajeAcomision(comisionProducto, porcentaje);
  }

  if (Array.isArray(comisiones) && comisiones.length > 0) {
    const [mayorMonto, menorMonto] = comisiones.reduce(
      ([mayor, menor], actual) => [
        actual.monto > mayor.monto ? actual : mayor,
        actual.monto < menor.monto ? actual : menor
      ],
      [{monto: 0}, {monto: Infinity}]
    );
    console.log(empresa);
    
    if (empresa === "OPTICENTRO") {
      if (metaProductosVip && productovip >= metaProductosVip.monturaMasGafa && lenteDeContacto >= metaProductosVip.lenteDeContacto) {
        comisionProducto += mayorMonto.monto;
      } else {
        console.log('monto menor');
        
        comisionProducto += menorMonto.monto;
      }
    } else {
      console.log('monto mayor');
      comisionProducto += mayorMonto.monto;
    }
  }

  return  descontarPorcentajeAcomision(comisionProducto, porcentaje);
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
  return ventas.reduce((acc, venta) => {
    const importeTotal = venta.detalle.reduce((acc, detalle) => acc + detalle.importe, 0);
    const porcentajeDescuento = porcentaje(importeTotal, venta.descuento);
    return acc + venta.detalle.reduce((acc, detalle) => {
      const comision = calcularComision(
        detalle.comisiones,
        gafaVip, 
        monturaVip,
        lenteDeContacto, 
        metaProductosVip, 
        empresa, 
        porcentajeDescuento,
        sucursal,
        detalle.importe  // Pasamos el importe del detalle actual
      );  
      return acc + comision;
    }, 0);
  }, 0);
}

export const totalImporte = (ventas: VentaElement[]) => {
    let importe: number = 0;
    for (const venta of ventas) {
      for (const detalle of venta.detalle) {
        importe += detalle.importe;
      }
    }
    return importe;
};