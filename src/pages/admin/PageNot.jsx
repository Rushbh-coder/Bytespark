import React, { useEffect, useState } from 'react';
import { Home, ArrowLeft, Search, MoveRight, HelpCircle, Sparkles } from 'lucide-react';

const Pagenot = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDFE] flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden font-sans antialiased">
      
      {/* Decorative Pink & Rose Gradient Blobs */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute -top-[5%] -left-[5%] w-[45%] h-[45%] bg-pink-400/10 blur-[130px] rounded-full transition-transform duration-700 ease-out"
          style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
        />
        <div 
          className="absolute -bottom-[5%] -right-[5%] w-[45%] h-[45%] bg-rose-400/10 blur-[130px] rounded-full transition-transform duration-700 ease-out"
          style={{ transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)` }}
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        
        {/* Floating Abstract Illustration with Pink Accents */}
        <div className="relative w-full h-48 md:h-64 flex items-center justify-center mb-12">
          {/* Main 404 Text with Pinkish Hue */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] select-none pointer-events-none">
            <h1 className="text-[14rem] md:text-[22rem] font-black leading-none text-pink-900">404</h1>
          </div>
          
          <div className="relative group cursor-default">
            {/* The "Orbiting" Rings - Pink Tinted */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-[1px] border-pink-100 rounded-full animate-[spin_10s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-[1px] border-rose-50 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            
            {/* Main Focus Icon with Pink Shadow */}
            <div className="relative bg-white p-8 rounded-[2.5rem] shadow-[0_25px_60px_rgba(244,114,182,0.15)] border border-pink-50 transition-all duration-500 group-hover:shadow-[0_40px_80px_rgba(244,114,182,0.25)] group-hover:-translate-y-2">
              <Sparkles size={64} className="text-pink-500 animate-pulse" />
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center text-white shadow-[0_8px_20px_rgba(244,63,94,0.3)] animate-bounce">
                <HelpCircle size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Content Card */}
        <div className="w-full max-w-xl text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Lost in <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600">Digital Bloom.</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed max-w-md mx-auto">
              The page you're searching for has withered away or moved to a different garden.
            </p>
          </div>

          {/* Search Section with Pink Focus */}
          <div className="relative group max-w-md mx-auto">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-pink-500 transition-colors">
              <Search size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Searching for something..." 
              className="w-full bg-white border border-pink-100 text-slate-900 pl-14 pr-6 py-5 rounded-3xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-400 outline-none transition-all shadow-[0_10px_30px_rgba(244,114,182,0.05)]"
            />
          </div>

          {/* Action Grid */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => window.history.back()}
              className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-slate-600 px-10 py-4 rounded-2xl font-bold border border-pink-100 hover:bg-pink-50 hover:text-pink-700 transition-all shadow-sm active:scale-95"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>
            
            <button 
              className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-pink-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-pink-700 transition-all shadow-xl shadow-pink-500/30 active:scale-95"
            >
              <Home size={18} />
              Homepage
              <MoveRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bottom Nav Links */}
        <div className="mt-20 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-semibold text-slate-400">
          <a href="#" className="hover:text-pink-600 transition-colors uppercase tracking-widest">Help Center</a>
          <a href="#" className="hover:text-pink-600 transition-colors uppercase tracking-widest">Status Page</a>
          <a href="#" className="hover:text-pink-600 transition-colors uppercase tracking-widest">Contact Us</a>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}} />
    </div>
  );
};

export default Pagenot;