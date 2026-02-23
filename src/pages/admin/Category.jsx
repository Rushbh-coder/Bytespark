import React, { useState, useEffect, useMemo } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  FolderTree,
  LayoutGrid,
  CheckCircle2,
  Package,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/categories";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      // Using custom notification instead of alert is preferred, 
      // but keeping functional parity with original logic
      console.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };
 
 


  /* ================= STATS ================= */
  const stats = useMemo(() => {
    return {
      total: categories.length,
      active: categories.filter(c => c.status === "Active").length,
      items: categories.reduce((sum, c) => sum + (c.items || 0), 0)
    };
  }, [categories]);

  /* ================= FILTER ================= */
  const filteredCategories = useMemo(() => {
    return categories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categories, searchTerm]);

  /* ================= SAVE ================= */
  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const payload = {
      name: formData.get("name"),
      slug: formData.get("slug"),
      parent:
        formData.get("parent") === "None"
          ? null
          : formData.get("parent"),
      status: formData.get("status"),
      items: Number(formData.get("items") || 0),
    };

    try {
      const method = currentCategory ? "PUT" : "POST";
      const url = currentCategory ? `${API_URL}/${currentCategory._id}` : API_URL;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        fetchCategories();
        setIsModalOpen(false);
        setCurrentCategory(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    // Note: In an iframe environment, standard confirms might be blocked.
    // Ideally use a custom modal. 
    if (!window.confirm("Delete this category?")) return;

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchCategories();
    } catch (err) {
      console.error("Delete failed");
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 bg-slate-50 min-h-screen">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Categories
          </h1>
          <p className="text-slate-500 text-sm">
            Organize and manage your inventory hierarchy
          </p>
        </div>

        <button
          onClick={() => {
            setCurrentCategory(null);
            setIsModalOpen(true);
          }}
          className="bg-slate-900 text-white px-6 py-3 rounded-2xl flex items-center gap-2 text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
        >
          <Plus size={18} /> Add Category
        </button>
      </div>

      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
            <LayoutGrid size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Categories</p>
            <h3 className="text-2xl font-black text-slate-900">{stats.total}</h3>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Active</p>
            <h3 className="text-2xl font-black text-slate-900">{stats.active}</h3>
          </div>
         
        </div>
         <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
            <Package size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Products</p>
            <h3 className="text-2xl font-black text-slate-900">{stats.items}</h3>
          </div>
         
        </div>

      </div>

      {/* ================= SEARCH & FILTERS ================= */}
      <div className="relative max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          placeholder="Search by name or slug..."
          className="w-full pl-12 pr-4 py-3 rounded-2xl border-none bg-white shadow-sm focus:ring-2 focus:ring-slate-200 transition-all outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-6 text-xs font-bold uppercase text-slate-400 tracking-widest">
                  Category
                </th>
                <th className="px-8 py-6 text-xs font-bold uppercase text-slate-400 tracking-widest">
                  Parent
                </th>
                <th className="px-8 py-6 text-xs font-bold uppercase text-slate-400 tracking-widest">
                  Items
                </th>
                <th className="px-8 py-6 text-xs font-bold uppercase text-slate-400 tracking-widest">
                  Status
                </th>
                <th className="px-8 py-6 text-xs font-bold uppercase text-slate-400 tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin"></div>
                        <span className="text-slate-400 font-medium">Loading inventory...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredCategories.length > 0 ? (
                filteredCategories.map((cat) => (
                  <tr key={cat._id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800">{cat.name}</span>
                        <span className="text-xs text-slate-400 font-mono tracking-tight">{cat.slug}</span>
                      </div>
                    </td>

                    <td className="px-8 py-5">
                      {cat.parent ? (
                          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
                            <FolderTree size={12} />
                            {cat.parent.name}
                          </span>
                      ) : (
                        <span className="text-slate-300 text-sm">Root</span>
                      )}
                    </td>

                    <td className="px-8 py-5">
                      <span className="font-semibold text-slate-700">{cat.items || 0}</span>
                    </td>

                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full ${
                        cat.status === 'Active' 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-slate-100 text-slate-500'
                      }`}>
                        {cat.status}
                      </span>
                    </td>

                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => {
                            setCurrentCategory(cat);
                            setIsModalOpen(true);
                          }}
                          className="p-2 hover:bg-white hover:shadow-md text-slate-600 rounded-xl transition-all"
                        >
                          <Edit size={16} />
                        </button>

                        <button
                          onClick={() => handleDelete(cat._id)}
                          className="p-2 hover:bg-rose-50 text-rose-400 hover:text-rose-600 rounded-xl transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-24 text-center">
                    <FolderTree
                      size={48}
                      className="mx-auto text-slate-200 mb-4"
                    />
                    <p className="text-slate-400 font-medium tracking-tight text-lg">No Categories Found</p>
                    <p className="text-slate-300 text-sm">Try adjusting your search or add a new one.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2.5rem] p-10 w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="mb-8">
                <h2 className="text-2xl font-black text-slate-900">
                  {currentCategory ? "Update Category" : "New Category"}
                </h2>
                <p className="text-slate-400 text-sm mt-1">Configure your category details below.</p>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Name</label>
                <input
                  name="name"
                  placeholder="e.g. Electronics"
                  defaultValue={currentCategory?.name}
                  required
                  className="w-full border-slate-100 bg-slate-50 rounded-2xl px-5 py-3 focus:bg-white focus:ring-2 focus:ring-slate-100 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Slug</label>
                <input
                  name="slug"
                  placeholder="e.g. electronics-gear"
                  defaultValue={currentCategory?.slug}
                  required
                  className="w-full border-slate-100 bg-slate-50 rounded-2xl px-5 py-3 focus:bg-white focus:ring-2 focus:ring-slate-100 outline-none transition-all font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Parent</label>
                  <select
                    name="parent"
                    defaultValue={currentCategory?.parent?._id || "None"}
                    className="w-full border-slate-100 bg-slate-50 rounded-2xl px-5 py-3 focus:bg-white focus:ring-2 focus:ring-slate-100 outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="None">None (Root)</option>
                    {categories
                      .filter((c) => !c.parent && c._id !== currentCategory?._id)
                      .map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Items</label>
                  <input
                    type="number"
                    name="items"
                    placeholder="0"
                    defaultValue={currentCategory?.items || 0}
                    className="w-full border-slate-100 bg-slate-50 rounded-2xl px-5 py-3 focus:bg-white focus:ring-2 focus:ring-slate-100 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Visibility Status</label>
                <div className="flex gap-2">
                   {["Active", "Inactive"].map((status) => (
                      <label key={status} className="flex-1 cursor-pointer group">
                        <input 
                          type="radio" 
                          name="status" 
                          value={status} 
                          className="hidden peer" 
                          defaultChecked={(currentCategory?.status || "Active") === status}
                        />
                        <div className="text-center py-3 rounded-2xl border-2 border-transparent bg-slate-50 peer-checked:bg-slate-900 peer-checked:text-white transition-all text-sm font-bold text-slate-500">
                          {status}
                        </div>
                      </label>
                   ))}
                </div>
              </div>

              <div className="flex gap-3 pt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-5 py-4 border-2 border-slate-100 text-slate-400 font-bold rounded-2xl hover:bg-slate-50 transition-all"
                >
                  Discard
                </button>

                <button
                  type="submit"
                  className="flex-[2] px-5 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 shadow-xl shadow-slate-200 transition-all"
                >
                  {currentCategory ? "Update Category" : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;