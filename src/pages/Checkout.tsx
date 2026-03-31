import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function Checkout() {
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", state: "" });

  if (items.length === 0 && !submitted) {
    navigate("/cart");
    return null;
  }

  if (submitted) {
    return (
      <div className="container mx-auto py-20 text-center">
        <CheckCircle2 className="h-16 w-16 text-market-green mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">Order Confirmed! 🎉</h1>
        <p className="text-muted-foreground mb-6">Thank you for shopping with Market9ja. You will receive a confirmation email shortly.</p>
        <Link to="/" className="inline-flex items-center gap-2 rounded-lg bg-market-green px-6 py-3 text-sm font-semibold text-accent-foreground">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.address || !form.city || !form.state) {
      toast.error("Please fill in all fields");
      return;
    }
    clearCart();
    setSubmitted(true);
  };

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">Checkout</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="md:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Delivery Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Full Name", field: "name", type: "text", placeholder: "Azeez Adams" },
              { label: "Email", field: "email", type: "email", placeholder: "you@example.com" },
              { label: "Phone", field: "phone", type: "tel", placeholder: "+234 800 000 0000" },
              { label: "City", field: "city", type: "text", placeholder: "Lagos" },
            ].map(({ label, field, type, placeholder }) => (
              <div key={field}>
                <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={(form as any)[field]}
                  onChange={(e) => update(field, e.target.value)}
                  className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-market-green"
                />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Address</label>
            <input
              type="text"
              placeholder="123 Broad Street, Victoria Island"
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-market-green"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">State</label>
            <select
              value={form.state}
              onChange={(e) => update("state", e.target.value)}
              className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-market-green"
            >
              <option value="">Select state</option>
              {["Lagos", "Abuja", "Rivers", "Kano", "Oyo", "Kaduna", "Enugu", "Delta", "Ogun", "Anambra"].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="pt-4">
            <h2 className="text-lg font-semibold text-foreground mb-3">Payment</h2>
            <div className="rounded-lg border border-border bg-market-slate p-4">
              <p className="text-sm text-muted-foreground">💳 Payment simulation — no real charges will be made.</p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-market-green py-3.5 text-sm font-semibold text-accent-foreground hover:opacity-90 transition-opacity mt-4"
          >
            Place Order — {formatPrice(totalPrice)}
          </button>
        </form>

        {/* Order summary */}
        <div className="md:sticky md:top-24 self-start rounded-xl border border-border bg-card p-6">
          <h3 className="font-bold text-foreground mb-4">Order Summary</h3>
          <div className="space-y-3">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-center gap-3">
                <img src={product.image} alt={product.name} className="w-12 h-12 rounded-md object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground line-clamp-1">{product.name}</p>
                  <p className="text-xs text-muted-foreground">Qty: {quantity}</p>
                </div>
                <span className="text-sm font-medium text-foreground">{formatPrice(product.price * quantity)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-4 pt-4 flex justify-between">
            <span className="font-bold text-foreground">Total</span>
            <span className="font-bold text-foreground">{formatPrice(totalPrice)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
