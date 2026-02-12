import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";

import Home from "./pages/Home";
import Products from "./pages/Product";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";

import CartProvider from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";
import Adminpanel from "./pages/admin/Adminpanel";

function Layout() {
  const location = useLocation();

  // ❌ Pages where Navbar & Footer should NOT show
  const hideLayout =
    location.pathname === "/login" ||
    location.pathname.startsWith("/admin");

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <Adminpanel />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!hideLayout && <CartDrawer />}
      {!hideLayout && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Layout />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
