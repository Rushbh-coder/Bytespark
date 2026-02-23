import React, { useState, useEffect } from "react";
import {
  Trash2,
  UserPlus,
  MoreHorizontal,
  Filter,
    Edit3,
  Users as UsersIcon,
} from "lucide-react";

import AddUserModal from "./modals/AddUserModal";
import UpdateUserModal from "./modals/UpdateUser";

const API_URL = "http://localhost:5000/api/auth/users";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  /* ================= FETCH USERS ================= */
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) return;

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  /* ================= DELETE USER ================= */
  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(users.filter((u) => u._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  /* ================= ADD USER ================= */
  const handleAddUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  /* ================= UPDATE USER ================= */
  const handleUpdateUser = (updatedUser) => {
    setUsers(
      users.map((u) =>
        u._id === updatedUser._id ? updatedUser : u
      )
    );
  };

  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900">
            Clientele 👑
          </h1>
          <p className="text-slate-400 text-sm">
            Managing {users.length} active clients
          </p>
        </div>

        <div className="flex gap-3">
          <button className="bg-white border px-5 py-3 rounded-2xl flex items-center gap-2 text-sm">
            <Filter size={18} className="text-rose-500" /> Filter
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-white border px-6 py-3 rounded-2xl flex items-center gap-3 text-sm hover:bg-slate-100 transition"
          >
            <UserPlus size={18} className="text-rose-500" /> Add Client
          </button>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-[40px] border border-rose-50 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="bg-rose-50/30 border-b border-rose-50">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Client Identity
                </th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Membership
                </th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-rose-50">
              {users.length > 0 ? (
                users.map((u) => (
                  <tr
                    key={u._id}
                    className="group hover:bg-rose-50/20 transition"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${u.name}`}
                          className="w-12 h-12 rounded-2xl bg-rose-50 p-1 border"
                          alt={u.name}
                        />
                        <div>
                          <p className="font-bold text-slate-800 text-sm">
                            {u.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            {u.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-8 py-5">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-slate-50 text-slate-500 border">
                        {u.role}
                      </span>
                    </td>

                    <td className="px-8 py-5">
                      <span className="text-xs font-bold text-emerald-600">
                        Active
                      </span>
                    </td>

                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition">
                        <button
                          onClick={() => setSelectedUser(u)}
                          className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl"
                        >
                          <Edit3  size={18} />
                        </button>

                        <button
                          onClick={() => setDeleteId(u._id)}
                          className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-20 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-300 mb-4">
                        <UsersIcon size={32} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">
                        No Clients Found
                      </h3>
                      <button
                        onClick={() => setShowAddModal(true)}
                        className="mt-6 text-rose-500 font-black text-sm hover:underline uppercase"
                      >
                        + Add Your First Client
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= ADD USER MODAL ================= */}
      {showAddModal && (
        <AddUserModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddUser}
        />
      )}

      {/* ================= UPDATE USER MODAL ================= */}
      {selectedUser && (
        <UpdateUserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onUpdate={handleUpdateUser}
        />
      )}

      {/* ================= DELETE CONFIRM MODAL ================= */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-[400px] shadow-xl">
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              Delete Client
            </h2>

            <p className="text-slate-500 text-sm mb-6">
              Are you sure you want to delete this client?
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-5 py-2 rounded-xl border text-sm"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  await deleteUser(deleteId);
                  setDeleteId(null);
                }}
                className="px-5 py-2 rounded-xl bg-rose-500 text-white text-sm hover:bg-rose-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;