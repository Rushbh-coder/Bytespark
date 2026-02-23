import React, { useState, useMemo } from 'react';
import { 
  Search, Plus, Download, Calendar, Filter as FilterIcon, 
  Eye, Edit3, RotateCcw, Trash2, CheckCircle, AlertCircle, 
  DollarSign, ArrowLeftRight, Clock, X, Package
} from 'lucide-react';

// --- MOCK DATA ---
const MOCK_PAYMENTS = [
  { id: 'TXN-9901', client: 'John Doe', orderId: 'ORD-501', amount: 1250.00, method: 'Card', status: 'Paid', date: '2023-10-24 14:30', notes: 'Monthly subscription' },
  { id: 'TXN-9902', client: 'Sarah Smith', orderId: 'ORD-502', amount: 450.50, method: 'UPI', status: 'Pending', date: '2023-10-24 15:45', notes: 'Bulk order deposit' },
  { id: 'TXN-9903', client: 'Michael Ross', orderId: 'ORD-503', amount: 3200.00, method: 'Net Banking', status: 'Failed', date: '2023-10-23 09:15', notes: 'Failed via gateway' },
  { id: 'TXN-9904', client: 'Emma Wilson', orderId: 'ORD-504', amount: 890.00, method: 'Cash', status: 'Refunded', date: '2023-10-22 11:20', notes: 'Customer request' },
  { id: 'TXN-9905', client: 'David Chen', orderId: 'ORD-505', amount: 150.00, method: 'Card', status: 'Paid', date: '2023-10-21 16:00', notes: 'Express shipping' },
];

// --- UTILS ---
const getStatusStyles = (status) => {
  switch (status) {
    case 'Paid': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'Pending': return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'Failed': return 'bg-rose-100 text-rose-700 border-rose-200';
    case 'Refunded': return 'bg-blue-100 text-blue-700 border-blue-200';
    default: return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

// --- SUB-COMPONENTS ---

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b flex justify-between items-center bg-slate-50/50">
          <h3 className="text-lg font-black text-slate-800">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-colors"><X size={20}/></button>
        </div>
        <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

const StatsHeader = ({ data }) => {
  const stats = [
    { label: 'Total Revenue', value: `$${data.filter(p => p.status === 'Paid').reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}`, icon: DollarSign, color: 'bg-indigo-600' },
    { label: 'Transactions', value: data.length, icon: ArrowLeftRight, color: 'bg-blue-500' },
    { label: 'Pending', value: `$${data.filter(p => p.status === 'Pending').reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}`, icon: Clock, color: 'bg-amber-500' },
    { label: 'Refunded', value: `$${data.filter(p => p.status === 'Refunded').reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}`, icon: RotateCcw, color: 'bg-rose-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((s, i) => (
        <div key={i} className="bg-white p-6 rounded-3xl shadow hover:shadow-xl transition">
          <div className={`w-10 h-10 rounded-xl bg-white  text-rose-500 flex items-center justify-center mb-4`}>
            <s.icon size={20} />
          </div>
          <p className="text-sm font-medium text-slate-500">{s.label}</p>
          <h4 className="text-2xl font-black text-slate-900 mt-1">{s.value}</h4>
        </div>
      ))}
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---

const PaymentPage = () => {
  const [payments, setPayments] = useState(MOCK_PAYMENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const filteredPayments = useMemo(() => {
    return payments.filter(p => {
      const matchesSearch = p.client.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [payments, searchTerm, statusFilter]);

  const addToast = (msg, type = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 3000);
  };

  const handleSavePayment = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPayment = {
      id: currentPayment?.id || `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      client: formData.get('client'),
      orderId: formData.get('orderId'),
      amount: parseFloat(formData.get('amount')),
      method: formData.get('method'),
      status: formData.get('status'),
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      notes: formData.get('notes')
    };

    if (currentPayment) {
      setPayments(payments.map(p => p.id === currentPayment.id ? newPayment : p));
      addToast('Payment updated');
    } else {
      setPayments([newPayment, ...payments]);
      addToast('Payment added');
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Notifications */}
      <div className="fixed top-6 right-6 z-[100] space-y-3">
        {notifications.map(n => (
          <div key={n.id} className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-xl border-l-4 bg-white ${n.type === 'success' ? 'text-emerald-600 border-emerald-500' : 'text-rose-600 border-rose-500'}`}>
            <span className="font-bold text-sm">{n.msg}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Payment Management</h1>
          <p className="text-slate-500 font-medium">Control transactions and financial logs</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all">
            <Download size={18} /> Export
          </button>
          <button 
            onClick={() => { setCurrentPayment(null); setIsModalOpen(true); }}
            className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 text-rose-500 rounded-xl font-bold hover:bg-rose-50 transition-all shadow-lg shadow-rose-100"
          >
            <Plus size={18} /> Add Payment
          </button>
        </div>
      </div>

      <StatsHeader data={payments} />

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="px-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm font-bold outline-none"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
          <option value="Refunded">Refunded</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                <th className="px-6 py-5">Transaction ID</th>
                <th className="px-6 py-5">Client</th>
                <th className="px-6 py-5 text-right">Amount</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredPayments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-xs text-indigo-600">{p.id}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-700">{p.client}</td>
                  <td className="px-6 py-4 text-right text-sm font-black text-slate-900">${p.amount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase border ${getStatusStyles(p.status)}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => { setCurrentPayment(p); setIsViewModalOpen(true); }} className="p-2 text-slate-400 hover:text-indigo-600 rounded-lg"><Eye size={16}/></button>
                      <button onClick={() => { setCurrentPayment(p); setIsModalOpen(true); }} className="p-2 text-slate-400 hover:text-blue-600 rounded-lg"><Edit3 size={16}/></button>
                      <button onClick={() => { setPayments(payments.filter(x => x.id !== p.id)); addToast('Deleted', 'error'); }} className="p-2 text-slate-400 hover:text-rose-600 rounded-lg"><Trash2 size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals are kept minimal for this single-page extract */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={currentPayment ? 'Edit Payment' : 'Add Payment'}>
        <form onSubmit={handleSavePayment} className="space-y-4">
           <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase">Client Name</label>
              <input name="client" required defaultValue={currentPayment?.client} className="w-full p-3 bg-slate-50 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase">Amount</label>
                <input name="amount" type="number" step="0.01" required defaultValue={currentPayment?.amount} className="w-full p-3 bg-slate-50 rounded-2xl text-sm font-bold outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase">Status</label>
                <select name="status" defaultValue={currentPayment?.status || 'Paid'} className="w-full p-3 bg-slate-50 rounded-2xl text-sm font-bold outline-none">
                  <option>Paid</option>
                  <option>Pending</option>
                  <option>Failed</option>
                </select>
              </div>
            </div>
            <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black mt-4">Save Payment</button>
        </form>
      </Modal>
    </div>
  );
};

export default PaymentPage;