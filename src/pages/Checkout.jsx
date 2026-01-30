import { CheckCircle } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { setCart } = useCart();
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center text-center">
      <div>
        <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
        <h2 className="text-4xl font-bold mb-4">Order Confirmed</h2>
        <button
          onClick={() => {
            setCart([]);
            navigate("/");
          }}
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg"
        >
          Back to Home
        </button>
      </div>
    </section>
  );
}
