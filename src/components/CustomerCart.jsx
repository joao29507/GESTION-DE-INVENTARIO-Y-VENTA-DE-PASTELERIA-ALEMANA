import { useState } from "react";
import { ShoppingCart, Minus, Plus, Trash2, ChevronRight } from "lucide-react";
import { euro } from "../utils/format.js";

export default function CustomerCart({ cart, products, onChangeQty, onRemove, onCheckout, setView }) {
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const [placing, setPlacing] = useState(false);

  async function handleCheckout() {
    setPlacing(true);
    const ok = await onCheckout();
    setPlacing(false);
    if (ok) setView("myorders");
  }

  return (
    <div style={{ padding: 26, maxWidth: 800, margin: "0 auto" }}>
      <h2 className="bh-serif" style={{ fontSize: 26, fontWeight: 700, marginBottom: 18 }}>Tu carrito</h2>
      {cart.length === 0 && (
        <div className="bh-card" style={{ padding: 40, textAlign: "center", color: "#8a7a54" }}>
          <ShoppingCart size={32} style={{ marginBottom: 10, opacity: .5 }} />
          <p>Tu carrito está vacío. Visita el catálogo para añadir productos.</p>
        </div>
      )}
      {cart.length > 0 && (
        <>
          <div className="bh-card" style={{ padding: 6 }}>
            {cart.map((item) => {
              const p = products.find((x) => x.id === item.productId);
              return (
                <div key={item.productId} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderBottom: "1px solid #eee0bc" }}>
                  <div style={{ fontSize: 28 }}>{p ? p.icon : "🥐"}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14.5 }}>{item.name}</div>
                    <div className="bh-mono" style={{ fontSize: 12, color: "#8a7a54" }}>{euro(item.price)} / ud.</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button className="bh-btn bh-btn-outline bh-btn-sm bh-focus" onClick={() => onChangeQty(item.productId, -1)}><Minus size={13} /></button>
                    <span className="bh-mono" style={{ minWidth: 18, textAlign: "center" }}>{item.qty}</span>
                    <button className="bh-btn bh-btn-outline bh-btn-sm bh-focus" onClick={() => onChangeQty(item.productId, 1)}><Plus size={13} /></button>
                  </div>
                  <div className="bh-mono" style={{ minWidth: 70, textAlign: "right", fontWeight: 700 }}>{euro(item.qty * item.price)}</div>
                  <Trash2 size={16} style={{ cursor: "pointer", color: "var(--brick)" }} onClick={() => onRemove(item.productId)} />
                </div>
              );
            })}
          </div>

          <div className="bh-card" style={{ padding: 18, marginTop: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, fontWeight: 700 }}>
              <span className="bh-serif">Total</span>
              <span className="bh-mono" style={{ color: "var(--forest)" }}>{euro(total)}</span>
            </div>
            <button className="bh-btn bh-btn-primary bh-focus" style={{ width: "100%", marginTop: 14, padding: "12px 0" }} onClick={handleCheckout} disabled={placing}>
              {placing ? "Procesando..." : (<>Confirmar pedido <ChevronRight size={16} /></>)}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
