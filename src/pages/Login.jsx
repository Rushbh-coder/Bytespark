import React, { useState, useEffect } from 'react';
import { 
  Mail, Lock, ArrowRight, Shield, 
  Loader2, Fingerprint, Eye, EyeOff,
  Command, Disc, ArrowUpRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const navigate = useNavigate();
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user'
  });

  useEffect(() => {
    setMessage({ type: '', text: '' });
  }, [isLogin]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const { login } = useAuth();

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setMessage({ type: "", text: "" });

  try {
    const endpoint = isLogin ? "login" : "register";

    const response = await fetch(
      `http://localhost:5000/api/auth/${endpoint}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          ...(isLogin ? {} : { role: formData.role.toUpperCase() }),
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Access Denied");

    // ✅ THIS IS THE KEY LINE (updates Navbar instantly)
    login(data.token, data.user);

    setMessage({
      type: "success",
      text: "Authentication successful. Redirecting...",
    });

    setTimeout(() => {
      if (data.user.role.toUpperCase() === "ADMIN") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }, 300);

  } catch (err) {
    setMessage({ type: "error", text: err.message });
  } finally {
    setIsLoading(false);
  }
};



  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 font-sans text-[#121212] antialiased relative overflow-hidden bg-white">
      
      {/* Immersive Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Cinematic Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop')`,
            filter: 'grayscale(0.2) brightness(0.9)'
          }}
        ></div>

        {/* Dynamic Studio Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/40 to-indigo-100/30 backdrop-blur-[2px]"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-gradient-to-br from-indigo-200/40 to-transparent rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-gradient-to-tr from-sky-200/30 to-transparent rounded-full blur-[100px]"></div>
        
        {/* Subtle Grain & Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.06] mix-blend-overlay"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '64px 64px' }}></div>
      </div>

      <div className="w-full max-w-[940px] grid grid-cols-1 lg:grid-cols-2 relative z-10 bg-white/80 shadow-[0_48px_100px_rgba(0,0,0,0.1)] rounded-[32px] overflow-hidden border border-white/40 backdrop-blur-xl">
        
        {/* Visual Narrative Side */}
        <div className="hidden lg:flex flex-col justify-between p-16 bg-white/20 border-r border-black/[0.03] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-60"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-24 group cursor-default">
              <div className="w-10 h-10 flex items-center justify-center bg-black rounded-2xl shadow-lg transition-transform duration-500 group-hover:rotate-12">
                <Command size={18} className="text-white" />
              </div>
              <span className="text-sm font-black tracking-[0.3em] uppercase">Aurora</span>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Disc size={14} className="text-indigo-600 animate-spin-slow" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/40">Core V.2.0</span>
              </div>
              <h1 className="text-6xl font-medium tracking-[-0.06em] leading-[0.85]">
                Digital <br />
                <span className="text-black/30 italic">Intelligence.</span>
              </h1>
              <p className="text-sm text-black/50 font-light max-w-[240px] leading-relaxed pt-2">
                Advanced commerce infrastructure for high-performance entities.
              </p>
            </div>
          </div>

          <div className="relative z-10">
            <div className="p-6 bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl shadow-sm flex items-center justify-between group cursor-pointer hover:bg-white/60 transition-all">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-1">Status</p>
                <p className="text-xs font-bold">Network Secure</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                <ArrowUpRight size={14} />
              </div>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="p-8 md:p-16 flex flex-col justify-center bg-white/60">
          <div className="mb-10 text-center lg:text-left">
            <p className="text-[10px] font-black tracking-[0.4em] uppercase text-black/30 mb-3">
              {isLogin ? "Authorization Required" : "Identity Registry"}
            </p>
            <h2 className="text-3xl font-medium tracking-tight">
              {isLogin ? "Sign In" : "Create ID"}
            </h2>
          </div>

          {message.text && (
            <div className={`mb-8 p-4 rounded-2xl flex items-center gap-4 animate-in slide-in-from-top-4 duration-500 ${
              message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-black text-white'
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full ${message.type === 'error' ? 'bg-red-500' : 'bg-white animate-pulse'}`}></div>
              <p className="text-xs font-bold tracking-tight">{message.text}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="group">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-black/40 ml-4 mb-2 block">Identifier</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-black/20 transition-colors group-focus-within:text-black" size={16} />
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/40 border border-black/[0.05] rounded-2xl py-4 px-14 text-sm outline-none focus:bg-white focus:border-black/10 transition-all font-light"
                  placeholder="name@domain.com"
                />
              </div>
            </div>

            <div className="group">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-black/40 ml-4 mb-2 block">Secret Key</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-black/20 transition-colors group-focus-within:text-black" size={16} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-white/40 border border-black/[0.05] rounded-2xl py-4 px-14 text-sm outline-none focus:bg-white focus:border-black/10 transition-all font-light"
                  placeholder="••••••••"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-black/20 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="flex p-1 bg-black/[0.03] rounded-2xl mt-2">
                {['user', 'admin'].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setFormData({...formData, role})}
                    className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.role === role ? 'bg-white text-black shadow-sm' : 'text-black/30 hover:text-black/50'}`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-black text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] mt-6 hover:bg-[#1a1a1a] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : (
                <>
                  {isLogin ? "Authenticate" : "Register"}
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 flex flex-col items-center gap-6">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-black/40 hover:text-black text-[10px] font-black uppercase tracking-widest transition-all"
            >
              {isLogin ? "Create New Entity" : "Return to Login"}
            </button>
            
            <div className="flex items-center gap-3 text-[10px] text-black/10 font-black uppercase tracking-[0.4em]">
               <Fingerprint size={12} />
               Secure Access Only
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
        .animate-spin-slow { animation: spin 15s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default App;