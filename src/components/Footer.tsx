import { Link } from "react-router-dom";
import { Mail, Instagram, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-4">
            Market<span className="text-market-green">9ja</span>
          </h3>
          <p className="text-sm text-primary-foreground/70 leading-relaxed">
            Nigeria's premium marketplace for phones, tablets, and accessories. Genuine products, great prices.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-primary-foreground/60">Shop</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/products?category=Phones" className="hover:text-market-green transition-colors">Phones</Link></li>
            <li><Link to="/products?category=Tablets" className="hover:text-market-green transition-colors">Tablets</Link></li>
            <li><Link to="/products?category=Accessories" className="hover:text-market-green transition-colors">Accessories</Link></li>
            <li><Link to="/products" className="hover:text-market-green transition-colors">All Products</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-primary-foreground/60">Support</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><span className="hover:text-market-green transition-colors cursor-pointer">FAQ</span></li>
            <li><span className="hover:text-market-green transition-colors cursor-pointer">Privacy Policy</span></li>
            <li><span className="hover:text-market-green transition-colors cursor-pointer">Terms of Service</span></li>
            <li><span className="hover:text-market-green transition-colors cursor-pointer">Returns & Refunds</span></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-primary-foreground/60">Newsletter</h4>
          <p className="text-sm text-primary-foreground/70 mb-3">Get the latest deals delivered to your inbox.</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 rounded-md bg-primary-foreground/10 border border-primary-foreground/20 px-3 py-2 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-1 focus:ring-market-green"
            />
            <button className="shrink-0 rounded-md bg-market-green px-4 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90 transition-opacity">
              Join
            </button>
          </form>
          <div className="flex items-center gap-4 mt-5">
            <a href="mailto:officialazeezadams@gmail.com" className="text-primary-foreground/60 hover:text-market-green transition-colors"><Mail className="h-5 w-5" /></a>
            <a href="#" className="text-primary-foreground/60 hover:text-market-green transition-colors"><Instagram className="h-5 w-5" /></a>
            <a href="#" className="text-primary-foreground/60 hover:text-market-green transition-colors"><Twitter className="h-5 w-5" /></a>
            <a href="#" className="text-primary-foreground/60 hover:text-market-green transition-colors"><Facebook className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 py-4">
        <p className="text-center text-xs text-primary-foreground/50">
          © {new Date().getFullYear()} Market9ja. All rights reserved. Contact: officialazeezadams@gmail.com
        </p>
      </div>
    </footer>
  );
}
