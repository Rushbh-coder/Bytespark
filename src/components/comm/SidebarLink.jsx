const SidebarLink = ({ id, icon: Icon, label, currentView, setCurrentView }) => {
  return (
    <button
      onClick={() => setCurrentView(id)}
      className={`group w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
        currentView === id
          ? 'bg-gradient-to-r from-rose-400 to-pink-500 text-white'
          : 'text-slate-500 hover:bg-rose-50 hover:text-rose-600'
      }`}
    >
      <Icon size={20} />
      <span className="font-semibold text-sm">{label}</span>
    </button>
  );
};

export default SidebarLink;
