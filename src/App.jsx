import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  Star, 
  Trash2, 
  Plus, 
  Minus,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw
} from 'lucide-react';

// --- PRODUCT DATA ---
const PRODUCTS = [
  {
    id: 1,
    name: "Radiance Vitamin C Serum",
    category: "Skincare",
    price: 45,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400",
    description: "Brighten your complexion with our potent Vitamin C serum, enriched with Hyaluronic Acid for deep hydration.",
    tags: ["Organic", "Vegan"]
  },
  {
    id: 2,
    name: "Hydrating Coconut Shampoo",
    category: "Haircare",
    price: 28,
    rating: 4.7,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=400",
    description: "Infused with organic coconut milk to nourish and strengthen your hair from root to tip.",
    tags: ["Sulfate-Free"]
  },
  {
    id: 3,
    name: "Lavender Sleep Mask",
    category: "Bodycare",
    price: 32,
    rating: 4.9,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=400",
    description: "A calming overnight mask infused with essential lavender oils for a restful sleep and soft skin.",
    tags: ["Best Seller"]
  },
  {
    id: 4,
    name: "Botanical Face Oil",
    category: "Skincare",
    price: 54,
    rating: 4.6,
    reviews: 76,
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=400",
    description: "A blend of 12 rare botanical oils to rejuvenate tired skin and provide a natural glow.",
    tags: ["Premium"]
  },
  {
    id: 5,
    name: "Charcoal Detox Cleanser",
    category: "Skincare",
    price: 24,
    rating: 4.5,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1556227702-d1e4e7b5c232?auto=format&fit=crop&q=80&w=400",
    description: "Deeply cleanse pores and remove impurities with activated bamboo charcoal.",
    tags: ["Oily Skin"]
  },
  {
    id: 6,
    name: "Sea Salt Texturizing Spray",
    category: "Haircare",
    price: 22,
    rating: 4.4,
    reviews: 63,
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=400",
    description: "Get beachy waves instantly with our mineral-rich sea salt spray.",
    tags: ["Style"]
  }
];

const CATEGORIES = ["All", "Skincare", "Haircare", "Bodycare"];

export default function App() {
  const [view, setView] = useState('home'); // 'home', 'products', 'checkout'
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Inject Tailwind via script for environment compatibility
  useEffect(() => {
    if (!document.getElementById('tailwind-cdn')) {
      const script = document.createElement('script');
      script.id = 'tailwind-cdn';
      script.src = 'https://cdn.tailwindcss.com';
      document.head.appendChild(script);
    }
  }, []);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Cart Logic
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-full bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <h1 
                className="text-2xl font-bold tracking-tighter text-indigo-600 cursor-pointer"
                onClick={() => setView('home')}
              >
                BYTESPARK<span className="text-slate-400 font-light ml-1 text-sm uppercase tracking-widest">Care</span>
              </h1>
              <div className="hidden md:flex space-x-8 text-sm font-medium">
                <button onClick={() => setView('home')} className={view === 'home' ? 'text-indigo-600' : 'hover:text-indigo-500'}>Home</button>
                <button onClick={() => setView('about')} className={view === 'about' ? 'text-indigo-600' : 'hover:text-indigo-500'}>Our story</button>
                <button onClick={() => setView('products')} className={view === 'products' ? 'text-indigo-600' : 'hover:text-indigo-500'}>Shop All</button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-indigo-500 w-48 lg:w-64 transition-all"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (view !== 'products') setView('products');
                  }}
                />
              </div>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <ShoppingBag className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                    {cartCount}
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

      {/* Main Content */}
      <main>
        {view === 'home' && (
          <>
            {/* Hero Section */}
            <section className="relative h-[85vh] flex items-center overflow-hidden bg-slate-900">
              <img 
                src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=2000" 
                className="absolute inset-0 w-full h-full object-cover opacity-50"
                alt="Hero Background"
              />
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
                <div className="max-w-2xl">
                  <span className="inline-block px-4 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-sm font-semibold mb-6">
                    New Collection 2026
                  </span>
                  <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    Science-Backed <br />
                    <span className="text-indigo-400">Personal Care</span>
                  </h2>
                  <p className="text-lg text-slate-300 mb-8 max-w-lg">
                    Premium formulas designed to nourish your skin and hair using organic ingredients and cutting-edge biotechnology.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={() => setView('products')}
                      className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition-all transform hover:scale-105 flex items-center gap-2"
                    >
                      Shop Now <ArrowRight className="w-5 h-5" />
                    </button>
                    <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-lg font-bold transition-all">
                      Our Philosophy
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Features */}
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50">
                    <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
                      <Truck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Free Shipping</h4>
                      <p className="text-sm text-slate-500 text-balance">On all orders over $50 with eco-friendly packaging.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50">
                    <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">100% Organic</h4>
                      <p className="text-sm text-slate-500 text-balance">Dermatologically tested and certified organic ingredients.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50">
                    <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
                      <RotateCcw className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Easy Returns</h4>
                      <p className="text-sm text-slate-500 text-balance">30-day money-back guarantee if you're not satisfied.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {view === 'products' && (
          <section className="py-12 min-h-[70vh]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Our Products</h2>
                  <p className="text-slate-500">Discover our collection of curated personal care essentials.</p>
                </div>
                
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                        selectedCategory === cat 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map(product => (
                    <div key={product.id} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all">
                      <div className="relative aspect-[4/5] overflow-hidden bg-slate-200">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          {product.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-wider rounded-md shadow-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-xs text-indigo-500 font-bold uppercase tracking-widest mb-1">{product.category}</p>
                            <h3 className="font-bold text-lg leading-tight">{product.name}</h3>
                          </div>
                          <p className="text-xl font-bold text-indigo-600">${product.price}</p>
                        </div>
                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                          ))}
                          <span className="text-xs text-slate-400 ml-1">({product.reviews} reviews)</span>
                        </div>
                        <p className="text-sm text-slate-500 mb-6 line-clamp-2">{product.description}</p>
                        <button 
                          onClick={() => addToCart(product)}
                          className="w-full py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No products found</h3>
                  <p className="text-slate-500">Try adjusting your filters or search query.</p>
                </div>
              )}
            </div>
          </section>
        )}

        {view === 'checkout' && (
           <section className="py-20 flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
              <div className="bg-green-100 p-4 rounded-full mb-6">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
              <h2 className="text-4xl font-bold mb-4">Order Confirmed!</h2>
              <p className="text-slate-500 mb-8 max-w-md">Thank you for shopping with Bytespark Personal Care. Your order #BS-8392 is being prepared for shipment.</p>
              <button 
                onClick={() => { setView('home'); setCart([]); }}
                className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all"
              >
                Return to Home
              </button>
           </section>
        )}
      {view === 'about' && (
  <div>
    {/* Hero Section */}
    <section className="relative py-24 bg-indigo-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-indigo-400 font-bold uppercase tracking-[0.3em] text-sm mb-4">
            Our Journey
          </h1>
          <h2 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-8">
            Crafting the <br />
            <span className="text-indigo-300">Future of Flow.</span>
          </h2>
          <p className="text-xl text-slate-300 leading-relaxed">
            ByteSpark started with a simple vision: to redefine how water moves through modern spaces.
          </p>
        </div>
      </div>
    </section>

    {/* Stats Section */}
    <section className="py-20 -mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { value: "12+", label: "Years Experience" },
          { value: "500+", label: "Global Partners" },
          { value: "1M+", label: "Items Shipped" },
          { value: "24/7", label: "Client Support" },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white p-10 rounded-[2.5rem] shadow-xl border text-center hover:-translate-y-2 transition-all"
          >
            <p className="text-4xl font-bold text-indigo-600 mb-2">{item.value}</p>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>

    {/* Values Section */}
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Values that Drive Us</h2>
        <p className="text-slate-500 mb-12">
          Every product we engineer is rooted in our principles.
        </p>

        <div className="grid md:grid-cols-3 gap-12 text-left bg-slate-50 p-10 rounded-2xl shadow-lg">
          <div className="bg-indigo-100 rounded-lg p-2 gap-5">
            <ShieldCheck className="w-10 h-10 text-indigo-600 mb-4 " />
            <h3 className="text-xl font-bold mb-2">Uncompromising Quality</h3>
            <p className="text-slate-500 text-sm">
              High-grade materials ensuring lifetime durability.
            </p>
          </div>

          <div className="bg-indigo-100 rounded-lg p-2 gap-5">
            <RotateCcw className="w-10 h-10 text-indigo-600 mb-4 bg-indigo-100 rounded-full p-2" />
            <h3 className="text-xl font-bold mb-2">Sustainability First</h3>
            <p className="text-slate-500 text-sm">
              Eco-flow technology reducing water usage by 30%.
            </p>
          </div>

          <div className="bg-indigo-100 rounded-lg p-2 gap-5">
            <CheckCircle className="w-10 h-10 text-indigo-600 mb-4 bg-indigo-100 rounded-full p-2" />
            <h3 className="text-xl font-bold mb-2">Client Partnership</h3>
            <p className="text-slate-500 text-sm">
              Custom solutions for architects and builders.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="py-24 bg-slate-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
                <div class="max-w-xl">
                    <h2 class="text-3xl font-bold mb-4">Our Leadership</h2>
                    <p class="text-slate-500">Meet the visionaries behind ByteSpark's commitment to excellence and innovation in the sanitary industry.</p>
                </div>
                <button class="bg-white border border-slate-200 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all">Join our Team</button>
            </div>

            <div class="grid md:grid-cols-3 gap-8">

                <div class="group">
                    <div class="relative rounded-3xl overflow-hidden mb-6 aspect-[4/5]">
                        <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400" alt="CEO" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                        <div class="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                            <div class="flex gap-4 text-white">
                                <a href="#"><i data-lucide="linkedin" class="w-5 h-5"></i></a>
                                <a href="#"><i data-lucide="twitter" class="w-5 h-5"></i></a>
                            </div>
                        </div>
                    </div>
                    <h4 class="text-xl font-bold text-slate-900">David Chen</h4>
                    <p class="text-indigo-600 font-bold text-sm">Founder & CEO</p>
                </div>
               
                <div class="group">
                    <div class="relative rounded-3xl overflow-hidden mb-6 aspect-[4/5]">
                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" alt="COO" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div class="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                            <div class="flex gap-4 text-white">
                                <a href="#"><i data-lucide="linkedin" class="w-5 h-5"></i></a>
                                <a href="#"><i data-lucide="globe" class="w-5 h-5"></i></a>
                            </div>
                        </div>
                    </div>
                    <h4 class="text-xl font-bold text-slate-900">Sarah Jenkins</h4>
                    <p class="text-indigo-600 font-bold text-sm">Head of Operations</p>
                </div>
                
                <div class="group">
                    <div class="relative rounded-3xl overflow-hidden mb-6 aspect-[4/5]">
                        <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400" alt="CTO" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                        <div class="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                            <div class="flex gap-4 text-white">
                                <a href="#"><i data-lucide="linkedin" class="w-5 h-5"></i></a>
                                <a href="#"><i data-lucide="mail" class="w-5 h-5"></i></a>
                            </div>
                        </div>
                    </div>
                    <h4 class="text-xl font-bold text-slate-900">Marcus Thorne</h4>
                    <p class="text-indigo-600 font-bold text-sm">Chief Design Officer</p>
                </div>
            </div>
        </div>
    </section>
  </div>
)}

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <h1 className="text-2xl font-bold tracking-tighter text-white mb-6">
                BYTESPARK<span className="text-slate-500 font-light ml-1 text-sm uppercase">Care</span>
              </h1>
              <p className="text-slate-400 text-sm leading-relaxed">
                Empowering your self-care journey with science and nature. Sustainable, effective, and ethically sourced.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-500">Shop</h5>
              <ul className="space-y-4 text-sm text-slate-300">
                <li><button onClick={() => { setView('products'); setSelectedCategory('Skincare'); }}>Skincare</button></li>
                <li><button onClick={() => { setView('products'); setSelectedCategory('Haircare'); }}>Haircare</button></li>
                <li><button onClick={() => { setView('products'); setSelectedCategory('Bodycare'); }}>Bodycare</button></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-500">Company</h5>
              <ul className="space-y-4 text-sm text-slate-300">
                <li><button>About Us</button></li>
                <li><button>Sustainability</button></li>
                <li><button>Contact</button></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-500">Newsletter</h5>
              <p className="text-sm text-slate-400 mb-4">Join for 15% off your first order.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Email" className="bg-white/10 border-none rounded-lg px-4 py-2 text-sm flex-1 focus:ring-2 focus:ring-indigo-500" />
                <button className="bg-white text-slate-900 px-4 py-2 rounded-lg font-bold text-sm">Join</button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© 2026 Bytespark Personal Care. Developed for Internship Task.</p>
            <div className="flex gap-8">
              <button>Privacy Policy</button>
              <button>Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col animate-slide-in">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-indigo-600" />
                Your Cart
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length > 0 ? (
                <div className="space-y-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-24 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-sm">{item.name}</h4>
                          <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-red-500">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-slate-400 mb-3">{item.category}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3 bg-slate-100 rounded-lg px-2 py-1">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-indigo-600"><Minus className="w-3 h-3" /></button>
                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-indigo-600"><Plus className="w-3 h-3" /></button>
                          </div>
                          <p className="font-bold text-sm text-indigo-600">${item.price * item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-10 h-10 text-slate-200" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Your cart is empty</h3>
                  <p className="text-sm text-slate-500 mt-1 mb-6">Looks like you haven't added anything yet.</p>
                  <button 
                    onClick={() => { setIsCartOpen(false); setView('products'); }}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold text-sm"
                  >
                    Start Shopping
                  </button>
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t bg-slate-50">
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>Subtotal</span>
                    <span>${cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t text-slate-900">
                    <span>Total</span>
                    <span>${cartTotal}</span>
                  </div>
                </div>
                <button 
                  onClick={() => { setIsCartOpen(false); setView('checkout'); }}
                  className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
                >
                  Checkout Now <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Global CSS for Animations */}
      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}