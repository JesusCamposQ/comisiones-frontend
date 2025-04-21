import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Store,
  ShoppingBag,
  NotebookTabs,
  Building,
} from "lucide-react"

import { NavMain } from "@/app/Layout/components/nav-main"
import { NavProjects } from "@/app/Layout/components/nav-projects"
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
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Ventas",
      url: "#",
      icon: Store,
      isActive: true,
      items: [
        {
          title: "Listado de Ventas",
          url: "/ventas",
        },
      ],
    },
    {
      title: "Productos",
      url: "#",
      icon: ShoppingBag,
      items: [
        {
          title: "Listado de Productos",
          url: "#",
        },
        {
          title: "Precios",
          url: "#",
        },
        {
          title: "Detalle de Precio",
          url: "#",
        },
        {
          title: "Marcas",
          url: "#",
        },
        {
          title: "Marca de Lente",
          url: "#",
        },
        {
          title: "Materiales",
          url: "#",
        },
        {
          title: "Tratamientos",
          url: "#",
        },
        {
          title: "Rangos",
          url: "#",
        },
        {
          title: "Combinaciones",
          url: "/productos/combinacion-receta",
        },
        {
          title: "Comision Producto",
          url: "#",
        },
      ],
    },
    {
      title: "Catalogos",
      url: "#",
      icon: NotebookTabs,
      items: [
        {
          title: "Color",
          url: "#",
        },
        {
          title: "Color de Lente",
          url: "#",
        },
        {
          title: "Tipo de Color de Lente",
          url: "#",
        },
        {
          title: "Tipo de Lente",
          url: "#",
        },
        {
          title: "Tipo de Montura",
          url: "#",
        },
        {
          title: "Comision Receta",
          url: "#",
        },
      ],
    },
    {
      title: "Organizacion",
      url: "#",
      icon: Building,
      items: [
        {
          title: "Asesores",
          url: "#",
        },
        {
          title: "Sucursales",
          url: "#",
        },
        {
          title: "Empresas",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
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
        {/*<NavProjects projects={data.projects} />*/}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
