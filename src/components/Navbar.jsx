import { LayoutDashboard, Package, ClipboardList, Store, ShoppingCart, User, LogOut } from "lucide-react";
import { STORE_NAME } from "../data/constants.js";

export default function Navbar({ session, onLogout, cartCount, view, setView, isAdmin }) {
  const adminLinks = [
    { id: "dashboard", label: "Resumen", icon: LayoutDashboard },
    { id: "inventory", label: "Inventario", icon: Package },
    { id: "orders", label: "Pedidos", icon: ClipboardList },
  ];
  const customerLinks = [
    { id: "catalog", label: "Catálogo", icon: Store },
    { id: "cart", label: `Carrito${cartCount ? " · " + cartCount : ""}`, icon: ShoppingCart },
    { id: "myorders", label: "Mis pedidos", icon: ClipboardList },
  ];
  const links = isAdmin ? adminLinks : customerLinks;

  return (
    <div style={{ background: "var(--forest)", color: "var(--parchment-light)", padding: "14px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span className="bh-logo" style={{ fontSize: 24 }}>{STORE_NAME}</span>
        <span
          className="bh-mono"
          style={{
            fontSize: 10,
            background: isAdmin ? "var(--gold)" : "#5B3A82",
            color: isAdmin ? "var(--forest-dark)" : "#FBF3E1",
            padding: "3px 8px",
            borderRadius: 3,
            textTransform: "uppercase",
            letterSpacing: ".06em",
            fontWeight: 700,
          }}
        >
          {isAdmin ? "Admin" : "Cliente"}
        </span>
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {links.map((l) => (
          <div key={l.id} className={`bh-nav-link${view === l.id ? " active" : ""}`} onClick={() => setView(l.id)}>
            <l.icon size={16} /> {l.label}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ fontSize: 13, opacity: .85, display: "flex", alignItems: "center", gap: 6 }}>
          <User size={14} /> {session.name}
        </span>
        <button
          className="bh-btn bh-btn-sm bh-focus"
          style={{ background: "transparent", border: "1.5px solid var(--parchment-light)", color: "var(--parchment-light)" }}
          onClick={onLogout}
        >
          <LogOut size={14} /> Salir
        </button>
      </div>
    </div>
  );
}
