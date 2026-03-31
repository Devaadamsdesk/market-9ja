import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { getProductById } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function Wishlist() {
  const { wishlist } = useWishlist();
  const wishlistProducts = wishlist.map(getProductById).filter(Boolean);

  if (wishlistProducts.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">Your wishlist is empty</h1>
        <p className="text-muted-foreground mb-6">Save items you love for later</p>
        <Link to="/products" className="inline-flex rounded-lg bg-market-green px-6 py-3 text-sm font-semibold text-accent-foreground">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">Wishlist ({wishlistProducts.length})</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {wishlistProducts.map((p) => p && <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
