import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Features from "../components/Feature";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <section className="relative h-[110vh] flex items-center overflow-hidden bg-slate-900">

     
        <img
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          alt="Hero Background"
          src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=2000"
        />

 
        <div className="absolute inset-0 bg-black/20"></div>

 
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-2xl">

            <span className="inline-block px-4 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-sm font-semibold mb-6">
              New Collection 2026
            </span>

            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Science-Backed <br />
              <span className="text-indigo-400">Personal Care</span>
            </h2>

            <p className="text-lg text-slate-300 mb-8 max-w-lg">
              Premium formulas designed to nourish your skin and hair using
              organic ingredients and cutting-edge biotechnology.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/products")}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition-all transform hover:scale-105 flex items-center gap-2"
              >
                Shop Now <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => navigate("/about")}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-lg font-bold transition-all"
              >
                Our Philosophy
              </button>
            </div>

          </div>
        </div>
      </section>

      <Features />
    </>
  );
}
