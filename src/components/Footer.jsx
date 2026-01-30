import {
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
     
      <div className="border-b border-slate-700">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 py-10 px-4">
          <Feature
            icon={<Truck />}
            title="Free Shipping"
            text="On all orders over $50"
          />
          <Feature
            icon={<RotateCcw />}
            title="Easy Returns"
            text="30-day hassle-free returns"
          />
          <Feature
            icon={<ShieldCheck />}
            title="Secure Payments"
            text="100% protected checkout"
          />
        </div>
      </div>

    
      <div className="max-w-7xl mx-auto py-12 px-4 grid md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">
            BYTESPARK
          </h2>
          <p className="text-sm">
            Science-backed personal care products crafted with sustainability.
          </p>
        </div>

        <FooterColumn
          title="Shop"
          links={["Skincare", "Haircare", "Bodycare", "Best Sellers"]}
        />
        <FooterColumn
          title="Company"
          links={["About Us", "Careers", "Blog", "Press"]}
        />
        <FooterColumn
          title="Support"
          links={["Contact", "FAQ", "Privacy Policy", "Terms"]}
        />
      </div>

      <div className="text-center text-sm border-t border-slate-700 py-4">
        © {new Date().getFullYear()} ByteSpark. All rights reserved.
      </div>
    </footer>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="flex gap-4 items-center">
      <div className="bg-indigo-600 p-3 rounded-xl text-white">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-white">{title}</h4>
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h4 className="font-bold text-white mb-4">{title}</h4>
      <ul className="space-y-2">
        {links.map((l) => (
          <li
            key={l}
            className="hover:text-white cursor-pointer transition"
          >
            {l}
          </li>
        ))}
      </ul>
    </div>
  );
}
