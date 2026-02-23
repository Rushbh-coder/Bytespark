import React from "react";
import { Menu, Search, Bell } from "lucide-react";

const Header = ({ toggleSidebar, currentView }) => {
  const titles = {
    dashboard: "Overview",
    users: "Clientele",
    products: "Collections",
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-rose-50 px-8 py-4 flex items-center justify-between">
      
      {/* LEFT */}
      <div className="flex items-center gap-6">
        <button
          onClick={toggleSidebar}
          className="p-3 hover:bg-rose-50 rounded-xl text-slate-400 transition-colors"
        >
          <Menu size={20} />
        </button>

        <div>
          <h1 className="text-xl font-black text-slate-900">
            {titles[currentView] || "Overview"}
          </h1>
          <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">
            Btespark Admin
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-full">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
          Store Online
        </div>

        <button className="relative p-2 text-slate-400 hover:text-rose-500 transition">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>

        <button className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white hover:bg-slate-800 transition">
          <Search size={18} />
        </button>

        <div className="relative p-[2px] rounded-full bg-gradient-to-tr from-rose-400 to-pink-500">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
            alt="Profile"
            className="w-10 h-10 rounded-full bg-white"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
