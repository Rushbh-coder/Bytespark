import React, { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

const AddCategoryModal = ({ onClose, onSave, category }) => {
    const isEdit = !!category;

    const [formData, setFormData] = useState({
        name: category?.name || "",
        slug: category?.slug || "",
        parent: category?.parent || "None",
        status: category?.status || "Active",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            let res;

            if (isEdit) {
                res = await axios.put(
                    `http://localhost:5000/api/categories/${category._id}`,
                    formData,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
            } else {
                res = await axios.post(
                    "http://localhost:5000/api/categories",
                    formData,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
            }

            onSave(res.data);
            onClose();
        } catch (err) {
            alert(err.response?.data?.message || "Error saving category");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl w-[500px] p-8 shadow-xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-slate-400 hover:text-black"
                >
                    <X />
                </button>

                <h2 className="text-2xl font-black mb-6">
                    {isEdit ? "Update Category" : "Create Category"}
                </h2>

                <form onSubmit={handleSave} className="space-y-5">

                    {/* SHOW TOTAL CATEGORY */}
                    <div className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center">
                        <span className="text-xs font-black text-slate-400 uppercase">
                            Total Categories
                        </span>
                        <span className="text-lg font-black text-slate-900">
                            {categories.length}
                        </span>
                    </div>

                    {/* Category Name */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase">
                            Category Name
                        </label>
                        <input
                            name="name"
                            required
                            value={formName}
                            onChange={(e) => {
                                setFormName(e.target.value);
                                setFormSlug(generateSlug(e.target.value));
                            }}
                            placeholder="e.g. Smart Home"
                            className="w-full p-4 bg-slate-50 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Slug */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase">
                            URL Slug
                        </label>
                        <input
                            name="slug"
                            required
                            value={formSlug}
                            onChange={(e) => setFormSlug(e.target.value)}
                            placeholder="e.g. smart-home"
                            className="w-full p-4 bg-slate-50 rounded-2xl text-sm font-mono font-bold outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <p className="text-xs text-slate-400 mt-1">
                            Preview: <span className="font-mono">/category/{formSlug}</span>
                        </p>
                    </div>

                    {/* Parent + Status */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase">
                                Parent Category
                            </label>
                            <select
                                name="parent"
                                defaultValue={currentCategory?.parent || "None"}
                                className="w-full p-4 bg-slate-50 rounded-2xl text-sm font-bold outline-none"
                            >
                                <option value="None">Top Level</option>
                                {categories
                                    .filter(
                                        (c) => c.parent === "None" && c.id !== currentCategory?.id
                                    )
                                    .map((c) => (
                                        <option key={c.id} value={c.name}>
                                            {c.name}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase">
                                Status
                            </label>
                            <select
                                name="status"
                                defaultValue={currentCategory?.status || "Active"}
                                className="w-full p-4 bg-slate-50 rounded-2xl text-sm font-bold outline-none"
                            >
                                <option>Active</option>
                                <option>Scheduled</option>
                                <option>Archived</option>
                            </select>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-[2] py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-lg shadow-indigo-100"
                        >
                            {currentCategory ? "Update Category" : "Create Category"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCategoryModal;