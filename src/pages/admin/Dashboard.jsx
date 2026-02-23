import React from "react";
import {
  DollarSign,
  Users,
  ShoppingBag,
  Star,
  TrendingUp,
  ShoppingCart,
  Calendar,
  Mail,
  ShieldCheck,
} from "lucide-react";

const Dashboard = () => {

  const stats = [
    { label: "Total Revenue", value: "$14,820", icon: DollarSign, trend: "+12%" },
    { label: "Active Users", value: "120", icon: Users, trend: "+4%" },
    { label: "Products", value: "48", icon: ShoppingBag, trend: "+2%" },
    { label: "Avg Rating", value: "4.9/5", icon: Star, trend: "+0.2%" },
  ];

  const recentOrders = [
    { id: "#1024", customer: "Emma Watson", total: "$240", status: "Completed" },
    { id: "#1025", customer: "Sophia Lee", total: "$120", status: "Pending" },
    { id: "#1026", customer: "Olivia Brown", total: "$89", status: "Completed" },
    { id: "#1027", customer: "Liam Smith", total: "$300", status: "Cancelled" },
  ];

  const topProducts = [
    { name: "Luxury Face Cream", sales: 320 },
    { name: "Matte Lipstick Set", sales: 270 },
    { name: "Organic Serum", sales: 210 },
  ];

  return (
    <div className="p-8 space-y-10">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900">
            Good Morning, Admin!
          </h1>
          <p className="text-slate-500 mt-1">
            Here's your boutique performance overview.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow hover:shadow-xl transition">
            <div className="flex justify-between items-center">
              <stat.icon className="text-rose-500" size={24} />
              <span className="text-xs font-bold text-green-500">
                {stat.trend}
              </span>
            </div>
            <p className="text-slate-400 mt-4 text-sm">{stat.label}</p>
            <h3 className="text-2xl font-black text-slate-900">
              {stat.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="bg-white rounded-3xl p-8 shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-lg">Revenue Overview</h2>
          <TrendingUp className="text-rose-500" />
        </div>
        <div className="h-64 bg-gradient-to-r from-rose-50 to-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
          Chart Area (Connect Recharts Here)
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Recent Orders */}
        <div className="bg-white rounded-3xl p-6 shadow">
          <h2 className="font-bold text-lg mb-4">Recent Orders</h2>
          <table className="w-full text-sm">
            <thead className="text-slate-400 text-xs uppercase">
              <tr>
                <th className="text-left py-2">Order</th>
                <th className="text-left py-2">Customer</th>
                <th className="text-left py-2">Total</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, i) => (
                <tr key={i} className="border-t">
                  <td className="py-2">{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.total}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === "Completed"
                        ? "bg-green-100 text-green-600"
                        : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-3xl p-6 shadow">
          <h2 className="font-bold text-lg mb-4">Top Selling Products</h2>
          <div className="space-y-4">
            {topProducts.map((product, i) => (
              <div key={i} className="flex justify-between items-center">
                <p className="font-medium">{product.name}</p>
                <span className="text-sm text-slate-400">
                  {product.sales} sales
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Section */}
      <div className="bg-white rounded-3xl p-6 shadow">
        <h2 className="font-bold text-lg mb-4">Recent Activity</h2>
        <div className="space-y-4 text-sm">
          <div className="flex items-center gap-3">
            <ShoppingCart size={16} className="text-rose-500" />
            <span>New order placed by Emma Watson</span>
          </div>
          <div className="flex items-center gap-3">
            <Users size={16} className="text-rose-500" />
            <span>New user registered</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={16} className="text-rose-500" />
            <span>Newsletter sent to subscribers</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck size={16} className="text-rose-500" />
            <span>System security updated</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
