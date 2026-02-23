import { Menu, Search } from "lucide-react";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-20 px-10 bg-white/60 backdrop-blur-xl border-b border-rose-50">
      
      <div className="flex items-center gap-6">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-xl bg-rose-50 text-rose-500"
        >
          <Menu size={20} />
        </button>

        <div className="hidden md:flex items-center bg-slate-100/50 rounded-2xl px-4 py-2.5 border border-slate-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-rose-200 transition-all">
          <Search size={18} className="text-slate-400 mr-3" />
          <input
            type="text"
            placeholder="Search catalog or clients..."
            className="bg-transparent border-none outline-none text-sm w-72 text-slate-600 font-medium"
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex flex-col items-end">
          <span className="text-sm font-bold text-slate-800">
            Sarah Wilson
          </span>
          <span className="text-[10px] font-black text-rose-400 uppercase">
            Master Esthetician
          </span>
        </div>

        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
          className="w-10 h-10 rounded-2xl bg-white"
          alt="Profile"
        />
      </div>
    </header>
  );
};

export default Header;
