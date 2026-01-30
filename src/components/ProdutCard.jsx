import { Star } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <img src={product.image} className="h-64 w-full object-cover rounded-xl mb-4" />
      <h3 className="font-bold text-lg">{product.name}</h3>
      <p className="text-slate-500 text-sm mb-2">{product.description}</p>
      <p className="text-indigo-600 font-bold mb-4">${product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="w-full bg-slate-900 text-white py-3 rounded-lg"
      >
        Add to Cart
      </button>
    </div>
  );
}
