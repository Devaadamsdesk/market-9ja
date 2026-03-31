import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Heart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { searchProducts } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const { totalItems } = useCart();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ReturnType<typeof searchProducts>>([]);
  const [showResults, setShowResults] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length >= 2) {
      setResults(searchProducts(query).slice(0, 5));
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowResults(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      setShowResults(false);
      setQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-md">
      <div className="container mx-auto flex items-center justify-between gap-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="text-xl font-extrabold tracking-tight text-primary-foreground">
            Market<span className="text-market-green">9ja</span>
          </span>
        </Link>

        {/* Search - Desktop */}
        <div ref={searchRef} className="relative hidden md:flex flex-1 max-w-xl">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search phones, tablets, accessories..."
                className="w-full rounded-lg border-0 bg-primary-foreground pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-market-green"
              />
            </div>
          </form>
          <AnimatePresence>
            {showResults && results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute top-full left-0 right-0 mt-1 rounded-lg bg-card border border-border shadow-lg overflow-hidden"
              >
                {results.map((p) => (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    onClick={() => { setShowResults(false); setQuery(""); }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
                  >
                    <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded" />
                    <div>
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">₦{p.price.toLocaleString()}</p>
                    </div>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Nav links - Desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { to: "/products", label: "Shop" },
            { to: "/products?category=Phones", label: "Phones" },
            { to: "/products?category=Tablets", label: "Tablets" },
            { to: "/products?category=Accessories", label: "Accessories" },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="px-3 py-2 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors rounded-md"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-2">
          <Link to="/wishlist" className="relative p-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
            <Heart className="h-5 w-5" />
          </Link>
          <Link to="/cart" className="relative p-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-market-green text-[10px] font-bold text-accent-foreground">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden p-2 text-primary-foreground"
          >
            {mobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-primary border-t border-primary-foreground/10"
          >
            <form onSubmit={handleSearch} className="px-4 py-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full rounded-lg border-0 bg-primary-foreground pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-market-green"
                />
              </div>
            </form>
            <nav className="flex flex-col px-4 pb-4 gap-1">
              {[
                { to: "/products", label: "All Products" },
                { to: "/products?category=Phones", label: "Phones" },
                { to: "/products?category=Tablets", label: "Tablets" },
                { to: "/products?category=Accessories", label: "Accessories" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenu(false)}
                  className="px-3 py-2.5 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/5 rounded-md transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
