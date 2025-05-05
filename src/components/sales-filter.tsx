import { useState } from "react"
import { CalendarIcon, FilterIcon, X } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import BranchList from "@/components/branch-list"

export default function SalesFilter() {
  const [startDate, setStartDate] = useState<Date>(new Date("2025-05-02"))
  const [endDate, setEndDate] = useState<Date>(new Date("2025-05-02"))

  const [selectedBranches, setSelectedBranches] = useState([
    "SUCRE CENTRAL",
    "OPTICENTRO POTOSI",
    "OPTICENTRO TUPIZA",
    "OPTICENTRO LA PAZ",
    "OPTICENTRO TARIJA",
    "OPTICENTRO YACUIBA",
    "OPTICENTRO AZURDUY",
    "OPTICENTRO TARIJA 2",
    "OPTICENTRO LA PAZ 2",
    "OPTICENTRO PARAGUAY",
  ])

  const [selectedSaleTypes, setSelectedSaleTypes] = useState(["PRODUCTOS Y/O INSUMOS"])
  const [isFiltered, setIsFiltered] = useState(false)

  const removeBranch = (branch: string) => {
    setSelectedBranches(selectedBranches.filter((b) => b !== branch))
  }

  const removeSaleType = (type: string) => {
    setSelectedSaleTypes(selectedSaleTypes.filter((t) => t !== type))
  }

  const clearAll = () => {
    setSelectedBranches([])
    setSelectedSaleTypes([])
  }

  const handleSearch = () => {
    setIsFiltered(true)
  }

  const currentDate = new Date("2025-05-02")
  const formattedDate = format(currentDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })

  return (
    <>
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <h2 className="text-xl font-semibold">Filtros de Ventas</h2>
              <p className="text-sm text-muted-foreground">Actualizado al: {formattedDate}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Chain Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Cadena</label>
                <Select defaultValue="OPTICENTRO">
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar cadena" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="OPTICENTRO">OPTICENTRO</SelectItem>
                    <SelectItem value="OTHER">OTRA CADENA</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Branch Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Sucursal</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={`${selectedBranches.length} sucursales seleccionadas`} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las sucursales</SelectItem>
                    <SelectItem value="SUCRE CENTRAL">SUCRE CENTRAL</SelectItem>
                    <SelectItem value="OPTICENTRO POTOSI">OPTICENTRO POTOSI</SelectItem>
                    <SelectItem value="OPTICENTRO TUPIZA">OPTICENTRO TUPIZA</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sale Type Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo de Venta</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={`${selectedSaleTypes.length} tipos de ventas seleccionados`} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PRODUCTOS Y/O INSUMOS">PRODUCTOS Y/O INSUMOS</SelectItem>
                    <SelectItem value="SERVICIOS">SERVICIOS</SelectItem>
                    <SelectItem value="CONSULTAS">CONSULTAS</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date Range Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Rango de Fechas</label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col space-y-1">
                    <span className="text-xs">De:</span>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn("justify-start text-left font-normal", !startDate && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "dd/MM/yyyy") : "Seleccionar"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-xs">al:</span>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn("justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "dd/MM/yyyy") : "Seleccionar"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              {/* Selected Branches */}
              {selectedBranches.length > 0 && (
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <FilterIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">Sucursales seleccionadas:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedBranches.map((branch) => (
                      <Badge key={branch} variant="secondary" className="flex items-center gap-1">
                        {branch}
                        <button onClick={() => removeBranch(branch)} className="ml-1 hover:bg-muted rounded-full">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    {selectedBranches.length > 0 && (
                      <Button variant="link" size="sm" onClick={clearAll} className="text-xs h-6 px-2">
                        Limpiar todos
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* Selected Sale Types */}
              {selectedSaleTypes.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FilterIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">Tipos de ventas seleccionados:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedSaleTypes.map((type) => (
                      <Badge key={type} variant="secondary" className="flex items-center gap-1">
                        {type}
                        <button onClick={() => removeSaleType(type)} className="ml-1 hover:bg-muted rounded-full">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSearch}>Buscar</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mostrar el componente BranchList con las sucursales seleccionadas */}
      {isFiltered ? <BranchList selectedBranches={selectedBranches} /> : <BranchList selectedBranches={[]} />}
    </>
  )
}
