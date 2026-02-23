import { PackagePlus, Edit2, Trash2, Star } from "lucide-react";

const ProductsView = ({
  products,
  deleteProduct,
  setShowProductModal,
}) => {
  return (
    <div className="space-y-8">

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900">
            Product Collections
          </h1>
          <p className="text-slate-400 text-sm italic">
            Manage your premium stock
          </p>
        </div>

        <button
          onClick={() => setShowProductModal(true)}
          className="bg-slate-900 text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-xl"
        >
          <PackagePlus size={18} /> New Entry
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-[40px] border border-rose-50 p-4 shadow hover:shadow-xl transition-all"
          >
            <div className="h-64 rounded-[32px] overflow-hidden bg-slate-100 relative">
              <img
                src={p.image}
                className="w-full h-full object-cover"
                alt={p.title}
              />

              <button
                onClick={() => deleteProduct(p.id)}
                className="absolute top-4 right-4 bg-white rounded-xl p-2 hover:bg-rose-500 hover:text-white"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="pt-6">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg">
                  {p.title}
                </h3>

                <div className="flex items-center gap-1 text-amber-400">
                  <Star size={14} fill="currentColor" />
                  <span className="text-xs text-slate-400">
                    {p.rating}
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-400 mt-2 line-clamp-2">
                {p.description}
              </p>

              <div className="flex justify-between items-center mt-6">
                <p className="text-2xl font-black">
                  ${p.price.toFixed(2)}
                </p>

                <button className="bg-rose-50 p-2 rounded-xl hover:bg-rose-500 hover:text-white">
                  <Edit2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsView;
