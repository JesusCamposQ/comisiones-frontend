import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
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
import { formatDate, parseDate } from "@/shared/utils/formatDate"

interface FiltroProps {
  setFiltros: Dispatch<SetStateAction<FiltroI>>; 
  initialFilters: FiltroI;
}

export default function Filtro({ setFiltros, initialFilters }: FiltroProps) {
  const [nombresSucursales, setNombresSucursales] = useState<string[]>([])
  const {data:empresas}=useQuery({
    queryKey:["empresas"],
    queryFn:()=>obtenerEmpresas()
  })
  const [empresaSelected, setEmpresaSelected] = useState<string>(
    initialFilters?.empresa || ""
  ) 
  const [sucursales, setSucursales] = useState<Sucursal[]>([])
  useEffect(() => {
    if (empresaSelected) {
      obtenerSucursalByEmpresa(empresaSelected).then((response) =>
        setSucursales(response)
      )
    }
  }, [empresaSelected])
  const [activeFilters, setActiveFilters] = useState<FiltroI>({
    empresa: initialFilters?.empresa ? empresas?.find(emp => emp._id === initialFilters.empresa)?.nombre : undefined,
    sucursal: initialFilters?.sucursal,
    fechaInicio: initialFilters?.fechaInicio ? `Fecha Inicio: ${initialFilters.fechaInicio}` : formatDate(new Date().toLocaleDateString()),
    fechaFin: initialFilters?.fechaFin ? `Fecha Fin: ${initialFilters.fechaFin}` : formatDate(new Date().toLocaleDateString())
  })
  const [sucursalesSelected, setSucursalesSelected] = useState<string[]>([
    ...initialFilters?.sucursal || []
  ])
  const [rangeFecha, setRangeFecha] = useState<{ fechaInicio: string; fechaFin: string } >({
    fechaInicio: initialFilters?.fechaInicio || formatDate(new Date().toLocaleDateString()),
    fechaFin: formatDate(new Date().toLocaleDateString())
  })
  const [dateRange, setDateRange] = useState({
    from: initialFilters?.fechaInicio ? parseDate(initialFilters.fechaInicio) : new Date(),
    to: initialFilters?.fechaFin ? parseDate(initialFilters.fechaInicio) : new Date()
  })
  const [saleTypes, setSaleTypes] = useState<string[]>([])

  const addFilterEmpresa = (filter: string) => {
    const nombre = empresas?.find(emp => emp._id === filter)?.nombre;
    if (!activeFilters.empresa) {
      setActiveFilters({
        ...activeFilters,
        empresa: nombre || filter
      })
    }
  }
  const addFilterSucursal = (filter: string) => {
    const nombre = sucursales?.find(suc => suc._id === filter)?.nombre;
    if (!activeFilters.sucursal.includes(filter)) {
      setActiveFilters({
        ...activeFilters,
        sucursal: [...activeFilters.sucursal, nombre || filter]
      })
      setSucursalesSelected([...sucursalesSelected, filter])
    }
  }
  const addFilterFecha = (fechaInicio: string, fechaFin: string) => {
    if (!activeFilters.fechaInicio || !activeFilters.fechaFin) {
      setActiveFilters({
        ...activeFilters,
        fechaInicio,
        fechaFin
      })
    }
  }

  const handleSucursalChange = async (empresaId: string) => {
    if(empresaId){
      const response = await obtenerSucursalByEmpresa(empresaId)
      setSucursales(response)
      setEmpresaSelected(empresaId)
    }
  }
  const removeFilterSucursal = (filter: string) => {
    if(activeFilters.sucursal.includes(filter)) {
      setActiveFilters({
        ...activeFilters,
        sucursal: activeFilters.sucursal.filter((f) => f !== filter)
      })
      setSucursalesSelected(activeFilters.sucursal.filter((f) => f !== filter))
    }
  }
  
  const removeFilterFecha = (filter: string) => {
    if (activeFilters.fechaInicio === filter || activeFilters.fechaFin === filter) {
      setActiveFilters({
        ...activeFilters,
        fechaInicio: formatDate(new Date().toLocaleDateString()),
        fechaFin: formatDate(new Date().toLocaleDateString())
      })
      setRangeFecha({
        fechaInicio: formatDate(new Date().toLocaleDateString()),
        fechaFin: formatDate(new Date().toLocaleDateString())
      })
    }
  }
  const removeFilterEmpresa = (filter: string) => {
    if (activeFilters.empresa === filter) {
      setActiveFilters({
        ...activeFilters,
        empresa: ""
      })
      setEmpresaSelected("")
    }
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
  const agregarFecha = (fechaInicio: string, fechaFin: string) => {
    const fechaInicioFormateada = formatDate(fechaInicio)
    const fechaFinFormateada = formatDate(fechaFin)

    if(fechaInicioFormateada && fechaFinFormateada){
      setRangeFecha({ fechaInicio: fechaInicioFormateada, fechaFin: fechaFinFormateada })
    }
  }
  
  const clearAllFilters = () => {
    setActiveFilters({
      empresa: undefined,
      sucursal: [],
      fechaInicio: formatDate(new Date().toLocaleDateString()),
      fechaFin: formatDate(new Date().toLocaleDateString())
    })
    setSaleTypes([])
    setDateRange({
      from: new Date(),
      to: new Date(),
    })
    setSucursalesSelected([])
    setRangeFecha({
      fechaInicio: formatDate(new Date().toLocaleDateString()),
      fechaFin: formatDate(new Date().toLocaleDateString()),
    })
  }
  const onClickBuscar = () => {
    const datos:FiltroI = {
      empresa: empresaSelected,
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
                value={empresaSelected}
                onValueChange={(value) => {
                  addFilterEmpresa(value)
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
                value={sucursalesSelected.slice(-1)[0]} 
                onValueChange={(value) => {
                  addFilterSucursal(value)
                  agregarSucursal(value)
                }}
              >
                <SelectTrigger id="branch" className="w-full">
                  <SelectValue placeholder="Seleccione una sucursal"/>
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
                  addFilterFecha(range.from?.toLocaleDateString() || '', range.to?.toLocaleDateString() || '')
                  agregarFecha(range.from?.toLocaleDateString() || '', range.to?.toLocaleDateString() || '')
                }}
              />
            </div>
          </div>

          {activeFilters.empresa && (
            <>
              <Separator className="my-4" />
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Filtros activos:</span>
                </div>
                {activeFilters.empresa && (
                  <Badge key={activeFilters.empresa} variant="secondary" className="flex items-center gap-1">
                    {activeFilters.empresa}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilterEmpresa(activeFilters.empresa || "")} />
                  </Badge>
                )}
                {activeFilters.sucursal.length > 0 && (
                  activeFilters.sucursal.map((sucursal) => (
                    <Badge key={sucursal} variant="secondary" className="flex items-center gap-1">
                      Sucursal: {sucursal}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilterSucursal(sucursal)} />
                    </Badge>
                  ))
                )}
                {activeFilters.fechaInicio && activeFilters.fechaFin && (
                  <Badge key={activeFilters.fechaInicio} variant="secondary" className="flex items-center gap-1">
                    {activeFilters.fechaInicio} - {activeFilters.fechaFin}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilterFecha(activeFilters.fechaInicio)} />
                  </Badge>
                )}
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
