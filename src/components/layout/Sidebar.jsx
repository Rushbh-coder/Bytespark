import { LayoutDashboard, Users, ShoppingBag, Sparkles } from "lucide-react";
import SidebarLink from "../common/SidebarLink";

const Sidebar = ({ currentView, setCurrentView }) => {
  return (
    <aside className="w-72 bg-white border-r border-rose-100">
      <div className="flex items-center gap-3 px-8 h-24">
        <Sparkles size={22} className="text-rose-500" />
        <span className="text-xl font-black italic">GLOW Admin</span>
      </div>

      <nav className="px-6 space-y-2">
        <SidebarLink
          id="dashboard"
          icon={LayoutDashboard}
          label="Overview"
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
        <SidebarLink
          id="users"
          icon={Users}
          label="Clientele"
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
        <SidebarLink
          id="products"
          icon={ShoppingBag}
          label="Collections"
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
      </nav>
    </aside>
  );
};

export default Sidebar;
