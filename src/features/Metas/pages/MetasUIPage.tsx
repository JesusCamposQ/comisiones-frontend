import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Building2, Package, Eye, Contact, DollarSign, X, Save, List } from "lucide-react"

export default function MetasUIPage() {
  const [selectedFrameBrands, setSelectedFrameBrands] = useState<string[]>(["Gucci"])
  const [selectedGlassesBrands, setSelectedGlassesBrands] = useState<string[]>(["Gucci"])

  const brands = ["Gucci", "Ray-Ban", "Oakley", "Prada", "Versace", "Tom Ford"]

  const branches = [
    {
      id: 1,
      name: "Sucursal 1",
      frameQty: 10,
      framePrice: 30000,
      glassesQty: 5,
      glassesPrice: 5000,
      contactLensQty: 4,
      frameBrands: ["Gucci", "Ray-Ban", "Prada"],
      glassesBrands: ["Gucci", "Oakley"],
    },
    {
      id: 2,
      name: "Sucursal 2",
      frameQty: 10,
      framePrice: 30000,
      glassesQty: 5,
      glassesPrice: 5000,
      contactLensQty: 4,
      frameBrands: ["Gucci"],
      glassesBrands: ["Gucci"],
    },
    {
      id: 3,
      name: "Sucursal 3",
      frameQty: 10,
      framePrice: 30000,
      glassesQty: 5,
      glassesPrice: 5000,
      contactLensQty: 4,
      frameBrands: ["Gucci", "Ray-Ban", "Prada"],
      glassesBrands: ["Gucci", "Oakley"],
    },
  ]

  const removeBrand = (brand: string, type: "frame" | "glasses") => {
    if (type === "frame") {
      setSelectedFrameBrands((prev) => prev.filter((b) => b !== brand))
    } else {
      setSelectedGlassesBrands((prev) => prev.filter((b) => b !== brand))
    }
  }

  const addBrand = (brand: string, type: "frame" | "glasses") => {
    if (type === "frame" && !selectedFrameBrands.includes(brand)) {
      setSelectedFrameBrands((prev) => [...prev, brand])
    } else if (type === "glasses" && !selectedGlassesBrands.includes(brand)) {
      setSelectedGlassesBrands((prev) => [...prev, brand])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-800">Sistema de Gestión de Inventario</h1>
          <p className="text-slate-600">Administra tu inventario de productos ópticos de manera eficiente</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company and Branch Info */}
            <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  Información de Empresa y Sucursal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="empresa" className="text-sm font-medium text-slate-700">
                      Empresa
                    </Label>
                    <Input
                      id="empresa"
                      placeholder="Nombre de la empresa"
                      defaultValue="Empresa 1"
                      className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sucursal" className="text-sm font-medium text-slate-700">
                      Sucursal
                    </Label>
                    <Input
                      id="sucursal"
                      placeholder="Nombre de la sucursal"
                      defaultValue="Sucursal 1"
                      className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inventory Information */}
            <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <Package className="h-5 w-5 text-green-600" />
                  Información de Inventario
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Frames Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-amber-600" />
                    <h3 className="font-semibold text-slate-700">Monturas</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">Cantidad</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        className="border-slate-200 focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">Precio</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          type="number"
                          placeholder="0.00"
                          className="pl-10 border-slate-200 focus:border-amber-500 focus:ring-amber-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="bg-slate-200" />

                {/* Glasses Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-purple-600" />
                    <h3 className="font-semibold text-slate-700">Gafas</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">Cantidad</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        className="border-slate-200 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">Precio</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          type="number"
                          placeholder="0.00"
                          className="pl-10 border-slate-200 focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="bg-slate-200" />

                {/* Contact Lenses Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Contact className="h-4 w-4 text-teal-600" />
                    <h3 className="font-semibold text-slate-700">Lentes de Contacto</h3>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700">Cantidad</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      className="border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Brand Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Frame Brands */}
              <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-slate-700">Marcas de Monturas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {selectedFrameBrands.map((brand) => (
                      <Badge key={brand} variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                        {brand}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-1 h-4 w-4 p-0 hover:bg-amber-200"
                          onClick={() => removeBrand(brand, "frame")}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <Select onValueChange={(value) => addBrand(value, "frame")}>
                    <SelectTrigger className="border-slate-200 focus:border-amber-500 focus:ring-amber-500">
                      <SelectValue placeholder="Seleccionar marca" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands
                        .filter((brand) => !selectedFrameBrands.includes(brand))
                        .map((brand) => (
                          <SelectItem key={brand} value={brand}>
                            {brand}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Glasses Brands */}
              <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-slate-700">Marcas de Gafas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {selectedGlassesBrands.map((brand) => (
                      <Badge
                        key={brand}
                        variant="secondary"
                        className="bg-purple-100 text-purple-800 hover:bg-purple-200"
                      >
                        {brand}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-1 h-4 w-4 p-0 hover:bg-purple-200"
                          onClick={() => removeBrand(brand, "glasses")}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <Select onValueChange={(value) => addBrand(value, "glasses")}>
                    <SelectTrigger className="border-slate-200 focus:border-purple-500 focus:ring-purple-500">
                      <SelectValue placeholder="Seleccionar marca" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands
                        .filter((brand) => !selectedGlassesBrands.includes(brand))
                        .map((brand) => (
                          <SelectItem key={brand} value={brand}>
                            {brand}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Brand Lists */}
          <div className="space-y-6">
            <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-slate-700">Lista de Marcas Disponibles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] pr-4">
                  <div className="space-y-3">
                    {brands.map((brand) => (
                      <div
                        key={brand}
                        className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50/50"
                      >
                        <span className="font-medium text-slate-700">{brand}</span>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs border-amber-200 text-amber-700 hover:bg-amber-50"
                            onClick={() => addBrand(brand, "frame")}
                            disabled={selectedFrameBrands.includes(brand)}
                          >
                            + Montura
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs border-purple-200 text-purple-700 hover:bg-purple-50"
                            onClick={() => addBrand(brand, "glasses")}
                            disabled={selectedGlassesBrands.includes(brand)}
                          >
                            + Gafa
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-sm">
            <List className="mr-2 h-4 w-4" />
            Listar Llaves
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg shadow-sm">
            <Save className="mr-2 h-4 w-4" />
            Registrar
          </Button>
        </div>

        {/* Data Table */}
        <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-slate-700">Resumen de Sucursales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200">
                    <TableHead className="font-semibold text-slate-700">Sucursal</TableHead>
                    <TableHead className="font-semibold text-slate-700">Cant. Monturas</TableHead>
                    <TableHead className="font-semibold text-slate-700">Precio Monturas</TableHead>
                    <TableHead className="font-semibold text-slate-700">Cant. Gafas</TableHead>
                    <TableHead className="font-semibold text-slate-700">Precio Gafas</TableHead>
                    <TableHead className="font-semibold text-slate-700">Cant. Lentes</TableHead>
                    <TableHead className="font-semibold text-slate-700">Marcas Monturas</TableHead>
                    <TableHead className="font-semibold text-slate-700">Marcas Gafas</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {branches.map((branch) => (
                    <TableRow key={branch.id} className="border-slate-200">
                      <TableCell className="font-medium text-slate-700">{branch.name}</TableCell>
                      <TableCell className="text-slate-600">{branch.frameQty}</TableCell>
                      <TableCell className="text-slate-600">${branch.framePrice.toLocaleString()}</TableCell>
                      <TableCell className="text-slate-600">{branch.glassesQty}</TableCell>
                      <TableCell className="text-slate-600">${branch.glassesPrice.toLocaleString()}</TableCell>
                      <TableCell className="text-slate-600">{branch.contactLensQty}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {branch.frameBrands.map((brand) => (
                            <Badge key={brand} variant="secondary" className="text-xs bg-amber-100 text-amber-800">
                              {brand}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {branch.glassesBrands.map((brand) => (
                            <Badge key={brand} variant="secondary" className="text-xs bg-purple-100 text-purple-800">
                              {brand}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
