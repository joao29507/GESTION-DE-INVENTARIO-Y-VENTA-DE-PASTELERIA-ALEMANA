import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { euro } from "../utils/format.js";
import StockStamp from "./StockStamp.jsx";

export default function ProductCard({ product, onAdd }) {
  const [qty, setQty] = useState(1);
  const outOfStock = product.stock <= 0;
  return (
    <div className="bh-card" style={{ padding: 18, display: "flex", flexDirection: "column", position: "relative" }}>
      <div style={{ position: "absolute", top: 12, right: 12 }}><StockStamp stock={product.stock} /></div>
      <div style={{ fontSize: 42, marginBottom: 8 }}>{product.icon}</div>
      <div style={{ fontWeight: 700, fontSize: 15.5 }}>{product.name}</div>
      <div className="bh-mono" style={{ fontSize: 11, color: "#8a7a54", marginBottom: 6, textTransform: "uppercase" }}>{product.category}</div>
      <p style={{ fontSize: 13, color: "#6b5c3f", flex: 1, marginBottom: 12 }}>{product.desc}</p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span className="bh-serif" style={{ fontSize: 20, fontWeight: 700, color: "var(--forest)" }}>{euro(product.price)}</span>
        <span style={{ fontSize: 12, color: "#8a7a54" }}>/ {product.unit}</span>
      </div>
      {!outOfStock && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <button className="bh-btn bh-btn-outline bh-btn-sm bh-focus" onClick={() => setQty((q) => Math.max(1, q - 1))}><Minus size={13} /></button>
          <span className="bh-mono" style={{ minWidth: 20, textAlign: "center" }}>{qty}</span>
          <button className="bh-btn bh-btn-outline bh-btn-sm bh-focus" onClick={() => setQty((q) => Math.min(product.stock, q + 1))}><Plus size={13} /></button>
        </div>
      )}
      <button
        className="bh-btn bh-focus"
        disabled={outOfStock}
        style={{ background: outOfStock ? "#cbb98a" : "var(--forest)", color: "var(--cream)", padding: "9px 0" }}
        onClick={() => onAdd(product, qty)}
      >
        {outOfStock ? "Agotado" : (<><ShoppingCart size={14} /> Añadir</>)}
      </button>
    </div>
  );
}
