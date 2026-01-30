import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import Home from "./pages/Home";
import Products from "./pages/Product";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import CartProvider from "./context/CartContext"; 

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <CartDrawer />
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}
