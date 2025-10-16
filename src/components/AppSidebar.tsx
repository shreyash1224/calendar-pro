import { Calendar, Home, Zap, Settings, Clock } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { ChevronRight, ChevronLeft } from "lucide-react";

const items = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Events", url: "/events", icon: Clock },
  { title: "Automations", url: "/automations", icon: Zap },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarContent >
        <SidebarGroup className="pt-0">
          <div className="sticky top-0 z-10 flex h-16 items-center justify-between  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            {/* Left side: Label */}
            <SidebarGroupLabel className="text-sm font-semibold">
              <span className="font-bold text-2xl" >Calendar pro</span>
            </SidebarGroupLabel>


            {/* Right side: Toggle button */}
            {open && <SidebarTrigger />}
          </div>
          <hr />



          <SidebarGroupContent>
            <SidebarMenu>
              {!open && (

                <SidebarTrigger />
              )}

              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "bg-sidebar-accent text-sidebar-primary font-medium"
                          : "hover:bg-sidebar-accent/50"
                      }
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar >
  );
}
