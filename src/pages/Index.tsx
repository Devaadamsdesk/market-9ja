import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import { products, categories, getProductsByTag, formatPrice } from "@/data/products";
import { Star, Truck, Shield, Headphones } from "lucide-react";

const featured = getProductsByTag("featured");
const flashDeals = getProductsByTag("flash-deal");

const testimonials = [
  { name: "Adebayo K.", city: "Lagos", text: "Best gadget store in Nigeria! Got my iPhone in 2 days.", rating: 5 },
  { name: "Ngozi E.", city: "Abuja", text: "Great prices and genuine products. No wahala!", rating: 5 },
  { name: "Ibrahim M.", city: "Kano", text: "Customer service is top-notch. Highly recommend Market9ja.", rating: 4 },
];

export default function Index() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Trust bar */}
      <section className="border-b border-border bg-market-slate">
        <div className="container mx-auto py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Truck, text: "Fast Delivery Nationwide" },
            { icon: Shield, text: "100% Genuine Products" },
            { icon: Headphones, text: "24/7 Support" },
            { icon: Star, text: "5,000+ Happy Customers" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 justify-center">
              <Icon className="h-5 w-5 text-market-green shrink-0" />
              <span className="text-xs md:text-sm font-medium text-foreground">{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto py-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Shop by Category</h2>
        <div className="grid grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.name}`}
              className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-6 hover:border-market-green hover:shadow-md transition-all"
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="font-semibold text-sm text-card-foreground">{cat.name}</span>
              <span className="text-xs text-muted-foreground">{cat.count} products</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Flash Deals */}
      {flashDeals.length > 0 && (
        <section className="bg-market-slate py-12">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">⚡ Flash Deals</h2>
              <Link to="/products?tag=flash-deal" className="text-sm font-medium text-market-green hover:underline">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {flashDeals.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="container mx-auto py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Featured Gadgets</h2>
          <Link to="/products" className="text-sm font-medium text-market-green hover:underline">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-primary py-12">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-primary-foreground mb-8 text-center">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 p-6"
              >
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < t.rating ? "fill-market-orange text-market-orange" : "text-primary-foreground/20"}`} />
                  ))}
                </div>
                <p className="text-sm text-primary-foreground/80 mb-4">"{t.text}"</p>
                <p className="text-sm font-semibold text-primary-foreground">{t.name}</p>
                <p className="text-xs text-primary-foreground/50">{t.city}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
