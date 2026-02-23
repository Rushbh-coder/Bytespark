import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Bell, 
  Globe, 
  Shield, 
  Palette, 
  Save, 
  ChevronRight,
  Camera,
  Mail,
  Smartphone,
  CreditCard,
  Check,
  Moon,
  Sun,
  Laptop
} from 'lucide-react';

const setting = () => {
  const [activeSection, setActiveSection] = useState('profile');

  const menuItems = [
    { id: 'profile', icon: User, label: 'Profile Details' },
    { id: 'security', icon: Lock, label: 'Password & Security' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'preferences', icon: Palette, label: 'Interface Theme' },
    { id: 'billing', icon: CreditCard, label: 'Plan & Billing' },
  ];

  const InputGroup = ({ label, type = "text", defaultValue, placeholder }) => (
    <div className="space-y-2">
      <label className="text-sm font-bold text-slate-700 ml-1">{label}</label>
      <input 
        type={type} 
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full bg-white border border-pink-100 px-4 py-3 rounded-2xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-400 outline-none transition-all shadow-sm"
      />
    </div>
  );

  const Toggle = ({ label, description, defaultChecked }) => (
    <div className="flex items-center justify-between py-4">
      <div>
        <h4 className="text-sm font-bold text-slate-800">{label}</h4>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" defaultChecked={defaultChecked} className="sr-only peer" />
        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
      </label>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFFDFE] font-sans antialiased text-slate-900">
      {/* Decorative Background Blobs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-pink-400/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-rose-400/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 md:py-20">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">
            Account <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600">Settings</span>
          </h1>
          <p className="text-slate-500 font-medium">Manage your personal information and platform preferences.</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-72 shrink-0">
            <nav className="bg-white/60 backdrop-blur-md border border-pink-50 rounded-[2.5rem] p-4 shadow-[0_20px_50px_rgba(244,114,182,0.05)]">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold transition-all mb-1 ${
                    activeSection === item.id 
                      ? 'bg-pink-600 text-white shadow-[0_10px_25px_rgba(219,39,119,0.3)]' 
                      : 'text-slate-500 hover:bg-pink-50 hover:text-pink-600'
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            <div className="bg-white border border-pink-50 rounded-[3rem] p-8 md:p-12 shadow-[0_30px_70px_rgba(244,114,182,0.08)]">
              
              {activeSection === 'profile' && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex flex-col sm:flex-row items-center gap-8 pb-10 border-b border-pink-50">
                    <div className="relative group">
                      <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-tr from-pink-100 to-rose-100 flex items-center justify-center border-4 border-white shadow-xl overflow-hidden">
                        <User size={48} className="text-pink-400" />
                      </div>
                      <button className="absolute -bottom-2 -right-2 bg-pink-600 text-white p-3 rounded-2xl shadow-lg shadow-pink-500/40 hover:bg-pink-700 transition-all">
                        <Camera size={18} />
                      </button>
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-bold mb-1">Your Profile Picture</h3>
                      <p className="text-slate-400 text-sm mb-4">PNG, JPG or GIF. Max size 2MB.</p>
                      <div className="flex gap-3">
                        <button className="text-sm font-bold text-pink-600 px-4 py-2 bg-pink-50 rounded-xl hover:bg-pink-100 transition-all">Upload New</button>
                        <button className="text-sm font-bold text-slate-400 px-4 py-2 hover:text-rose-600 transition-all">Remove</button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup label="First Name" defaultValue="Adin" />
                    <InputGroup label="Last Name" defaultValue="Admin" />
                    <InputGroup label="Email Address" type="email" defaultValue="adin@example.com" />
                    <InputGroup label="Phone Number" type="tel" placeholder="+1 (555) 000-0000" />
                    <div className="md:col-span-2">
                      <InputGroup label="Professional Bio" placeholder="Tell us about yourself..." />
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'security' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="pb-6 border-b border-pink-50">
                    <h3 className="text-xl font-bold mb-2">Password Management</h3>
                    <p className="text-slate-500 text-sm">Ensure your account is using a long, random password to stay secure.</p>
                  </div>
                  <div className="space-y-6 max-w-md">
                    <InputGroup label="Current Password" type="password" />
                    <InputGroup label="New Password" type="password" />
                    <InputGroup label="Confirm New Password" type="password" />
                  </div>
                  <div className="bg-rose-50 p-6 rounded-[2rem] border border-rose-100 flex gap-4">
                    <Shield className="text-rose-500 shrink-0" size={24} />
                    <div>
                      <h4 className="font-bold text-rose-900 text-sm">Two-Factor Authentication</h4>
                      <p className="text-rose-700 text-xs mt-1 leading-relaxed">Add an extra layer of security to your account by requiring more than just a password to log in.</p>
                      <button className="mt-4 text-xs font-black uppercase tracking-widest text-white bg-rose-600 px-4 py-2 rounded-lg">Enable 2FA</button>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'notifications' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="pb-6 border-b border-pink-50">
                    <h3 className="text-xl font-bold mb-2">Notification Preferences</h3>
                    <p className="text-slate-500 text-sm">Control how and when you want to be notified about platform activity.</p>
                  </div>
                  <div className="divide-y divide-pink-50">
                    <Toggle label="Email Notifications" description="Receive updates about account activity via email." defaultChecked={true} />
                    <Toggle label="Push Notifications" description="Receive real-time alerts on your browser or mobile device." defaultChecked={true} />
                    <Toggle label="Marketing Updates" description="Stay informed about new features and special offers." defaultChecked={false} />
                    <Toggle label="Security Alerts" description="Important notifications regarding your account security." defaultChecked={true} />
                  </div>
                </div>
              )}

              {activeSection === 'preferences' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="pb-6 border-b border-pink-50">
                    <h3 className="text-xl font-bold mb-2">Interface Theme</h3>
                    <p className="text-slate-500 text-sm">Customize how the platform looks and feels to your liking.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button className="flex flex-col items-center gap-4 p-6 rounded-[2.5rem] border-2 border-pink-600 bg-pink-50/50">
                      <Sun className="text-pink-600" size={32} />
                      <span className="font-bold text-sm">Light Mode</span>
                    </button>
                    <button className="flex flex-col items-center gap-4 p-6 rounded-[2.5rem] border-2 border-slate-100 hover:border-pink-200 transition-all">
                      <Moon className="text-slate-400" size={32} />
                      <span className="font-bold text-sm">Dark Mode</span>
                    </button>
                    <button className="flex flex-col items-center gap-4 p-6 rounded-[2.5rem] border-2 border-slate-100 hover:border-pink-200 transition-all">
                      <Laptop className="text-slate-400" size={32} />
                      <span className="font-bold text-sm">System</span>
                    </button>
                  </div>
                </div>
              )}

              {activeSection === 'billing' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="pb-6 border-b border-pink-50">
                    <h3 className="text-xl font-bold mb-2">Plan & Billing</h3>
                    <p className="text-slate-500 text-sm">Manage your subscription plan and payment methods.</p>
                  </div>
                  <div className="bg-gradient-to-br from-pink-600 to-rose-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-pink-500/20 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                      <p className="text-pink-100 text-xs font-bold uppercase tracking-widest mb-1">Current Plan</p>
                      <h4 className="text-3xl font-black">Pro Business</h4>
                      <p className="text-pink-100/80 text-sm mt-1">$49.00 billed monthly</p>
                    </div>
                    <button className="bg-white text-pink-600 px-8 py-3 rounded-2xl font-bold shadow-lg hover:bg-pink-50 transition-all">
                      Upgrade Plan
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-6 border border-pink-100 rounded-3xl">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-pink-50 text-pink-600 rounded-2xl">
                        <CreditCard size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">Mastercard ending in 4242</p>
                        <p className="text-xs text-slate-400">Expires 12/26</p>
                      </div>
                    </div>
                    <button className="text-sm font-bold text-pink-600">Edit</button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-12 pt-8 border-t border-pink-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-slate-400 italic">Last saved: Today at 2:45 PM</p>
                <div className="flex w-full sm:w-auto gap-4">
                  <button className="flex-1 sm:flex-none px-8 py-3 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-all">
                    Cancel
                  </button>
                  <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-pink-600 text-white px-10 py-3 rounded-2xl font-bold shadow-xl shadow-pink-500/30 hover:bg-pink-700 transition-all active:scale-95">
                    <Save size={18} />
                    Save Changes
                  </button>
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        
        .animate-in {
          animation: animate-in 0.5s ease-out;
        }
        
        @keyframes animate-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
};

export default setting;