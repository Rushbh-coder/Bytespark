
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext"; 

export default function CartDrawer() {
  const { cart, setCart, isCartOpen, setIsCartOpen } = useCart();

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const closeDrawer = () => setIsCartOpen(false);

  const checkout = () => {
    console.log("Checkout clicked", cart);
    
  };

  if (!isCartOpen) return null; 

  return (
    <div className="fixed inset-0 z-50 flex">
     
      <div className="flex-1 bg-black/60" onClick={closeDrawer} />

      <div className="w-full max-w-md bg-white p-6 relative">
        <button onClick={closeDrawer} className="absolute top-4 right-4 z-10">
          <X />
        </button>

        <h2 className="text-xl font-bold mb-4">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">Cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-4">
              <span>{item.name}</span>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQty(item.id, -1)}>
                  <Minus size={14} />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQty(item.id, 1)}>
                  <Plus size={14} />
                </button>
                <button onClick={() => removeItem(item.id)}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}

        <div className="font-bold mt-6">Total: ${total}</div>

        <button
          onClick={checkout}
          className="w-full mt-4 bg-indigo-600 text-white py-3 rounded-xl"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
