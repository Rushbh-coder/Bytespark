import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, ShoppingBag, Search, Plus, 
  UserPlus, Edit2, TrendingUp, DollarSign, ShoppingCart, 
  Menu, X, Trash2, PackagePlus, Sparkles, Filter,
  ChevronRight, Star, Heart, MoreHorizontal, Mail, ShieldCheck,
  Calendar
} from 'lucide-react';

const App = () => {
  // Navigation & UI State
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  
  // Data State (Simulating MongoDB Collections)
  const [users, setUsers] = useState([
    { id: 1, name: 'Sophia Loren', email: 'sophia@glow.com', role: 'VIP Customer', status: 'Active', avatar: 'Sophia', joined: 'Oct 2023' },
    { id: 2, name: 'Emma Wilson', email: 'emma.w@skincare.co', role: 'Member', status: 'Active', avatar: 'Emma', joined: 'Nov 2023' },
    { id: 3, name: 'Isabella Reed', email: 'isabella@beauty.com', role: 'Member', status: 'Inactive', avatar: 'Isabella', joined: 'Jan 2024' },
  ]);

  const [products, setProducts] = useState([
    { 
      id: 1, 
      title: 'Velvet Rose Serum', 
      description: 'Hydrating facial serum infused with organic rose petals and hyaluronic acid.', 
      price: 45.00, 
      category: 'Skincare', 
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&q=80' 
    },
    { 
      id: 2, 
      title: 'Midnight Clay Mask', 
      description: 'Deep cleansing charcoal mask that detoxifies pores and revitalizes skin.', 
      price: 32.00, 
      category: 'Treatments', 
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80' 
    },
    { 
      id: 3, 
      title: 'Luxe Matte Lipstick', 
      description: 'Highly pigmented red matte lipstick with a creamy moisturizing finish.', 
      price: 24.00, 
      category: 'Cosmetics', 
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&q=80' 
    },
    { 
      id: 4, 
      title: 'Silk Night Cream', 
      description: 'Overnight repair cream with vitamin E and silk proteins for hydration.', 
      price: 58.00, 
      category: 'Skincare', 
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&q=80' 
    }
  ]);

  // Form States
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Member' });
  const [newProduct, setNewProduct] = useState({ 
    title: '', 
    description: '', 
    price: '', 
    category: 'Skincare', 
    image: 'https://images.unsplash.com/photo-1596462502278-27bfad450216?w=500&q=80' 
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    const userEntry = {
      ...newUser,
      id: Date.now(),
      status: 'Active',
      joined: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      avatar: newUser.name
    };
    setUsers([userEntry, ...users]);
    setShowUserModal(false);
    setNewUser({ name: '', email: '', role: 'Member' });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const productEntry = {
      ...newProduct,
      id: Date.now(),
      price: parseFloat(newProduct.price),
      rating: 5.0
    };
    setProducts([productEntry, ...products]);
    setShowProductModal(false);
    setNewProduct({ title: '', description: '', price: '', category: 'Skincare', image: 'https://images.unsplash.com/photo-1596462502278-27bfad450216?w=500&q=80' });
  };

  const deleteUser = (id) => setUsers(users.filter(u => u.id !== id));
  const deleteProduct = (id) => setProducts(products.filter(p => p.id !== id));
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const SidebarLink = ({ id, icon: Icon, label }) => (
    <button 
      onClick={() => { setCurrentView(id); if(window.innerWidth < 1024) toggleSidebar(); }}
      className={`group w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
        currentView === id 
          ? 'bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-lg shadow-rose-200' 
          : 'text-slate-500 hover:bg-rose-50 hover:text-rose-600'
      }`}
    >
      <Icon size={20} className={currentView === id ? 'text-white' : 'group-hover:scale-110 transition-transform'} />
      <span className="font-semibold text-sm tracking-tight">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-[#fdfcfb] font-sans overflow-hidden text-slate-900">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-rose-100 transform transition-transform duration-500 lg:static lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center gap-3 px-8 h-24">
          <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-200">
            <Sparkles size={22} className="text-white" />
          </div>
          <span className="text-xl font-black bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent italic">GLOW Admin</span>
        </div>

        <nav className="px-6 space-y-2">
          <SidebarLink id="dashboard" icon={LayoutDashboard} label="Overview" />
          <SidebarLink id="users" icon={Users} label="Clientele" />
          <SidebarLink id="products" icon={ShoppingBag} label="Collections" />
        </nav>

        <div className="absolute bottom-8 left-0 w-full px-6">
          <div className="bg-rose-50 p-6 rounded-3xl border border-rose-100 relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-1">Glow Pro Plan</p>
              <p className="text-sm font-medium text-rose-900 mb-4">Store Capacity: {users.length}/500</p>
              <button className="w-full bg-white py-2 rounded-xl text-xs font-bold text-rose-600 shadow-sm">Manage Storage</button>
            </div>
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-rose-200/30 rounded-full blur-2xl"></div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="sticky top-0 z-30 flex items-center justify-between h-20 px-10 bg-white/60 backdrop-blur-xl border-b border-rose-50">
          <div className="flex items-center gap-6">
            <button onClick={toggleSidebar} className="lg:hidden p-2 rounded-xl bg-rose-50 text-rose-500"><Menu size={20} /></button>
            <div className="hidden md:flex items-center bg-slate-100/50 rounded-2xl px-4 py-2.5 border border-slate-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-rose-200 transition-all">
              <Search size={18} className="text-slate-400 mr-3" />
              <input type="text" placeholder="Search catalog or clients..." className="bg-transparent border-none outline-none text-sm w-72 text-slate-600 font-medium" />
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex flex-col items-end">
              <span className="text-sm font-bold text-slate-800 tracking-tight">Sarah Wilson</span>
              <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Master Esthetician</span>
            </div>
            <div className="relative p-0.5 rounded-2xl bg-gradient-to-tr from-rose-400 to-pink-500">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" className="w-10 h-10 rounded-[14px] bg-white" alt="Profile" />
            </div>
          </div>
        </header>

        <div className="p-10 max-w-[1600px] mx-auto w-full">
          {currentView === 'dashboard' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-700">
              <div className="flex items-end justify-between">
                <div>
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">Morning, Sarah</h1>
                  <p className="text-slate-500 mt-1 font-medium italic">Here's what's trending in your boutique today.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { label: 'Beauty Revenue', val: '$14,820', icon: DollarSign, trend: '+12.5%' },
                  { label: 'Active Clients', val: users.length, icon: Users, trend: '+4.2%' },
                  { label: 'Catalog Size', val: products.length, icon: ShoppingBag, trend: 'Optimal' },
                  { label: 'Satisfaction', val: '4.9/5', icon: Star, trend: '+0.2%' }
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-8 rounded-[32px] border border-rose-50 shadow-sm relative overflow-hidden group hover:shadow-xl hover:shadow-rose-100/50 transition-all duration-500">
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform duration-500">
                          <stat.icon size={22} />
                        </div>
                        <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-full uppercase">{stat.trend}</span>
                      </div>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                      <h4 className="text-3xl font-black text-slate-900 mt-2 tracking-tighter">{stat.val}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentView === 'users' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">Clientele List</h1>
                  <p className="text-slate-400 text-sm font-medium italic mt-1">Managing your active glow community</p>
                </div>
                <button 
                  onClick={() => setShowUserModal(true)}
                  className="bg-slate-900 text-white px-6 py-3.5 rounded-2xl flex items-center gap-3 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 font-bold text-sm tracking-tight"
                >
                  <UserPlus size={18} /> Add Client
                </button>
              </div>

              <div className="bg-white rounded-[40px] border border-rose-50 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-rose-50/30">
                    <tr>
                      <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client</th>
                      <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tier</th>
                      <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Member Since</th>
                      <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rose-50">
                    {users.map(user => (
                      <tr key={user.id} className="group hover:bg-rose-50/20 transition-all duration-300">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatar}`} className="w-12 h-12 rounded-2xl bg-rose-50 p-1 border border-rose-100" alt="" />
                            <div>
                              <p className="font-bold text-slate-800">{user.name}</p>
                              <p className="text-xs text-slate-400 font-medium">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${user.role === 'VIP Customer' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-slate-50 text-slate-500 border border-slate-100'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-sm text-slate-500 font-medium">
                          {user.joined}
                        </td>
                        <td className="px-8 py-5 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"><Edit2 size={16} /></button>
                            <button onClick={() => deleteUser(user.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {currentView === 'products' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">Product Collections</h1>
                  <p className="text-slate-400 text-sm font-medium italic mt-1">Manage your premium stock</p>
                </div>
                <button 
                  onClick={() => setShowProductModal(true)}
                  className="bg-slate-900 text-white px-6 py-3.5 rounded-2xl flex items-center gap-3 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 font-bold text-sm tracking-tight"
                >
                  <PackagePlus size={18} /> New Entry
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map(p => (
                  <div key={p.id} className="bg-white rounded-[40px] border border-rose-50 overflow-hidden group hover:shadow-2xl hover:shadow-rose-100/40 transition-all duration-700 flex flex-col p-4">
                    <div className="h-64 rounded-[32px] overflow-hidden bg-slate-100 relative shadow-inner">
                      <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" alt={p.title} />
                      <button onClick={() => deleteProduct(p.id)} className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-2xl text-rose-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm hover:bg-rose-500 hover:text-white"><Trash2 size={18} /></button>
                      <div className="absolute bottom-4 left-4">
                        <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase shadow-lg bg-white text-rose-600 border border-rose-50">
                          {p.category}
                        </span>
                      </div>
                    </div>
                    <div className="px-4 pt-6 pb-2 flex-1 flex flex-col">
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <h3 className="font-bold text-slate-800 text-lg leading-tight group-hover:text-rose-600 transition-colors">{p.title}</h3>
                        <div className="flex items-center gap-1 text-amber-400">
                          <Star size={14} fill="currentColor" />
                          <span className="text-[10px] font-black text-slate-400">{p.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-400 font-medium line-clamp-2 leading-relaxed flex-1 italic">{p.description}</p>
                      <div className="flex justify-between items-center mt-6">
                        <p className="text-2xl font-black text-slate-900">${p.price.toFixed(2)}</p>
                        <button className="w-10 h-10 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all"><Edit2 size={16} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* --- MODALS --- */}

        {showUserModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white rounded-[48px] w-full max-w-lg p-12 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 shadow-inner">
                    <UserPlus size={24} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Add Client</h2>
                    <p className="text-slate-400 text-sm font-medium italic">Expand your community</p>
                  </div>
                </div>
                <button onClick={() => setShowUserModal(false)} className="w-12 h-12 flex items-center justify-center hover:bg-rose-50 rounded-full transition-all text-slate-400"><X size={24} /></button>
              </div>
              <form onSubmit={handleAddUser} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Full Name</label>
                  <input required type="text" placeholder="e.g. Bella Thorne" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-rose-100 transition-all font-medium" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Email Address</label>
                  <input required type="email" placeholder="bella@example.com" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-rose-100 transition-all font-medium" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Membership Tier</label>
                  <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-rose-100 transition-all font-bold text-rose-500" value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value})}>
                    <option>Member</option>
                    <option>VIP Customer</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-rose-400 to-pink-500 text-white py-5 rounded-3xl font-black text-lg shadow-xl shadow-rose-200 hover:scale-[1.02] active:scale-95 transition-all mt-4">
                  Confirm Registration
                </button>
              </form>
            </div>
          </div>
        )}

        {showProductModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white rounded-[48px] w-full max-w-xl p-12 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 shadow-inner">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">New Treasure</h2>
                    <p className="text-slate-400 text-sm font-medium italic">Add to curated collection</p>
                  </div>
                </div>
                <button onClick={() => setShowProductModal(false)} className="w-12 h-12 flex items-center justify-center hover:bg-rose-50 rounded-full transition-all text-slate-400"><X size={24} /></button>
              </div>
              
              <form onSubmit={handleAddProduct} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Product Title</label>
                  <input required type="text" placeholder="e.g. Moonlight Glow Oil" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-rose-100 transition-all font-medium" value={newProduct.title} onChange={e => setNewProduct({...newProduct, title: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Retail Price ($)</label>
                    <input required type="number" step="0.01" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-rose-100 transition-all font-medium" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Category</label>
                    <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-rose-100 transition-all font-bold text-rose-500" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}>
                      <option>Skincare</option>
                      <option>Cosmetics</option>
                      <option>Treatments</option>
                      <option>Fragrance</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Description</label>
                  <textarea rows="3" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-rose-100 transition-all font-medium resize-none" placeholder="What makes this special?" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-rose-400 to-pink-500 text-white py-5 rounded-3xl font-black text-lg shadow-xl shadow-rose-200 hover:scale-[1.02] transition-all mt-4">
                  Launch Product
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;