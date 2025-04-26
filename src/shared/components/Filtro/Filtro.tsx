import { useEffect, useState } from "react"
import { ChevronDown, Filter, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { DatePickerWithRange } from "./components/date-picker-with-range"
import { useQuery } from "@tanstack/react-query"
import { obtenerEmpresas } from "@/features/Empresa/services/obternerEmpresas"
import { Empresa } from "@/features/Empresa/interfaces/empresa.interface"
import { Sucursal } from "@/features/Sucursal/interfaces/sucursal.interface"
import { obtenerSucursalByEmpresa } from "@/features/Sucursal/services/obtenerSurcusal"
import { FiltroI } from "@/features/Venta/interfaces/filtro.interface"
import { formatDate } from "@/shared/utils/formatDate"

export default function Filtro({setFiltros}:{setFiltros:(data:FiltroI)=>void}) {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [sucursalesSelected, setSucursalesSelected] = useState<string[]>([])
  const [rangeFecha, setRangeFecha] = useState<{ fechaInicio: string; fechaFin: string } >({
    fechaInicio: formatDate(new Date().toLocaleDateString()),
    fechaFin: formatDate(new Date().toLocaleDateString())
  })
  const [sucursales, setSucursales] = useState<Sucursal[]>([])
  const {data:empresas}=useQuery({
    queryKey:["empresas"],
    queryFn:()=>obtenerEmpresas()
  })
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: new Date(),
  })
  const [saleTypes, setSaleTypes] = useState<string[]>([])

  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter])
    }
  }
  const handleSucursalChange = async (empresaId: string) => {
    if(empresaId){
      const response = await obtenerSucursalByEmpresa(empresaId)
      setSucursales(response)
    }
  }
  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))
  }
  useEffect(() => {
    console.log("Sucursales actualizadas:", sucursalesSelected)
    console.log("Fechas actualizadas:", rangeFecha)
  }, [sucursalesSelected, rangeFecha])  
  const agregarSucursal = (sucursal: string) => {
    if (!sucursalesSelected.includes(sucursal)) {
      setSucursalesSelected([...sucursalesSelected, sucursal])
    }
  }
  const agregarFecha = (fecha: { fechaInicio: string; fechaFin: string } ) => {
    const fechaInicio = formatDate(fecha.fechaInicio)
    const fechaFin = formatDate(fecha.fechaFin)

    if(fechaInicio && fechaFin){
      setRangeFecha({ fechaInicio, fechaFin })
    }
  }
  
  const clearAllFilters = () => {
    setActiveFilters([])
    setSaleTypes([])
    setDateRange({
      from: new Date(),
      to: new Date(),
    })
  }
  const onClickBuscar = () => {
    const datos:FiltroI = {
      sucursal: sucursalesSelected,
      fechaInicio: rangeFecha.fechaInicio ? rangeFecha.fechaInicio : formatDate(new Date().toISOString()),
      fechaFin: rangeFecha.fechaFin ? rangeFecha.fechaFin : formatDate(new Date().toISOString()),
    }
    setFiltros(datos)
  }
  return (
    <div className=" p-4 md:p-8">
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="chain" className="text-sm font-medium">
                Cadena
              </Label>
              <Select
                onValueChange={(value) => {
                  addFilter(`Empresa: ${value}`)
                  handleSucursalChange(value)
                }}
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
              <Select
                onValueChange={(value) => {
                  addFilter(`Sucursal: ${value}`)
                  agregarSucursal(value)
                }}
              >
                <SelectTrigger id="branch" className="w-full">
                  <SelectValue placeholder="Seleccione una sucursal" />
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
                setDate={(range) => {
                  setDateRange(range as { from: Date; to: Date })
                  addFilter(`Fechas: ${range.from?.toLocaleDateString()} - ${range.to?.toLocaleDateString()}`)
                  agregarFecha({ fechaInicio: range.from?.toLocaleDateString(), fechaFin: range.to?.toLocaleDateString() })
                }}
              />
            </div>
          </div>

          {activeFilters.length > 0 && (
            <>
              <Separator className="my-4" />
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Filtros activos:</span>
                </div>
                {activeFilters.map((filter) => (
                  <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                    {filter}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter(filter)} />
                  </Badge>
                ))}
                <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs">
                  Limpiar todos
                </Button>
              </div>
            </>
          )}

          <div className="mt-6 flex justify-end">
            <Button className="px-8" onClick={onClickBuscar}>Buscar</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
