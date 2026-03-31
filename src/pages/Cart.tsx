import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Discover our amazing products</p>
        <Link to="/products" className="inline-flex items-center gap-2 rounded-lg bg-market-green px-6 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 transition-opacity">
          Start Shopping <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">Shopping Cart ({totalItems} items)</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 rounded-xl border border-border bg-card p-4">
              <Link to={`/product/${product.id}`} className="shrink-0">
                <img src={product.image} alt={product.name} className="w-24 h-24 rounded-lg object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-medium text-sm text-card-foreground line-clamp-2">{product.name}</h3>
                </Link>
                <p className="text-xs text-muted-foreground mt-1">{product.brand}</p>
                <p className="text-base font-bold text-card-foreground mt-2">{formatPrice(product.price)}</p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button onClick={() => removeFromCart(product.id)} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-2 rounded-lg border border-border">
                  <button onClick={() => updateQuantity(product.id, quantity - 1)} className="px-2.5 py-1.5 text-muted-foreground hover:text-foreground">
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="text-sm font-medium w-6 text-center text-foreground">{quantity}</span>
                  <button onClick={() => updateQuantity(product.id, quantity + 1)} className="px-2.5 py-1.5 text-muted-foreground hover:text-foreground">
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="md:sticky md:top-24 self-start rounded-xl border border-border bg-card p-6">
          <h3 className="font-bold text-foreground mb-4">Order Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal ({totalItems} items)</span>
              <span className="text-foreground font-medium">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Delivery</span>
              <span className="text-market-green font-medium">Free</span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between">
              <span className="font-bold text-foreground">Total</span>
              <span className="font-bold text-foreground text-lg">{formatPrice(totalPrice)}</span>
            </div>
          </div>
          <Link
            to="/checkout"
            className="mt-6 flex items-center justify-center gap-2 w-full rounded-lg bg-market-green py-3.5 text-sm font-semibold text-accent-foreground hover:opacity-90 transition-opacity"
          >
            Proceed to Checkout <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
