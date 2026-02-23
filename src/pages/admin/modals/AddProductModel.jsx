import React, { useState } from 'react';
import { X, Sparkles, Image as ImageIcon, DollarSign, Tag, AlignLeft } from 'lucide-react';

/**
 * AddProductModal Component
 * A premium, responsive modal for adding luxury items to the Btespark collection.
 */
const AddProductModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: 'Skincare',
    description: '',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfad450216?w=800&q=80'
  });

  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate and format data
    const product = {
      ...formData,
      id: Date.now(),
      price: parseFloat(formData.price) || 0,
      rating: (Math.random() * (5.0 - 4.5) + 4.5).toFixed(1), // Random high rating for realism
    };
    onAdd(product);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-white/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[40px] w-full max-w-2xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">
        
        {/* Header Decor */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 via-pink-500 to-rose-400"></div>

        {/* Modal Header */}
        <div className="flex justify-between items-center p-8 pb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 shadow-sm">
              <Sparkles size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none">New Treasure</h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1.5">Collection Entry</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 flex items-center justify-center hover:bg-rose-50 rounded-2xl transition-all text-slate-400 hover:text-rose-500"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 pt-4 space-y-6">
          {/* Image Preview & URL Section */}
          <div className="group relative h-48 rounded-[32px] bg-slate-50 border-2 border-dashed border-rose-100 flex flex-col items-center justify-center overflow-hidden transition-all hover:border-rose-300">
            {formData.image ? (
              <>
                <img src={formData.image} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-colors"></div>
                <div className="relative z-10 flex flex-col items-center gap-2">
                   <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-700 shadow-sm">
                     Image Active
                   </div>
                </div>
              </>
            ) : (
              <div className="text-slate-300 flex flex-col items-center gap-2">
                <ImageIcon size={32} />
                <span className="text-xs font-bold uppercase tracking-wider">Preview Placeholder</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title Input */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                <Tag size={12} /> Product Title
              </label>
              <input 
                required 
                type="text" 
                placeholder="Moonlight Glow Serum" 
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-rose-100 focus:bg-white transition-all font-bold text-slate-700 placeholder:text-slate-300" 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})} 
              />
            </div>

            {/* Price Input */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                <DollarSign size={12} /> Retail Price
              </label>
              <div className="relative">
                <input 
                  required 
                  type="number" 
                  step="0.01" 
                  placeholder="0.00"
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-rose-100 focus:bg-white transition-all font-bold text-slate-900 placeholder:text-slate-300" 
                  value={formData.price} 
                  onChange={e => setFormData({...formData, price: e.target.value})} 
                />
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Category Select */}
             <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Collection Category</label>
              <select 
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-rose-100 focus:bg-white transition-all font-bold text-rose-500 appearance-none cursor-pointer" 
                value={formData.category} 
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                <option>Skincare</option>
                <option>Cosmetics</option>
                <option>Fragrance</option>
                <option>Treatments</option>
                <option>Body Care</option>
              </select>
            </div>

            {/* Image URL Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Image URL (Unsplash/Direct)</label>
              <input 
                type="url" 
                placeholder="https://images.unsplash.com/..." 
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-rose-100 focus:bg-white transition-all font-medium text-xs text-slate-500" 
                value={formData.image} 
                onChange={e => setFormData({...formData, image: e.target.value})} 
              />
            </div>
          </div>

          {/* Description Textarea */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
              <AlignLeft size={12} /> Description
            </label>
            <textarea 
              rows="3" 
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-rose-100 focus:bg-white transition-all font-medium text-slate-600 resize-none leading-relaxed placeholder:text-slate-300" 
              placeholder="Detail the ingredients, benefits, and luxury feel of this product..." 
              value={formData.description} 
              onChange={e => setFormData({...formData, description: e.target.value})} 
            />
          </div>
        </form>

        {/* Modal Footer */}
        <div className="p-8 pt-0">
          <button 
            type="submit" 
            onClick={handleSubmit}
            className="w-full bg-slate-900 text-white py-5 rounded-[24px] font-black text-lg shadow-xl shadow-slate-200 hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            <Sparkles size={20} className="text-rose-400" />
            Add to Boutique
          </button>
          <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-4">
            Changes will be reflected immediately in your collection
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;