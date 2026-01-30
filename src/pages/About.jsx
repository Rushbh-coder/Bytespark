import {
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  Linkedin,
  Twitter,
  Globe,
  Mail,
} from "lucide-react";

export default function About() {
  return (
    <div>
     
      <section className="relative py-24 bg-indigo-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-indigo-400 font-bold uppercase tracking-[0.3em] text-sm mb-4">
              Our Journey
            </h1>

            <h2 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-8">
              Crafting the <br />
              <span className="text-indigo-300">Future of Flow.</span>
            </h2>

            <p className="text-xl text-slate-300 leading-relaxed">
              ByteSpark started with a simple vision: to redefine how water moves
              through modern spaces.
            </p>
          </div>
        </div>
      </section>

     
      <section className="py-20 -mt-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            ["12+", "Years Experience"],
            ["500+", "Global Partners"],
            ["1M+", "Items Shipped"],
            ["24/7", "Client Support"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="bg-white p-10 rounded-[2.5rem] shadow-xl border text-center hover:-translate-y-2 transition-all"
            >
              <p className="text-4xl font-bold text-indigo-600 mb-2">{value}</p>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

    
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Values that Drive Us</h2>
          <p className="text-slate-500 mb-12">
            Every product we engineer is rooted in our principles.
          </p>

          <div className="grid md:grid-cols-3 gap-12 bg-slate-50 p-10 rounded-2xl shadow-lg text-left">
            <Value
              icon={<ShieldCheck />}
              title="Uncompromising Quality"
              text="High-grade materials ensuring lifetime durability."
            />
            <Value
              icon={<RotateCcw />}
              title="Sustainability First"
              text="Eco-flow technology reducing water usage by 30%."
            />
            <Value
              icon={<CheckCircle2 />}
              title="Client Partnership"
              text="Custom solutions for architects and builders."
            />
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold mb-4">Our Leadership</h2>
              <p className="text-slate-500">
                Meet the visionaries behind ByteSpark's commitment to excellence
                and innovation.
              </p>
            </div>

            <button className="bg-white border px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-100 transition">
              Join our Team
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Leader
              name="David Chen"
              role="Founder & CEO"
              image="https://images.unsplash.com/photo-1560250097-0b93528c311a"
              icons={[<Linkedin />, <Twitter />]}
            />
            <Leader
              name="Sarah Jenkins"
              role="Head of Operations"
              image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
              icons={[<Linkedin />, <Globe />]}
            />
            <Leader
              name="Marcus Thorne"
              role="Chief Design Officer"
              image="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7"
              icons={[<Linkedin />, <Mail />]}
            />
          </div>
        </div>
      </section>
    </div>
  );
}


function Value({ icon, title, text }) {
  return (
    <div className="bg-indigo-100 rounded-lg p-6">
      <div className="w-10 h-10 text-indigo-600 mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-slate-600 text-sm">{text}</p>
    </div>
  );
}

function Leader({ name, role, image, icons }) {
  return (
    <div className="group">
      <div className="relative rounded-3xl overflow-hidden mb-6 aspect-[4/5]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-6">
          <div className="flex gap-4 text-white">
            {icons.map((Icon, i) => (
              <span key={i} className="w-5 h-5">
                {Icon}
              </span>
            ))}
          </div>
        </div>
      </div>

      <h4 className="text-xl font-bold">{name}</h4>
      <p className="text-indigo-600 font-bold text-sm">{role}</p>
    </div>
  );
}
