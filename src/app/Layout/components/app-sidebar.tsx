import {
  Building,
  CircleDollarSign,
  BadgeDollarSign,
  ShoppingBag,
} from "lucide-react"

import { NavMain } from "@/app/Layout/components/nav-main"
import { NavUser } from "@/app/Layout/components/nav-user"
import { TeamSwitcher } from "@/app/Layout/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: localStorage.getItem('username') || '',
  },
  teams: [
    {
      name: "Sistema Comisiones",
      logo: BadgeDollarSign,
      plan: "Comisiones",
    },
  ],
  navMain: [
    /*{
      title: "Ventas",
      url: "/ventas",
      icon: Store,
      isActive: true,
      items: [
        {
          title: "Listado de Ventas",
          url: "/ventas",
        },
      ],
    },
    */
    {
      title: "Comisiones",
      url: "#",
      icon: CircleDollarSign,
      isActive: true,
      items: [
        {
          title: "Comisiones por Ventas",
          url: "/ventas",
        },
        {
          title: "Registro de Comisiones",
          url: "#",
          items: [
            {
              title: "Comision Receta",
              url: "/comision/registro/receta",
            },
            {
              title: "Comision Producto",
              url: "/comision/registro/producto",
            },
          ],
        },
        // {
        //   title: "Gestion de Comision",
        //   url: "/comision/gestion",
        // },
        {
          title: "Gestion de Comision",
          url: "#",
          items: [
            {
              title: "Comision Receta",
              url: "/comision/gestion/receta",
            },
            {
              title: "Comision Servicio",
              url: "/comision/gestion/servicio",
            },
            {
              title: "Comision Producto",
              url: "/comision/gestion/producto",
            },
          ],
        },
        {
          title: "Comision Producto",
          url: "/comision/gestion/producto",
          items: [
            {
              title: "Comision Montura",
              url: "/comision/gestion/producto/montura",
            },
            {
              title: "Comision Gafas",
              url: "/comision/gestion/producto/gafas",
            },
            {
              title: "Comision Lente Contacto",
              url: "/comision/gestion/producto/lente-contacto",
            },
          ],
        },
      ],
    },
    {
      title: "Productos",
      url: "#",
      icon: ShoppingBag,
      items: [
        // {
        //   title: "Listado de Productos",
        //   url: "#",
        // },
        // {
        //   title: "Precios",
        //   url: "#",
        // },
        // {
        //   title: "Detalle de Precio",
        //   url: "#",
        // },
        // {
        //   title: "Marcas",
        //   url: "#",
        // },
        // {
        //   title: "Marca de Lente",
        //   url: "#",
        // },
        // {
        //   title: "Materiales",
        //   url: "#",
        // },
        // {
        //   title: "Tratamientos",
        //   url: "#",
        // },
        // {
        //   title: "Rangos",
        //   url: "#",
        // },
        // {
        //   title: "Combinaciones",
        //   url: "/productos/combinacion-receta",
        // },
        // {
        //   title: "Comision Producto",
        //   url: "#",
        // },
        // {
        //   title: "Comision Receta",
        //   url: "/comision/receta",
        // },
        {
          title: "Metas",
          url: "#",
          items: [
            /*{
              title: "Gestion de Metas",
              url: "/metas",
            },
            */{
              title: "Registro de Metas",
              url: "/metas/registro",
            },
          ],
        },
      ],
    },
    // {
    //   title: "Catalogos",
    //   url: "#",
    //   icon: NotebookTabs,
    //   items: [
    //     {
    //       title: "Color",
    //       url: "#",
    //     },
    //     {
    //       title: "Color de Lente",
    //       url: "#",
    //     },
    //     {
    //       title: "Tipo de Color de Lente",
    //       url: "#",
    //     },
    //     {
    //       title: "Tipo de Lente",
    //       url: "#",
    //     },
    //     {
    //       title: "Tipo de Montura",
    //       url: "#",
    //     },
    //     {
    //       title: "Comision Receta",
    //       url: "#",
    //     },
    //   ],
    // },
    {
      title: "Organizacion",
      url: "#",
      icon: Building,
      items: [
        {
          title: "Usuarios",
          url: "/usuarios",
        },
        // {
        //   title: "Asesores",
        //   url: "#",
        // },
        // {
        //   title: "Sucursales",
        //   url: "#",
        // },
        // {
        //   title: "Empresas",
        //   url: "#",
        // },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
