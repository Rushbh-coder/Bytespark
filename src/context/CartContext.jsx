
import { createContext, useContext, useState } from "react";


const CartContext = createContext();


export const useCart = () => useContext(CartContext);


export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart((c) => {
      const found = c.find((i) => i.id === product.id);
      return found
        ? c.map((i) =>
            i.id === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        : [...c, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, cartTotal, isCartOpen, setIsCartOpen }}
    >
      {children}
    </CartContext.Provider>
  );
}
