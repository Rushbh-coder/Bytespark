import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  PackagePlus,
  Trash2,
  Star,
  FileUp,
  ShoppingBag,
  Plus,
  Search,
} from "lucide-react";

import AddProductModal from "./modals/AddProductModel";
import ImportCSVModal from "./modals/ImportCsv";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("latest");
  const API = "http://localhost:5000/api/products";

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(API);
      setProducts(data);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  /* ================= ADD PRODUCT ================= */
  const addProduct = async (newProduct) => {
    try {
      const { data } = await axios.post(API, newProduct);
      setProducts((prev) => [data, ...prev]);
      setShowModal(false);
    } catch (error) {
      console.error("Add Error:", error);
    }
  };

  /* ================= DELETE PRODUCT ================= */
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await axios.delete(`${API}/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  /* ================= CATEGORY LIST ================= */
  const categories = useMemo(() => {
    const unique = ["All", ...new Set(products.map((p) => p.category))];
    return unique;
  }, [products]);

  /* ================= FILTER & SORT ================= */
  const filteredProducts = useMemo(() => {
    let data = [...products];

    if (search) {
      data = data.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categoryFilter !== "All") {
      data = data.filter((p) => p.category === categoryFilter);
    }

    if (sortOption === "priceLow") {
      data.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHigh") {
      data.sort((a, b) => b.price - a.price);
    }

    return data;
  }, [products, search, categoryFilter, sortOption]);

  return (
    <div className="space-y-8 p-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black">Product Collections</h1>
          <p className="text-sm text-gray-400">
            Managing {products.length} products
          </p>
        </div>

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => setShowImportModal(true)}
            className="bg-white border px-5 py-2 rounded-xl flex items-center gap-2"
          >
            <FileUp size={16} className="text-rose-500" />
            Import CSV
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="bg-white border px-5 py-2 rounded-xl flex items-center gap-2"
          >
            <PackagePlus size={16} className="text-rose-500" />
            Add Product
          </button>
        </div>
      </div>

      {/* ================= FILTERS ================= */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center border rounded-xl px-3 py-2">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search products..."
            className="outline-none ml-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border rounded-xl px-4 py-2"
        >
          {categories.map((cat, i) => (
            <option key={i}>{cat}</option>
          ))}
        </select>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border rounded-xl px-4 py-2"
        >
          <option value="latest">Latest</option>
          <option value="priceLow">Price: Low → High</option>
          <option value="priceHigh">Price: High → Low</option>
        </select>
      </div>

      {/* ================= GRID ================= */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-3xl shadow hover:shadow-xl transition p-4 flex flex-col"
            >
              <div className="h-56 bg-gray-100 rounded-2xl overflow-hidden relative">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover"
                />

                <button
                  onClick={() => deleteProduct(p._id)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-xl text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="mt-4 flex-1 flex flex-col">
                <div className="flex justify-between">
                  <h3 className="font-bold">{p.title}</h3>
                  <div className="flex items-center text-yellow-500">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs ml-1">{p.rating}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-400 mt-2 line-clamp-2 flex-1">
                  {p.description}
                </p>

                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xl font-black">${p.price}</span>
                  <button className="bg-pink-100 text-pink-600 p-2 rounded-xl">
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <ShoppingBag size={40} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-bold">No Products Found</h3>
        </div>
      )}

      {/* ================= MODALS ================= */}
      {showModal && (
        <AddProductModal
          onClose={() => setShowModal(false)}
          onAdd={addProduct}
        />
      )}

      {showImportModal && (
        <ImportCSVModal
          onClose={() => setShowImportModal(false)}
          onImport={(newProducts) =>
            setProducts((prev) => [...prev, ...newProducts])
          }
        />
      )}
    </div>
  );
};

export default Products;