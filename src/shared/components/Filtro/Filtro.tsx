import { useState } from "react"
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

export default function Filtro() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
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

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))
  }

  const handleSaleTypeChange = (type: string) => {
    if (saleTypes.includes(type)) {
      setSaleTypes(saleTypes.filter((t) => t !== type))
    } else {
      setSaleTypes([...saleTypes, type])
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
  const {data:empresas}=useQuery({
    queryKey:["empresas"],
    queryFn:()=>obtenerEmpresas()
  })

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
              <Select onValueChange={(value) => addFilter(`Cadena: ${value}`)}>
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
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Select
                  id="branch"
                  isMulti
                  closeMenuOnSelect={false}
                  components={{
                    MultiValueContainer: ({ children, ...props }) => (
                      <div className="flex flex-wrap gap-1" {...props}>
                        {children}
                      </div>
                    ),
                  }}
                  styles={{
                    multiValue: (base) => ({
                      ...base,
                      backgroundColor: "rgba(156, 163, 175, 0.16)",
                      borderRadius: "0.375rem",
                      padding: "0.25rem 0.5rem",
                    }),
                  }}
                  placeholder="Buscar sucursal..."
                  className="pl-8"
                  onChange={(values) => {
                    if (values.length > 0) {
                      return addFilter(`Sucursal: ${values.join(", ")}`);
                    }
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Buscar sucursal..." />
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
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Tipo de venta</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {saleTypes.length > 0 ? `${saleTypes.length} seleccionados` : "Seleccionar tipo"}
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <div className="p-4 space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="comisiona"
                        checked={saleTypes.includes("Comisiona")}
                        onCheckedChange={() => handleSaleTypeChange("Comisiona")}
                      />
                      <Label htmlFor="comisiona" className="font-normal">
                        Comisiona
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="no-comisiona"
                        checked={saleTypes.includes("No comisiona")}
                        onCheckedChange={() => handleSaleTypeChange("No comisiona")}
                      />
                      <Label htmlFor="no-comisiona" className="font-normal">
                        No comisiona
                      </Label>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Rango de Fechas</Label>
              <DatePickerWithRange
                date={dateRange}
                setDate={(range) => {
                  setDateRange(range as { from: Date; to: Date })
                  addFilter(`Fechas: ${range.from?.toLocaleDateString()} - ${range.to?.toLocaleDateString()}`)
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
            <Button className="px-8">Procesar</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
