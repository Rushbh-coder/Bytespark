import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  Eye, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  X,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

// Mock Data
const INITIAL_ORDERS = [
  { id: 'ORD-7721', customer: 'Sarah Jenkins', email: 'sarah.j@example.com', date: '2023-10-24', total: 125.50, status: 'Delivered', items: 3, payment: 'Visa' },
  { id: 'ORD-7722', customer: 'Michael Chen', email: 'm.chen@example.com', date: '2023-10-24', total: 450.00, status: 'Processing', items: 1, payment: 'Mastercard' },
  { id: 'ORD-7723', customer: 'Emma Wilson', email: 'emma.w@example.com', date: '2023-10-23', total: 89.99, status: 'Shipped', items: 2, payment: 'PayPal' },
  { id: 'ORD-7724', customer: 'James Rodriguez', email: 'j.rod@example.com', date: '2023-10-23', total: 1240.00, status: 'Pending', items: 5, payment: 'Apple Pay' },
  { id: 'ORD-7725', customer: 'Lisa Thompson', email: 'lisa.t@example.com', date: '2023-10-22', total: 56.25, status: 'Cancelled', items: 1, payment: 'Visa' },
  { id: 'ORD-7726', customer: 'David Miller', email: 'd.miller@example.com', date: '2023-10-22', total: 210.00, status: 'Delivered', items: 2, payment: 'Google Pay' },
  { id: 'ORD-7727', customer: 'Anna Smith', email: 'anna.s@example.com', date: '2023-10-21', total: 345.10, status: 'Shipped', items: 4, payment: 'Visa' },
  { id: 'ORD-7728', customer: 'Robert Pond', email: 'rob.p@example.com', date: '2023-10-21', total: 12.00, status: 'Delivered', items: 1, payment: 'Mastercard' },
];

const STATUS_COLORS = {
  'Delivered': 'bg-green-100 text-green-700 border-green-200',
  'Processing': 'bg-blue-100 text-blue-700 border-blue-200',
  'Shipped': 'bg-purple-100 text-purple-700 border-purple-200',
  'Pending': 'bg-amber-100 text-amber-700 border-amber-200',
  'Cancelled': 'bg-red-100 text-red-700 border-red-200',
};

const App = () => {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Filtered Orders Logic
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            order.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  const StatsCard = ({ title, value, change, icon: Icon, trend }) => (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300">
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

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Orders Management</h1>
          <p className="text-slate-500">Manage and track your customer orders.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
          <button className="flex items-center px-6 py-4 bg-white-300 rounded-lg text-sm font-medium  border border-slate-200 text-rose-500 hover:bg-white-700 transition-colors shadow-sm">
            Create Order
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 text-rose-500">
        <StatsCard title="Total Orders" value="1,284" change="+12.5%" icon={ShoppingBag} trend="up" className="text-rose-500" />
        <StatsCard title="Revenue" value="$42,560.00" change="+8.2%" icon={TrendingUp} trend="up" />
        <StatsCard title="Avg. Order Value" value="$132.50" change="-2.4%" icon={Package} trend="down" />
        <StatsCard title="Pending Fulfillment" value="24" change="6.1%" icon={Clock} trend="up" />
      </div>

      {/* Orders Table Section */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Filters */}
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between bg-white">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by Order ID or Customer..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  statusFilter === status 
                    ? 'bg-slate-900 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs font-bold text-indigo-600">{order.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{order.customer}</div>
                      <div className="text-xs text-slate-500">{order.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${STATUS_COLORS[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-500 italic">
                    No orders found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-500 font-medium">
            Showing <span className="text-slate-900 font-bold">{filteredOrders.length}</span> of <span className="text-slate-900 font-bold">{orders.length}</span> orders
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

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Order Details</h2>
                <p className="text-xs text-slate-500">View information for {selectedOrder.id}</p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Customer Info</span>
                  <p className="font-semibold text-slate-900">{selectedOrder.customer}</p>
                  <p className="text-sm text-slate-500">{selectedOrder.email}</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Payment Method</span>
                  <p className="font-semibold text-slate-900">{selectedOrder.payment}</p>
                  <p className="text-sm text-slate-500">Transaction Successful</p>
                </div>
              </div>

              {/* Status Timeline Placeholder */}
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-4">Order Status</span>
                <div className="flex justify-between relative">
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 -z-10"></div>
                  {[
                    { label: 'Placed', icon: ShoppingBag, completed: true },
                    { label: 'Processing', icon: Clock, completed: true },
                    { label: 'Shipped', icon: Truck, completed: selectedOrder.status === 'Shipped' || selectedOrder.status === 'Delivered' },
                    { label: 'Delivered', icon: CheckCircle, completed: selectedOrder.status === 'Delivered' }
                  ].map((step, i) => (
                    <div key={i} className="flex flex-col items-center bg-white px-2">
                      <div className={`p-2 rounded-full border-2 ${step.completed ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-400'}`}>
                        <step.icon className="w-4 h-4" />
                      </div>
                      <span className={`text-[10px] mt-2 font-bold ${step.completed ? 'text-indigo-600' : 'text-slate-400'}`}>{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Item Summary Table */}
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">Item Summary</span>
                <div className="border border-slate-100 rounded-lg divide-y divide-slate-50">
                   {[...Array(selectedOrder.items)].map((_, i) => (
                    <div key={i} className="p-3 flex justify-between items-center text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center text-slate-400">
                           <Package className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">Product SKU-00{i+1}</p>
                          <p className="text-xs text-slate-500">Size: M | Color: Black</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-slate-900">${(selectedOrder.total / selectedOrder.items).toFixed(2)}</p>
                        <p className="text-xs text-slate-500">Qty: 1</p>
                      </div>
                    </div>
                   ))}
                </div>
              </div>

              {/* Pricing Totals */}
              <div className="space-y-2 border-t border-slate-100 pt-4">
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Subtotal</span>
                  <span>${(selectedOrder.total * 0.9).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-50">
                  <span>Grand Total</span>
                  <span className="text-indigo-600">${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 flex gap-3">
              <button className="flex-1 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-100">
                Download Invoice
              </button>
              <button className="flex-1 py-2 bg-indigo-600 rounded-lg text-sm font-bold text-white hover:bg-indigo-700">
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;