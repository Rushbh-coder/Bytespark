import { ShoppingBag, Search, Menu, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { cart, setIsCartOpen } = useCart();
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">

        {/* LEFT */}
        <div className="flex items-center gap-10">
          {/* LOGO */}
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            BYTESPARK
          </Link>

          {/* NAV LINKS (DESKTOP) */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/" className="hover:text-indigo-600">
              Home
            </Link>
            <Link to="/products" className="hover:text-indigo-600">
              Shop
            </Link>
            <Link to="/about" className="hover:text-indigo-600">
              Our Story
            </Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* CART */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-full hover:bg-slate-100"
          >
            <ShoppingBag />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>

          {/* AUTH */}
          {!isLoggedIn ? (
            <Link
              to="/login"
              className="px-4 py-1.5 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white transition"
            >
              Login
            </Link>
          ) : (
            <div className="relative group">
              <button className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-slate-100">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`}
                  className="w-8 h-8 rounded-full border"
                  alt="avatar"
                />
                <span className="hidden sm:block text-sm">
                  {user?.name}
                </span>
              </button>

              {/* DROPDOWN */}
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                <Link
                  to=""
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  <h2 className="text-sm font-medium">{user?.email}</h2>
                </Link>
                
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            </div>
          )}

          {/* MOBILE MENU ICON */}
          <Menu className="md:hidden" />
        </div>
      </div>
    </nav>
  );
}
