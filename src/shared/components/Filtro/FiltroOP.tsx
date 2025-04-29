import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { DatePickerWithRange } from "./components/date-picker-with-range"; // Asegúrate que este componente maneje `Date | undefined`
import { useQuery } from "@tanstack/react-query";
import { obtenerEmpresas } from "@/features/Empresa/services/obternerEmpresas";
import { Empresa } from "@/features/Empresa/interfaces/empresa.interface";
import { Sucursal } from "@/features/Sucursal/interfaces/sucursal.interface";
import { obtenerSucursalByEmpresa } from "@/features/Sucursal/services/obtenerSurcusal";
import { FiltroI } from "@/features/Venta/interfaces/filtro.interface";
import { formatDate, parseDate } from "@/shared/utils/formatDate"; // Asegúrate que estas funciones manejen Date y string adecuadamente

interface FiltroProps {
  setFiltros: Dispatch<SetStateAction<FiltroI>>;
  initialFilters: FiltroI;
}

export default function FiltroOP({ setFiltros, initialFilters }: FiltroProps) {
  // --- State para los VALORES REALES del filtro ---
  const { data: empresas } = useQuery<Empresa[]>({
    queryKey: ["empresas"],
    queryFn: () => obtenerEmpresas(),
  });

  const [empresaSelected, setEmpresaSelected] = useState<string>(
    initialFilters?.empresa || ""
  );

  const [sucursales, setSucursales] = useState<Sucursal[]>([]);

  const [sucursalesSelected, setSucursalesSelected] = useState<string[]>(
    initialFilters?.sucursal || []
  );

  // Inicializa dateRange con Date objects a partir de initialFilters o la fecha actual
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: initialFilters?.fechaInicio
      ? parseDate(initialFilters.fechaInicio)
      : new Date(), // Asume parseDate convierte la cadena a Date
    to: initialFilters?.fechaFin
      ? parseDate(initialFilters.fechaFin)
      : new Date(), // Asume parseDate convierte la cadena a Date
  });

  // rangeFecha guarda las fechas formateadas como string, sincronizado con dateRange
  const [rangeFecha, setRangeFecha] = useState<{
    fechaInicio: string;
    fechaFin: string;
  }>({
    fechaInicio: initialFilters?.fechaInicio || formatDate(new Date().toLocaleDateString()), // Asume formatDate convierte Date o string a string
    fechaFin: initialFilters?.fechaFin || formatDate(new Date().toLocaleDateString()), // Asume formatDate convierte Date o string a string
  });

  // --- Effects ---

  // Efecto para cargar sucursales cuando cambia la empresa seleccionada
  useEffect(() => {
    if (empresaSelected) {
      // Limpiar sucursales seleccionadas si cambia la empresa
      setSucursalesSelected([]);
      // Cargar nuevas sucursales
      obtenerSucursalByEmpresa(empresaSelected)
        .then((response) => setSucursales(response))
        .catch((error) => {
          console.error("Error fetching sucursales:", error);
          setSucursales([]); // Limpiar si hay error
        });
    } else {
      // Limpiar sucursales si no hay empresa seleccionada
      setSucursales([]);
      setSucursalesSelected([]);
    }
  }, [empresaSelected]);

  // Efecto para sincronizar rangeFecha cuando dateRange cambia
  useEffect(() => {
    if (dateRange?.from && dateRange?.to) {
      setRangeFecha({
        fechaInicio: formatDate(dateRange.from.toLocaleDateString()), // Formatea la fecha de inicio
        fechaFin: formatDate(dateRange.to.toLocaleDateString()), // Formatea la fecha de fin
      });
    } else {
        // Opcional: Si una o ambas fechas se deseleccionan, resetear rangeFecha
         setRangeFecha({ fechaInicio: '', fechaFin: '' });
    }
  }, [dateRange]); // Depende de los cambios en dateRange

  // --- Handlers para actualizar el estado del filtro ---

  const handleEmpresaChange = (value: string) => {
    setEmpresaSelected(value);
    // La carga de sucursales y limpieza de sucursalesSelected se maneja en el useEffect
  };

  const handleSucursalChange = (value: string) => {
    // *** NOTA: Este Select es single-select, pero sucursalesSelected es array.
    // Si necesitas multi-select, reemplaza este componente Select.
    // La lógica a continuación añade al array, comportándose como multi-select por debajo.
    if (!sucursalesSelected.includes(value)) {
      setSucursalesSelected([...sucursalesSelected, value]);
    }
     // Si quieres que el Select *solo* muestre la última seleccionada y no añada al array,
     // comenta el if anterior y usa: setSucursalesSelected([value]);
  };

  const handleDateRangeChange = (
    range: { from: Date, to: Date } 
  ) => {
    setDateRange(range || { from: new Date(), to: new Date() });
    // rangeFecha se actualizará automáticamente vía useEffect
  };

  const removeFilterEmpresa = () => {
    setEmpresaSelected("");
    setSucursalesSelected([]); // Limpiar sucursales seleccionadas al quitar la empresa
  };

  const removeFilterSucursal = (sucursalId: string) => {
    setSucursalesSelected(
      sucursalesSelected.filter((id) => id !== sucursalId)
    );
  };

  const removeFilterFecha = () => {
    // Resetear dateRange y rangeFecha a la fecha actual o a undefined/empty
    setDateRange({ from: new Date(), to: new Date() });
     setRangeFecha({ fechaInicio: formatDate(new Date().toLocaleDateString()), fechaFin: formatDate(new Date().toLocaleDateString()) });
  };

  const clearAllFilters = () => {
    setEmpresaSelected("");
    setSucursales([]); // También limpiar la lista de sucursales disponibles
    setSucursalesSelected([]);
    setDateRange({ from: new Date(), to: new Date() });
    setRangeFecha({ fechaInicio: formatDate(new Date().toLocaleDateString()), fechaFin: formatDate(new Date().toLocaleDateString()) });
  };

  const onClickBuscar = () => {
    const datos: FiltroI = {
      empresa: empresaSelected || undefined, // Asegura que sea undefined si no hay selección
      sucursal: sucursalesSelected,
      fechaInicio: rangeFecha.fechaInicio,
      fechaFin: rangeFecha.fechaFin,
    };
    setFiltros(datos);
  };

  // --- Derivar información para mostrar (Badges) ---
  const empresaNombre = empresas?.find(emp => emp._id === empresaSelected)?.nombre;
  const sucursalNombres = sucursalesSelected
    .map(sucursalId => sucursales.find(suc => suc._id === sucursalId)?.nombre)
    .filter(nombre => nombre !== undefined) as string[];

  const isFilterActive = empresaSelected || sucursalesSelected.length > 0 || (dateRange?.from && dateRange?.to && (formatDate(dateRange.from.toLocaleDateString()) !== formatDate(new Date().toLocaleDateString()) || formatDate(dateRange.to.toLocaleDateString()) !== formatDate(new Date().toLocaleDateString())));
    // He ajustado la condición para verificar si las fechas son diferentes a la fecha actual por defecto.
    // Considera si un rango que incluye solo el día actual debe considerarse un "filtro activo" de fecha.

  return (
    <div className=" p-4 md:p-8">
      <Card className="w-full max-w-6xl mx-auto shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-medium">
            Filtros de Ventas
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            Actualizado al:{" "}
            {new Date().toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="chain" className="text-sm font-medium">
                Cadena
              </Label>
              <Select
                value={empresaSelected}
                onValueChange={handleEmpresaChange}
              >
                <SelectTrigger id="chain" className="w-full">
                  <SelectValue placeholder="Seleccione una cadena" />
                </SelectTrigger>
                <SelectContent>
                  {empresas?.map((empresa: Empresa) => (
                    <SelectItem key={empresa._id} value={empresa._id}>
                      {empresa.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="branch" className="text-sm font-medium">
                Sucursal
              </Label>
               {/*
                 *** NOTA IMPORTANTE: ***
                 Este componente Select es para SELECCIÓN ÚNICA.
                 Si necesitas selección MÚLTIPLE de sucursales (tu estado sucursalesSelected es array),
                 deberás reemplazar este Select por un componente de multi-select.
                 La lógica de `handleSucursalChange` actualmente añade al array,
                 pero el UI solo mostrará la última seleccionada en el SelectTrigger.
              */}
              <Select
                 // Para el Select Trigger, muestra el nombre si hay una sola seleccionada,
                 // o un resumen si hay varias, o el placeholder si ninguna.
                value={sucursalesSelected.length === 1 ? sucursalesSelected[0] : ''} // Solo si es single-select real, si no, ""
                onValueChange={handleSucursalChange}
                disabled={!empresaSelected || sucursales.length === 0} // Deshabilita si no hay empresa o no hay sucursales
              >
                <SelectTrigger id="branch" className="w-full">
                   {/* Muestra el nombre de la sucursal si hay una seleccionada */}
                   {sucursalesSelected.length === 1 && sucursalNombres.length === 1
                      ? sucursalNombres[0]
                      : sucursalesSelected.length > 1
                         ? `${sucursalesSelected.length} sucursales seleccionadas`
                         : <SelectValue placeholder="Seleccione una sucursal" />}
                </SelectTrigger>
                <SelectContent>
                  {sucursales?.map((sucursal: Sucursal) => (
                    <SelectItem key={sucursal._id} value={sucursal._id}>
                      {sucursal.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Rango de Fechas</Label>
              <DatePickerWithRange
                date={dateRange}
                setDate={handleDateRangeChange}
              />
            </div>
          </div>

          {/* Mostrar Filtros Activos */}
          {isFilterActive && (
            <>
              <Separator className="my-4" />
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Filtros activos:</span>
                </div>
                {empresaSelected && empresaNombre && (
                  <Badge
                    key={empresaSelected}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {empresaNombre}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={removeFilterEmpresa}
                    />
                  </Badge>
                )}
                {sucursalNombres.map((nombre, index) => (
                  <Badge
                    key={sucursalesSelected[index]} // Usar el ID para la key
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    Sucursal: {nombre}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeFilterSucursal(sucursalesSelected[index])} // Pasar el ID
                    />
                  </Badge>
                ))}
                 {/* Muestra el Badge de fecha solo si hay fechas seleccionadas */}
                {dateRange?.from && dateRange?.to && (
                   <Badge key="date-range-badge" variant="secondary" className="flex items-center gap-1">
                     {rangeFecha.fechaInicio} - {rangeFecha.fechaFin}
                     <X className="h-3 w-3 cursor-pointer" onClick={removeFilterFecha} />
                   </Badge>
                )}

                {(empresaSelected || sucursalesSelected.length > 0 || (dateRange?.from && dateRange?.to)) && (
                   <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs">
                     Limpiar todos
                   </Button>
                )}
              </div>
            </>
          )}

          <div className="mt-6 flex justify-end">
            <Button className="px-8" onClick={onClickBuscar}>
              Buscar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}