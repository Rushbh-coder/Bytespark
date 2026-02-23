import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  Download, 
  Edit3, 
  Package, 
  AlertTriangle, 
  CheckCircle, 
  Layers, 
  X,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  BarChart2,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Trash2
} from 'lucide-react';

// Mock Inventory Data
const INITIAL_INVENTORY = [
  { id: 'SKU-9901', name: 'Premium Cotton Tee', category: 'Apparel', price: 25.00, stock: 142, status: 'In Stock', warehouse: 'A1' },
  { id: 'SKU-9902', name: 'Urban Leather Boots', category: 'Footwear', price: 120.00, stock: 8, status: 'Low Stock', warehouse: 'B2' },
  { id: 'SKU-9903', name: 'Wireless Headphones', category: 'Electronics', price: 89.99, stock: 45, status: 'In Stock', warehouse: 'C1' },
  { id: 'SKU-9904', name: 'Slim Fit Denim', category: 'Apparel', price: 55.00, stock: 0, status: 'Out of Stock', warehouse: 'A2' },
  { id: 'SKU-9905', name: 'Waterproof Smartwatch', category: 'Electronics', price: 199.00, stock: 12, status: 'Low Stock', warehouse: 'C1' },
  { id: 'SKU-9906', name: 'Canvas Backpack', category: 'Accessories', price: 45.00, stock: 89, status: 'In Stock', warehouse: 'A3' },
  { id: 'SKU-9907', name: 'Polarized Sunglasses', category: 'Accessories', price: 29.99, stock: 156, status: 'In Stock', warehouse: 'A3' },
  { id: 'SKU-9908', name: 'Mechanical Keyboard', category: 'Electronics', price: 129.00, stock: 3, status: 'Low Stock', warehouse: 'C2' },
];

const STATUS_COLORS = {
  'In Stock': 'bg-green-100 text-green-700 border-green-200',
  'Low Stock': 'bg-amber-100 text-amber-700 border-amber-200',
  'Out of Stock': 'bg-red-100 text-red-700 border-red-200',
};

const App = () => {
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filtered Inventory Logic
  const filteredInventory = useMemo(() => {
    return inventory.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [inventory, searchTerm, categoryFilter]);

  const StatsCard = ({ title, value, change, icon: Icon, trend }) => (
    <div className="bg-white p-6 rounded-3xl border  border-slate-100 shadow hover:shadow-xl transition">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-slate-50 rounded-lg">
          <Icon className="w-5 h-5 text-rose-600" />
        </div>
        <div className={`flex items-center text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {trend === 'up' ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
          {change}
        </div>
      </div>
      <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
    </div>
  );   

  const categories = ['All', ...new Set(INITIAL_INVENTORY.map(item => item.category))];

  return (
    <div className="min-h-screen  p-4 md:p-8 font-sans text-slate-900">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Inventory Management</h1>
          <p className="text-slate-500">Track stock levels, categories, and warehouse locations.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
          <button className="flex items-center px-4 py-2 border border-slate-200 bg-white rounded-lg text-sm font-medium text-rose-500 hover:bg-rose-50 transition-colors shadow-sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard title="Total SKU Count" value="458" change="+32" icon={Layers} trend="up" />
        <StatsCard title="Inventory Value" value="$124,560" change="+5.4%" icon={BarChart2} trend="up" />
        <StatsCard title="Low Stock Alerts" value="12" change="-2" icon={AlertTriangle} trend="down" />
        <StatsCard title="Out of Stock" value="4" change="+1" icon={X} trend="up" />
      </div>

      {/* Inventory Table Section */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Filters */}
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between bg-white">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by SKU or Product Name..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  categoryFilter === cat 
                    ? 'bg-slate-900 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Warehouse</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInventory.length > 0 ? filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                        <Package className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{item.name}</div>
                        <div className="text-xs font-mono text-indigo-600">{item.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600 bg-slate-100 px-2 py-1 rounded-md">{item.category}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                    {item.warehouse}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-slate-900">{item.stock}</div>
                    <div className="text-[10px] text-slate-400">${item.price.toFixed(2)} / unit</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${STATUS_COLORS[item.status]}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => setSelectedProduct(item)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-500 italic">
                    No products found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-500 font-medium">
            Showing <span className="text-slate-900 font-bold">{filteredInventory.length}</span> of <span className="text-slate-900 font-bold">{inventory.length}</span> products
          </p>
          <div className="flex gap-2">
            <button className="p-1.5 rounded border border-slate-200 bg-white text-slate-400 hover:text-slate-600 disabled:opacity-50" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1.5 rounded border border-slate-200 bg-white text-slate-400 hover:text-slate-600">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Edit Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Edit Product Stock</h2>
                <p className="text-xs text-slate-500">Updating inventory for {selectedProduct.id}</p>
              </div>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Product Name</label>
                  <input 
                    type="text" 
                    defaultValue={selectedProduct.name}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category</label>
                  <select defaultValue={selectedProduct.category} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all">
                    {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Stock</label>
                  <input 
                    type="number" 
                    defaultValue={selectedProduct.stock}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Unit Price ($)</label>
                  <input 
                    type="number" 
                    defaultValue={selectedProduct.price}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Warehouse</label>
                  <input 
                    type="text" 
                    defaultValue={selectedProduct.warehouse}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                </div>
              </div>

              <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center gap-3">
                <div className="p-2 bg-indigo-600 rounded-lg text-white">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-indigo-900">Projected Demand</p>
                  <p className="text-indigo-700/80">Stock is expected to last 24 days based on current sales velocity.</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 flex gap-3">
              <button 
                onClick={() => setSelectedProduct(null)}
                className="flex-1 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-100"
              >
                Discard Changes
              </button>
              <button className="flex-1 py-2 bg-indigo-600 rounded-lg text-sm font-bold text-white hover:bg-indigo-700">
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;