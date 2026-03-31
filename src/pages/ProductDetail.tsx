import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Star, ShoppingCart, Heart, ChevronRight, Truck, Shield, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { getProductById, formatPrice, mockReviews, products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";
import ProductCard from "@/components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-2">Product not found</h1>
        <Link to="/products" className="text-market-green hover:underline">Browse products</Link>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="container mx-auto py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/products" className="hover:text-foreground">Products</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to={`/products?category=${product.category}`} className="hover:text-foreground">{product.category}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {/* Images */}
        <div className="md:sticky md:top-24 self-start">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-square overflow-hidden rounded-xl bg-muted border border-border"
          >
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </motion.div>
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    i === selectedImage ? "border-market-green" : "border-border"
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-market-orange text-market-orange" : "text-border"}`} />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
            {product.inStock && <span className="text-sm font-medium text-market-green">✓ In Stock</span>}
          </div>

          <div className="flex items-end gap-3 mb-6">
            <span className="text-3xl font-extrabold text-foreground">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-6">{product.description}</p>

          {/* Specs */}
          <div className="rounded-lg border border-border p-4 mb-6">
            <h3 className="text-sm font-semibold text-foreground mb-3">Specifications</h3>
            <div className="space-y-2">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{key}</span>
                  <span className="font-medium text-foreground">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => { addToCart(product); toast.success(`${product.name} added to cart`); }}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-market-green py-3.5 text-sm font-semibold text-accent-foreground hover:opacity-90 transition-opacity"
            >
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`rounded-lg border px-4 py-3.5 transition-colors ${
                wishlisted ? "border-destructive bg-destructive/5 text-destructive" : "border-border text-muted-foreground hover:border-foreground"
              }`}
            >
              <Heart className={`h-5 w-5 ${wishlisted ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* Promises */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Truck, text: "Free Delivery" },
              { icon: Shield, text: "1 Year Warranty" },
              { icon: RotateCcw, text: "7-Day Returns" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex flex-col items-center gap-1.5 rounded-lg border border-border p-3">
                <Icon className="h-4 w-4 text-market-green" />
                <span className="text-[11px] font-medium text-foreground text-center">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-16">
        <h2 className="text-xl font-bold text-foreground mb-6">Customer Reviews</h2>
        <div className="space-y-4">
          {mockReviews.map((r) => (
            <div key={r.id} className="rounded-lg border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? "fill-market-orange text-market-orange" : "text-border"}`} />
                  ))}
                </div>
                <span className="text-sm font-medium text-foreground">{r.author}</span>
                <span className="text-xs text-muted-foreground">{r.date}</span>
              </div>
              <p className="text-sm text-muted-foreground">{r.comment}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold text-foreground mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
