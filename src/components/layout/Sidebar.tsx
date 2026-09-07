import SidebarNav from "@/components/layout/SidebarNav";

export default function Sidebar() {
  return (
    <aside className="hidden w-sidebar-width shrink-0 flex-col border-r border-border bg-nav-sidebar px-5 lg:flex">
      <SidebarNav />
    </aside>
  );
}
