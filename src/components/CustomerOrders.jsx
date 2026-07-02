import { ClipboardList } from "lucide-react";
import { euro, fmtDate } from "../utils/format.js";
import StatusPill from "./StatusPill.jsx";

export default function CustomerOrders({ orders }) {
  return (
    <div style={{ padding: 26, maxWidth: 800, margin: "0 auto" }}>
      <h2 className="bh-serif" style={{ fontSize: 26, fontWeight: 700, marginBottom: 18 }}>Mis pedidos</h2>
      {orders.length === 0 && (
        <div className="bh-card" style={{ padding: 40, textAlign: "center", color: "#8a7a54" }}>
          <ClipboardList size={32} style={{ marginBottom: 10, opacity: .5 }} />
          <p>Todavía no has realizado ningún pedido.</p>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {orders.map((o) => (
          <div key={o.id} className="bh-ticket" style={{ padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div className="bh-mono" style={{ fontSize: 11.5, color: "#8a7a54" }}>#{o.id.slice(-6).toUpperCase()} · {fmtDate(o.date)}</div>
              <StatusPill status={o.status} />
            </div>
            <div style={{ borderTop: "1px dashed #cbb98a", paddingTop: 10 }}>
              {o.items.map((it) => (
                <div key={it.productId} style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, padding: "3px 0" }}>
                  <span>{it.qty} × {it.name}</span>
                  <span className="bh-mono">{euro(it.qty * it.price)}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, marginTop: 8, fontSize: 14.5 }}>
                <span>Total</span>
                <span className="bh-mono">{euro(o.total)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
