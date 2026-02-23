import { DollarSign, Users, ShoppingBag, Star } from "lucide-react";

const DashboardView = ({ users, products }) => {
  const stats = [
    { label: "Beauty Revenue", val: "$14,820", icon: DollarSign },
    { label: "Active Clients", val: users.length, icon: Users },
    { label: "Catalog Size", val: products.length, icon: ShoppingBag },
    { label: "Satisfaction", val: "4.9/5", icon: Star },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white p-6 rounded-3xl shadow">
          <stat.icon size={20} />
          <p>{stat.label}</p>
          <h3>{stat.val}</h3>
        </div>
      ))}
    </div>
  );
};

export default DashboardView;
