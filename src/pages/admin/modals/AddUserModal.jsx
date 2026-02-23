import axios from "axios";
import React, { useEffect, useState } from "react";
import { X, User, Mail, ShieldCheck, Lock, Eye, EyeOff } from "lucide-react";

const AddUserModal = ({ onClose, onAdd }) => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      onAdd(res.data.user);
      onClose();
    } catch (error) {
      alert(error.response?.data?.message || "Error adding user");
    }
  };
useEffect(() => {
    fetch("http://localhost:5000/api/auth/users", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,     
        },
    })
      .then((res) => res.json())
      .then((data) => console.log("Users:", data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 animate-scaleIn border border-white/40">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-black transition"
        >
          <X size={22} />
        </button>

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Create New User
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Add a new member to your system.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-4 text-gray-400" size={18} />
              <input
                type="text"
                name="name"
                required
                placeholder="John Doe"
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-4 text-gray-400" size={18} />
              <input
                type="email"
                name="email"
                required
                placeholder="john@example.com"
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-4 text-gray-400" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Enter secure password"
                className="w-full pl-12 pr-12 py-4 rounded-2xl border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              Role
            </label>
            <div className="relative">
              <ShieldCheck className="absolute left-4 top-4 text-gray-400" size={18} />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition-all shadow-lg"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;