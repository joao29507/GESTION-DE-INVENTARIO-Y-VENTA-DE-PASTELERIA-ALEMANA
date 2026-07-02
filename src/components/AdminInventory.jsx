import { useState } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { CATEGORIES } from "../data/constants.js";
import { euro } from "../utils/format.js";
import StockStamp from "./StockStamp.jsx";
import ProductFormModal from "./ProductFormModal.jsx";

export default function AdminInventory({ products, onSave, onDelete }) {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("Todas");
  const [modal, setModal] = useState(null); // null | {} | product
  const [confirmDel, setConfirmDel] = useState(null);

  const filtered = products.filter(
    (p) => (cat === "Todas" || p.category === cat) && p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 26, maxWidth: 1180, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 18 }}>
        <h2 className="bh-serif" style={{ fontSize: 26, fontWeight: 700 }}>Inventario</h2>
        <button className="bh-btn bh-btn-primary bh-focus" onClick={() => setModal({})}>
          <Plus size={16} /> Nuevo producto
        </button>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: "1 1 220px" }}>
          <Search size={15} style={{ position: "absolute", left: 10, top: 12, color: "#8a7a54" }} />
          <input className="bh-input bh-focus" style={{ paddingLeft: 32 }} placeholder="Buscar producto..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["Todas", ...CATEGORIES].map((c) => (
            <div key={c} className={`bh-chip${cat === c ? " active" : ""}`} onClick={() => setCat(c)}>{c}</div>
          ))}
        </div>
      </div>

      <div className="bh-card" style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
          <thead>
            <tr style={{ background: "#efe3c2", textAlign: "left" }}>
              {["", "Producto", "Categoría", "Precio", "Stock", ""].map((h) => (
                <th key={h} style={{ padding: "10px 14px", fontWeight: 700, color: "var(--forest)", fontSize: 11.5, textTransform: "uppercase", letterSpacing: ".05em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} style={{ borderTop: "1px solid #eee0bc" }}>
                <td style={{ padding: "10px 14px", fontSize: 22 }}>{p.icon}</td>
                <td style={{ padding: "10px 14px" }}>
                  <div style={{ fontWeight: 700 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: "#8a7a54", maxWidth: 320 }}>{p.desc}</div>
                </td>
                <td style={{ padding: "10px 14px" }}>{p.category}</td>
                <td className="bh-mono" style={{ padding: "10px 14px" }}>{euro(p.price)}</td>
                <td style={{ padding: "10px 14px" }}><StockStamp stock={p.stock} /></td>
                <td style={{ padding: "10px 14px", whiteSpace: "nowrap" }}>
                  <button className="bh-btn bh-btn-outline bh-btn-sm bh-focus" style={{ marginRight: 6 }} onClick={() => setModal(p)}><Pencil size={13} /></button>
                  <button className="bh-btn bh-btn-danger bh-btn-sm bh-focus" onClick={() => setConfirmDel(p)}><Trash2 size={13} /></button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: 24, textAlign: "center", color: "#8a7a54" }}>No se encontraron productos.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modal !== null && (
        <ProductFormModal
          initial={modal.id ? modal : null}
          onClose={() => setModal(null)}
          onSave={(data) => {
            onSave(modal.id ? { ...modal, ...data } : data);
            setModal(null);
          }}
        />
      )}

      {confirmDel && (
        <div className="bh-modal-backdrop" onClick={() => setConfirmDel(null)}>
          <div className="bh-card" onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 360, padding: 24 }}>
            <h3 className="bh-serif" style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>¿Eliminar producto?</h3>
            <p style={{ fontSize: 13.5, color: "#6b5c3f", marginBottom: 18 }}>
              Esta acción eliminará <b>{confirmDel.name}</b> del inventario de forma permanente.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="bh-btn bh-btn-outline bh-focus" style={{ flex: 1 }} onClick={() => setConfirmDel(null)}>Cancelar</button>
              <button
                className="bh-btn bh-focus"
                style={{ flex: 1, background: "var(--brick)", color: "var(--cream)" }}
                onClick={() => {
                  onDelete(confirmDel.id);
                  setConfirmDel(null);
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
