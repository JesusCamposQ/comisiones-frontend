import { type Dispatch, type SetStateAction, useEffect, useState } from "react"
import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useQuery } from "@tanstack/react-query"
import { obtenerEmpresas } from "@/features/Empresa/services/obternerEmpresas"
import type { Empresa } from "@/features/Empresa/interfaces/empresa.interface"
import type { Sucursal } from "@/features/Sucursal/interfaces/sucursal.interface"
import { obtenerSucursalByEmpresa } from "@/features/Sucursal/services/obtenerSurcusal"
import type { FiltroI } from "@/features/Venta/interfaces/filtro.interface"
import { formatDate, parseDate } from "@/shared/utils/formatDate"
import { DatePickerWithPresets } from "./components/data-picker-with-presets"
import obtenerTipoVentas from "@/features/Venta/services/obternerTipoVenta"
import type { TipoVenta } from "@/features/Venta/interfaces/tipoVenta.interface"

interface FiltroProps {
  setFiltros: Dispatch<SetStateAction<FiltroI>>
  initialFilters: FiltroI
}

export default function FiltroOP({ setFiltros, initialFilters }: FiltroProps) {
  // --- State para los VALORES REALES del filtro ---
  const { data: empresas = [] } = useQuery<Empresa[]>({
    queryKey: ["empresas"],
    queryFn: () => obtenerEmpresas(),
  })
  const { data: tipoVentas = [] } = useQuery<TipoVenta[]>({
    queryKey: ["tipoventas"],
    queryFn: () => obtenerTipoVentas(),
  })
  const [empresaSelected, setEmpresaSelected] = useState<string>(initialFilters?.empresa || "")

  const [sucursales, setSucursales] = useState<Sucursal[]>([])
  const [sucursalNombres, setSucursalNombres] = useState<string[]>([])
  const [tipoVentasSelected, setTipoVentasSelected] = useState<string[]>(initialFilters?.tipoVenta || [])
  const [tipoVentasFiltradas, setTipoVentasFiltradas] = useState<TipoVenta[]>(initialFilters?.tipoVentas || [])

  const [sucursalesSelected, setSucursalesSelected] = useState<string[]>(initialFilters?.sucursal || [])
  const [sucursalesFiltradas, setSucursalesFiltradas] = useState<Sucursal[]>(initialFilters?.sucursales || [])

  const [fechaInicio, setFechaInicio] = useState<Date>(
    initialFilters?.fechaInicio ? parseDate(initialFilters.fechaInicio) : new Date(),
  )
  const [fechaFin, setFechaFin] = useState<Date>(
    initialFilters?.fechaFin ? parseDate(initialFilters.fechaFin) : new Date(),
  )

  // --- Effects ---

  // Efecto para cargar sucursales cuando cambia la empresa seleccionada
  useEffect(() => {
    if (empresaSelected) {
      // Cargar nuevas sucursales
      obtenerSucursalByEmpresa(empresaSelected)
        .then((response) => {
          setSucursales(response)
          if (sucursalesSelected.length === 0) {
            setSucursalesFiltradas(response)
          }
        })
        .catch((error) => {
          console.error("Error fetching sucursales:", error)
          setSucursales([]) // Limpiar si hay error
        })
    } else {
      // Limpiar sucursales si no hay empresa seleccionada
      setSucursales([])
      setSucursalesSelected([])
    }
  }, [empresaSelected])

  useEffect(() => {
    handleTipoVentaFiltrada(tipoVentasSelected)
  }, [tipoVentasSelected, tipoVentas])

  useEffect(() => {
    handleSucursalFiltrada(sucursalesSelected)
  }, [sucursalesSelected, sucursales])

  useEffect(() => {
    handleDateRangeChange(fechaInicio, fechaFin)
  }, [fechaInicio, fechaFin])

  // --- Handlers para actualizar el estado del filtro ---

  const handleDateRangeChange = (fechaInicio: Date, fechaFin: Date) => {
    setFechaInicio(fechaInicio)
    setFechaFin(fechaFin)
  }

  const handleEmpresaChange = (value: string) => {
    setEmpresaSelected(value)
  }

  const handleSucursalChange = (value: string) => {
    if (!sucursalesSelected.includes(value)) {
      setSucursalesSelected([...sucursalesSelected, value])
    }
  }
  const handleTipoVentaChange = (value: string) => {
    if (!tipoVentasSelected.includes(value)) {
      setTipoVentasSelected([...tipoVentasSelected, value])
    }
  }

  const removeFilterSucursal = (sucursalId: string) => {
    setSucursalesSelected(sucursalesSelected.filter((id) => id !== sucursalId))
  }
  const removeFilterTipoVenta = (tipoVentaId: string) => {
    setTipoVentasSelected(tipoVentasSelected.filter((id) => id !== tipoVentaId))
  }

  const handleSucursalFiltrada = (sucursalesSelected: string[]) => {
    if (!sucursales) return

    const sucursalesFiltradasActualizadas = sucursalesSelected
      .map((sucursalId) => sucursales.find((suc) => suc._id === sucursalId))
      .filter((sucursal): sucursal is Sucursal => sucursal !== undefined)

    setSucursalesFiltradas(sucursalesFiltradasActualizadas)
    setSucursalNombres(sucursalesFiltradasActualizadas.map((sucursal) => sucursal.nombre))
  }

  const handleTipoVentaFiltrada = (tipoVentasSelected: string[]) => {
    if (!tipoVentas) return

    const tipoVentasFiltradasActualizadas = tipoVentasSelected
      .map((tipoVentaId) => tipoVentas.find((tipoVenta) => tipoVenta._id === tipoVentaId))
      .filter((tipoVenta): tipoVenta is TipoVenta => tipoVenta !== undefined)

    setTipoVentasFiltradas(tipoVentasFiltradasActualizadas)
  }

  const clearAllFilters = () => {
    setEmpresaSelected("")
    setSucursales([])
    setSucursalesSelected([])
    setFechaInicio(new Date())
    setFechaFin(new Date())
    setSucursalesFiltradas([])
    setTipoVentasFiltradas([])
    setTipoVentasSelected([])
  }

  const onClickBuscar = () => {
    // Importante: Creamos un nuevo objeto para asegurar que React detecte el cambio
    const datos: FiltroI = {
      empresa: empresaSelected || undefined,
      sucursal: sucursalesFiltradas.map((sucursal) => sucursal._id),
      fechaInicio: formatDate(fechaInicio.toLocaleDateString()),
      fechaFin: formatDate(fechaFin.toLocaleDateString()),
      sucursales: sucursalesFiltradas,
      tipoVenta: tipoVentasFiltradas.map((tipoVenta) => tipoVenta._id),
      tipoVentas: tipoVentasFiltradas,
    }

    // Usamos la función setFiltros que recibimos como prop
    setFiltros(datos)
  }

  const isFilterActive =
    empresaSelected ||
    sucursalesSelected.length > 0 ||
    tipoVentasSelected.length > 0 ||
    (fechaInicio &&
      fechaFin &&
      (formatDate(fechaInicio.toLocaleDateString()) !== formatDate(new Date().toLocaleDateString()) ||
        formatDate(fechaFin.toLocaleDateString()) !== formatDate(new Date().toLocaleDateString())))

  return (
    <div className="p-4 md:p-8">
      <Card className="w-full max-w-6xl mx-auto shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-medium">Filtros de Ventas</CardTitle>
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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            <div className="space-y-2">
              <Label htmlFor="chain" className="text-sm font-medium">
                Cadena
              </Label>
              <Select value={empresaSelected} onValueChange={handleEmpresaChange}>
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
              <Select
                value={sucursalesSelected.length === 1 ? sucursalesSelected[0] : ""}
                onValueChange={handleSucursalChange}
                disabled={!empresaSelected || sucursales.length === 0}
              >
                <SelectTrigger id="branch" className="w-full">
                  {sucursalesFiltradas.length > 0 ? (
                    `${sucursalesFiltradas.length} sucursales seleccionadas`
                  ) : (
                    <SelectValue placeholder="Seleccione una sucursal" />
                  )}
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
              <Label htmlFor="tipoVenta" className="text-sm font-medium">
                Tipo de Venta
              </Label>
              <Select
                value={tipoVentasSelected.length === 1 ? tipoVentasSelected[0] : ""}
                onValueChange={handleTipoVentaChange}
                disabled={!empresaSelected || sucursales.length === 0}
              >
                <SelectTrigger id="tipoVenta" className="w-full">
                  {tipoVentasFiltradas.length > 0 ? (
                    `${tipoVentasFiltradas.length} tipos de ventas seleccionados`
                  ) : (
                    <SelectValue placeholder="Seleccione un tipo de venta" />
                  )}
                </SelectTrigger>
                <SelectContent>
                  {tipoVentas?.map((tipoVenta: TipoVenta) => (
                    <SelectItem key={tipoVenta._id} value={tipoVenta._id}>
                      {tipoVenta.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Rango de Fechas</Label>
              <div className="grid grid-cols-2 gap-2 items-center">
                <span>De:</span>
                <DatePickerWithPresets
                  label="Fecha de Inicio"
                  date={fechaInicio}
                  setDate={(date: Date) => setFechaInicio(date)}
                  className="col-span-1"
                />
                <span>al:</span>
                <DatePickerWithPresets
                  label="Fecha de Fin"
                  date={fechaFin}
                  setDate={(date: Date) => setFechaFin(date)}
                  className="col-span-1"
                />
              </div>
            </div>
          </div>

          {/* Mostrar Filtros Activos */}
          {isFilterActive && (
            <>
              <Separator className="my-4" />
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Sucursales seleccionadas:</span>
                </div>
                {sucursalesFiltradas.map((sucursal) => (
                  <Badge key={sucursal._id} variant="secondary" className="flex items-center gap-1">
                    {sucursal.nombre}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilterSucursal(sucursal._id)} />
                  </Badge>
                ))}
                {(sucursalesSelected.length > 0 || tipoVentasSelected.length > 0) && (
                  <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs">
                    Limpiar todos
                  </Button>
                )}
              </div>
              {tipoVentasFiltradas.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Tipos de ventas seleccionados:</span>
                  </div>
                  {tipoVentasFiltradas.map((tipoVenta) => (
                    <Badge key={tipoVenta._id} variant="secondary" className="flex items-center gap-1">
                      {tipoVenta.nombre}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilterTipoVenta(tipoVenta._id)} />
                    </Badge>
                  ))}
                </div>
              )}
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
  )
}
