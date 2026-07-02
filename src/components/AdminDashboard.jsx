import { Euro, ClipboardList, AlertTriangle, Package, TrendingUp } from "lucide-react";
import { euro, fmtDate } from "../utils/format.js";
import StatusPill from "./StatusPill.jsx";

export default function AdminDashboard({ products, orders }) {
  const revenue = orders.filter((o) => o.status !== "Cancelado").reduce((s, o) => s + o.total, 0);
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5).length;
  const outStock = products.filter((p) => p.stock === 0).length;

  const salesByProduct = {};
  orders.forEach((o) => {
    if (o.status === "Cancelado") return;
    o.items.forEach((it) => {
      salesByProduct[it.name] = (salesByProduct[it.name] || 0) + it.qty;
    });
  });
  const topProducts = Object.entries(salesByProduct).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const maxTop = topProducts.length ? topProducts[0][1] : 1;

  const stats = [
    { label: "Ingresos totales", value: euro(revenue), icon: Euro, color: "var(--forest)" },
    { label: "Pedidos totales", value: orders.length, icon: ClipboardList, color: "#5B3A82" },
    { label: "Stock bajo", value: lowStock, icon: AlertTriangle, color: "var(--gold)" },
    { label: "Agotados", value: outStock, icon: Package, color: "var(--brick)" },
  ];

  return (
    <div style={{ padding: 26, maxWidth: 1180, margin: "0 auto" }}>
      <h2 className="bh-serif" style={{ fontSize: 26, fontWeight: 700, marginBottom: 20 }}>Resumen general</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 14, marginBottom: 28 }}>
        {stats.map((s) => (
          <div key={s.label} className="bh-card" style={{ padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span className="bh-label" style={{ marginBottom: 0 }}>{s.label}</span>
              <s.icon size={18} color={s.color} />
            </div>
            <div className="bh-serif" style={{ fontSize: 30, fontWeight: 700, marginTop: 8, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 20 }}>
        <div className="bh-card" style={{ padding: 20 }}>
          <h3 className="bh-serif" style={{ fontSize: 18, fontWeight: 700, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <TrendingUp size={18} color="var(--forest)" /> Más vendidos
          </h3>
          {topProducts.length === 0 && <p style={{ fontSize: 13.5, color: "#8a7a54" }}>Todavía no hay ventas registradas.</p>}
          {topProducts.map(([name, qty]) => (
            <div key={name} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, marginBottom: 4 }}>
                <span>{name}</span>
                <span className="bh-mono">{qty} uds.</span>
              </div>
              <div style={{ height: 8, background: "#eee0bc", borderRadius: 4 }}>
                <div style={{ height: 8, width: `${(qty / maxTop) * 100}%`, background: "var(--gold)", borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>

        <div className="bh-card" style={{ padding: 20 }}>
          <h3 className="bh-serif" style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>Pedidos recientes</h3>
          {orders.length === 0 && <p style={{ fontSize: 13.5, color: "#8a7a54" }}>Aún no se han recibido pedidos.</p>}
          {orders.slice(0, 5).map((o) => (
            <div key={o.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid #eee0bc", fontSize: 13.5 }}>
              <div>
                <div style={{ fontWeight: 600 }}>{o.customerName}</div>
                <div className="bh-mono" style={{ fontSize: 11, color: "#8a7a54" }}>{fmtDate(o.date)}</div>
              </div>
              <StatusPill status={o.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
