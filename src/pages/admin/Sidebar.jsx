import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Sparkles,
  Package,
  ClipboardList,
  BarChart3,
  Settings,
  CreditCard,
  Truck,
  LogOut,
  
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();

  const linkClass = (path) =>
    `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-semibold ${
      location.pathname === path
        ? "bg-gradient-to-r from-rose-400 to-blue-500 text-white shadow-lg"
        : "text-slate-500 hover:bg-rose-50 hover:text-rose-500"
    }`;

  return (
    <aside
      className={`min-h-screen bg-white border-r border-rose-100 p-3 transition-all duration-300 ${
        isOpen ? "w-64" : "w-30"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-blue-500 rounded-2xl flex items-center justify-center">
          <Sparkles className="text-white" size={22} />
        </div>

        {isOpen && (
          <span className="text-xl font-black text-rose-600">
            Btespark Admin
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="space-y-1">

        <Link to="/admin" className={linkClass("/admin")}>
          <LayoutDashboard size={18} />
          {isOpen && "Dashboard"}
        </Link>

        <Link to="/admin/users" className={linkClass("/admin/users")}>
          <Users size={18} />
          {isOpen && "Users"}
        </Link>

        <Link to="/admin/category" className={linkClass("/admin/category")}>
          <Sparkles size={18} />
          {isOpen && "Categories"}
        </Link>
        <Link to="/admin/products" className={linkClass("/admin/products")}>
          <ShoppingBag size={18} />
          {isOpen && "Products"}
        </Link>

        <Link to="/admin/order" className={linkClass("/admin/order")}>
          <ClipboardList size={18} />
          {isOpen && "Orders"}
        </Link>

        <Link to="/admin/inventory" className={linkClass("/admin/inventory")}>
          <Package size={18} />
          {isOpen && "Inventory"}
        </Link>

        <Link to="/admin/payment" className={linkClass("/admin/payments")}>
          <CreditCard size={18} />
          {isOpen && "Payments"}
        </Link>

        {/* <Link to="/admin/shipping" className={linkClass("/admin/shipping")}>
          <Truck size={18} />
          {isOpen && "Shipping"}
        </Link> */}

        {/* <Link to="/admin/analytics" className={linkClass("/admin/analytics")}>
          <BarChart3 size={18} />
          {isOpen && "Analytics"}
        </Link> */}

        <Link to="/admin/setting" className={linkClass("/admin/setting")}>
          <Settings size={18} />
          {isOpen && "Settings"}
        </Link>


        <Link
          to="/login"
          className="flex items-center gap-3 px-2 py-3 rounded-2xl text-rose-500 hover:bg-rose-50 transition-all mb-6 absolute bottom-4 "  
        >
          <LogOut size={18} />
          {isOpen && "Logout"}
        </Link>

      </nav>
    </aside>
  );
};

export default Sidebar;
