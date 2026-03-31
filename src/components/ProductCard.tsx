import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative rounded-xl border border-border bg-card overflow-hidden transition-shadow duration-200 hover:shadow-lg"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {discount > 0 && (
          <span className="inline-block rounded-md bg-market-orange px-2 py-0.5 text-[11px] font-bold text-accent-foreground">
            -{discount}%
          </span>
        )}
        {product.tags.includes("flash-deal") && (
          <span className="inline-block rounded-md bg-destructive px-2 py-0.5 text-[11px] font-bold text-destructive-foreground">
            ⚡ Flash
          </span>
        )}
      </div>

      {/* Wishlist */}
      <button
        onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
        className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-card/80 backdrop-blur-sm border border-border hover:bg-card transition-colors"
      >
        <Heart className={`h-4 w-4 ${wishlisted ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
      </button>

      {/* Image */}
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
          <h3 className="font-medium text-sm leading-tight line-clamp-2 mb-2 text-card-foreground group-hover:text-market-green transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${i < Math.round(product.rating) ? "fill-market-orange text-market-orange" : "text-border"}`}
            />
          ))}
          <span className="text-[11px] text-muted-foreground ml-1">({product.reviewCount})</span>
        </div>

        <div className="flex items-end justify-between gap-2">
          <div>
            <p className="text-base font-bold text-card-foreground">{formatPrice(product.price)}</p>
            {product.originalPrice && (
              <p className="text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice)}</p>
            )}
          </div>
          <button
            onClick={() => { addToCart(product); toast.success(`${product.name} added to cart`); }}
            className="shrink-0 rounded-lg bg-market-green p-2 text-accent-foreground hover:opacity-90 transition-opacity"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>

        {product.inStock && (
          <p className="mt-2 text-[11px] font-medium text-market-green">✓ In Stock</p>
        )}
      </div>
    </motion.div>
  );
}
