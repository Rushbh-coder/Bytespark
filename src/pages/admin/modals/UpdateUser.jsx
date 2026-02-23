import axios from "axios";
import React, { useState, useEffect } from "react";
import { X, Eye, EyeOff } from "lucide-react";

const UpdateUserModal = ({ user, onClose, onUpdate }) => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: "",
        role: user.role,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const updatedData = { ...formData };
      if (!updatedData.password) delete updatedData.password;

      const res = await axios.put(
        `http://localhost:5000/api/auth/users/${user._id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onUpdate(res.data);
      onClose();
    } catch (error) {
      alert(error.response?.data?.message || "Error updating user");
    }
  };

  if (!user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-8 rounded-3xl w-[450px] relative shadow-xl">
        <button onClick={onClose} className="absolute top-4 right-4">
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Update User ✏️</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl" />

          <input name="email" value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl" />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Leave blank to keep password"
              className="w-full p-3 border rounded-xl"
              onChange={handleChange}
            />
            <button type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <select name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl">
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl">
            Save Changes 💾
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserModal;