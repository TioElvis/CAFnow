import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarHeader className="p-4">Header</SidebarHeader>
      <SidebarContent>Main</SidebarContent>
      <SidebarFooter>Footer</SidebarFooter>
    </Sidebar>
  );
}
