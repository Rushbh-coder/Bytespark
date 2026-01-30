import { ShoppingBag, Search, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart, setIsCartOpen } = useCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
     
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-2xl font-bold tracking-tighter text-indigo-600"
            >
              BYTESPARK
              <span className="text-slate-400 font-light ml-1 text-sm uppercase tracking-widest">
                Care
              </span>
            </Link>

            <div className="hidden md:flex space-x-8 text-sm font-medium">
              <Link to="/" className="text-indigo-600">
                Home
              </Link>
              <Link to="/about" className="hover:text-indigo-500">
                Our Story
              </Link>
              <Link to="/products" className="hover:text-indigo-500">
                Shop All
              </Link>
            </div>
          </div>

    
          <div className="flex items-center gap-4">
            
        
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 bg-slate-100 rounded-full text-sm focus:ring-2 focus:ring-indigo-500 w-48 lg:w-64 transition-all"
              />
            </div>

         
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <ShoppingBag className="w-6 h-6" />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {count}
                </span>
              )}
            </button>

           
            <button className="md:hidden p-2">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
