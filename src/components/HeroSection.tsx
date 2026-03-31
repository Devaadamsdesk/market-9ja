import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-primary">
      <div className="container mx-auto grid md:grid-cols-2 items-center gap-8 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center md:text-left"
        >
          <span className="inline-block rounded-full bg-market-green/20 px-4 py-1 text-xs font-semibold text-market-green mb-4">
            🇳🇬 Nigeria's #1 Gadget Store
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-primary-foreground mb-4">
            Premium Gadgets,<br />
            <span className="text-market-green">Naija Prices.</span>
          </h1>
          <p className="text-primary-foreground/70 text-base md:text-lg mb-6 max-w-md mx-auto md:mx-0">
            Shop the latest iPhones, Samsung Galaxy, tablets & accessories. 100% genuine, fast delivery across Nigeria.
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-lg bg-market-green px-6 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 transition-opacity"
            >
              Shop Now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/products?tag=flash-deal"
              className="inline-flex items-center gap-2 rounded-lg border border-primary-foreground/20 px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/5 transition-colors"
            >
              ⚡ Flash Deals
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center"
        >
          <img
            src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&h=500&fit=crop"
            alt="iPhone 15 Pro Max"
            className="w-64 md:w-80 rounded-2xl shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
