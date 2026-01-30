import { ShieldCheck, Truck, RotateCcw } from "lucide-react";

export default function Features() {
  return (
    <section className="py-16 bg-slate-100">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-4">
        <Feature
          icon={<Truck />}
          title="Fast Delivery"
          text="Quick & safe shipping nationwide"
        />
        <Feature
          icon={<ShieldCheck />}
          title="Quality Guaranteed"
          text="Dermatologically tested products"
        />
        <Feature
          icon={<RotateCcw />}
          title="Easy Returns"
          text="30-day money back guarantee"
        />
      </div>
    </section>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow text-center">
      <div className="inline-flex bg-indigo-600 p-3 rounded-xl text-white mb-4">
        {icon}
      </div>
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-slate-500 text-sm">{text}</p>
    </div>
  );
}
