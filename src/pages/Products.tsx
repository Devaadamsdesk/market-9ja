import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products, searchProducts } from "@/data/products";

const brands = [...new Set(products.map((p) => p.brand))];
const conditionOptions = ["New", "Refurbished", "Used"] as const;

export default function Products() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const searchParam = searchParams.get("search");
  const tagParam = searchParams.get("tag");

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCondition, setSelectedCondition] = useState<string>("");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = searchParam ? searchProducts(searchParam) : [...products];

    if (categoryParam) result = result.filter((p) => p.category === categoryParam);
    if (tagParam) result = result.filter((p) => p.tags.includes(tagParam));
    if (selectedBrands.length) result = result.filter((p) => selectedBrands.includes(p.brand));
    if (selectedCondition) result = result.filter((p) => p.condition === selectedCondition);
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case "price-low": result.sort((a, b) => a.price - b.price); break;
      case "price-high": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      default: result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [categoryParam, searchParam, tagParam, selectedBrands, selectedCondition, priceRange, sortBy]);

  const toggleBrand = (brand: string) =>
    setSelectedBrands((prev) => prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]);

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedCondition("");
    setPriceRange([0, 2000000]);
  };

  const title = searchParam
    ? `Results for "${searchParam}"`
    : categoryParam || "All Products";

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} products</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-market-green"
          >
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low → High</option>
            <option value="price-high">Price: High → Low</option>
            <option value="rating">Highest Rated</option>
          </select>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm"
          >
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside className={`${showFilters ? "fixed inset-0 z-50 bg-card p-6 overflow-auto" : "hidden"} md:block md:static md:w-56 shrink-0`}>
          <div className="flex items-center justify-between mb-4 md:hidden">
            <h3 className="font-bold">Filters</h3>
            <button onClick={() => setShowFilters(false)}><X className="h-5 w-5" /></button>
          </div>

          {(selectedBrands.length > 0 || selectedCondition) && (
            <button onClick={clearFilters} className="text-xs text-market-green hover:underline mb-4 block">
              Clear all filters
            </button>
          )}

          <div className="mb-6">
            <h4 className="text-sm font-semibold text-foreground mb-3">Brand</h4>
            <div className="space-y-2">
              {brands.map((b) => (
                <label key={b} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(b)}
                    onChange={() => toggleBrand(b)}
                    className="rounded border-border text-market-green focus:ring-market-green"
                  />
                  <span className="text-foreground">{b}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-semibold text-foreground mb-3">Condition</h4>
            <div className="space-y-2">
              {conditionOptions.map((c) => (
                <label key={c} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="condition"
                    checked={selectedCondition === c}
                    onChange={() => setSelectedCondition(selectedCondition === c ? "" : c)}
                    className="text-market-green focus:ring-market-green"
                  />
                  <span className="text-foreground">{c}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-semibold text-foreground mb-3">Max Price</h4>
            <input
              type="range"
              min={0}
              max={2000000}
              step={50000}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
              className="w-full accent-market-green"
            />
            <p className="text-xs text-muted-foreground mt-1">Up to ₦{priceRange[1].toLocaleString()}</p>
          </div>

          <button onClick={() => setShowFilters(false)} className="md:hidden w-full rounded-lg bg-market-green py-2.5 text-sm font-semibold text-accent-foreground">
            Apply Filters
          </button>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg font-semibold text-foreground mb-2">No products found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
