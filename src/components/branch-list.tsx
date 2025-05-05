"use client"

import { MapPin, Phone, TrendingUp, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Sucursal } from "@/features/Sucursal/interfaces/sucursal.interface"

interface BranchListProps {
  sucursales: Sucursal[]
}

export default function BranchList({ sucursales }: BranchListProps) {
  // Si no hay sucursales, mostrar mensaje
  if (sucursales.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium">No hay sucursales seleccionadas</h3>
        <p className="text-muted-foreground">Seleccione al menos una sucursal en los filtros para ver sus detalles.</p>
      </div>
    )
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6">Sucursales Seleccionadas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sucursales.map((sucursal) => {
          const progressPercentage = Math.min(Math.round((sucursal.ventas / sucursal.meta) * 100), 100)

          return (
            <Card key={sucursal._id} className="overflow-hidden">
              <CardHeader className="bg-muted/50 pb-4">
                <CardTitle className="flex items-start justify-between">
                  <span className="text-lg font-bold">{sucursal.nombre}</span>
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md">{sucursal.region}</span>
                </CardTitle>
                <CardDescription className="flex items-center mt-2">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  {sucursal.direccion}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{sucursal.telefono}</span>
                  </div>

                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{sucursal.empleados} empleados</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Ventas / Meta</span>
                      </div>
                      <span className="text-sm font-medium">{progressPercentage}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Bs. {sucursal.ventas.toLocaleString()}</span>
                      <span>Bs. {sucursal.meta.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
