import { useMemo, useState } from "react";
import { PRODUCTS, CATEGORIES } from "../data/Products";
import ProductCard from "../components/ProdutCard";

export default function Products() {
  const [category, setCategory] = useState("All");

  const filtered = useMemo(
    () =>
      PRODUCTS.filter(
        (p) => category === "All" || p.category === category
      ),
    [category]
  );

  return (
    <section className="py-16 max-w-7xl mx-auto px-4">
      <div className="flex gap-3 mb-10">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-5 py-2 rounded-full ${
              category === c
                ? "bg-indigo-600 text-white"
                : "bg-white border"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
