import { useState } from "react";
import { STATUSES } from "../data/constants.js";
import { euro, fmtDate } from "../utils/format.js";
import StatusPill from "./StatusPill.jsx";

export default function AdminOrders({ orders, onUpdateStatus }) {
  const [filter, setFilter] = useState("Todos");
  const filtered = filter === "Todos" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div style={{ padding: 26, maxWidth: 1180, margin: "0 auto" }}>
      <h2 className="bh-serif" style={{ fontSize: 26, fontWeight: 700, marginBottom: 18 }}>Pedidos</h2>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
        {["Todos", ...STATUSES].map((s) => (
          <div key={s} className={`bh-chip${filter === s ? " active" : ""}`} onClick={() => setFilter(s)}>{s}</div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {filtered.length === 0 && <p style={{ color: "#8a7a54", fontSize: 13.5 }}>No hay pedidos en esta categoría.</p>}
        {filtered.map((o) => (
          <div key={o.id} className="bh-ticket" style={{ padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 10 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{o.customerName}</div>
                <div className="bh-mono" style={{ fontSize: 11.5, color: "#8a7a54" }}>#{o.id.slice(-6).toUpperCase()} · {fmtDate(o.date)}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <StatusPill status={o.status} />
                <select className="bh-input bh-focus" style={{ width: 150, padding: "6px 8px" }} value={o.status} onChange={(e) => onUpdateStatus(o.id, e.target.value)}>
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
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
