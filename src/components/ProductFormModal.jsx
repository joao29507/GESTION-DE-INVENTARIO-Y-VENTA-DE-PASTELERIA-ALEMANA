import { useState } from "react";
import { X } from "lucide-react";
import { CATEGORIES } from "../data/constants.js";

export default function ProductFormModal({ initial, onClose, onSave }) {
  const [form, setForm] = useState(
    initial || { name: "", category: CATEGORIES[0], price: "", stock: "", unit: "unidad", icon: "🍰", desc: "" }
  );
  function set(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }
  function submit(e) {
    e.preventDefault();
    onSave({ ...form, price: parseFloat(form.price), stock: parseInt(form.stock, 10) });
  }
  return (
    <div className="bh-modal-backdrop" onClick={onClose}>
      <form className="bh-card" onClick={(e) => e.stopPropagation()} onSubmit={submit} style={{ width: "100%", maxWidth: 460, padding: 26, maxHeight: "88vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h3 className="bh-serif" style={{ fontSize: 20, fontWeight: 700 }}>{initial ? "Editar producto" : "Nuevo producto"}</h3>
          <X size={20} style={{ cursor: "pointer" }} onClick={onClose} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <label className="bh-label">Nombre</label>
            <input className="bh-input bh-focus" required value={form.name} onChange={(e) => set("name", e.target.value)} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 90px", gap: 10 }}>
            <div>
              <label className="bh-label">Categoría</label>
              <select className="bh-input bh-focus" value={form.category} onChange={(e) => set("category", e.target.value)}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="bh-label">Icono</label>
              <input className="bh-input bh-focus" value={form.icon} onChange={(e) => set("icon", e.target.value)} maxLength={2} style={{ textAlign: "center", fontSize: 20 }} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            <div>
              <label className="bh-label">Precio (€)</label>
              <input className="bh-input bh-focus" required type="number" step="0.10" min="0" value={form.price} onChange={(e) => set("price", e.target.value)} />
            </div>
            <div>
              <label className="bh-label">Stock</label>
              <input className="bh-input bh-focus" required type="number" min="0" value={form.stock} onChange={(e) => set("stock", e.target.value)} />
            </div>
            <div>
              <label className="bh-label">Unidad</label>
              <input className="bh-input bh-focus" value={form.unit} onChange={(e) => set("unit", e.target.value)} />
            </div>
          </div>
          <div>
            <label className="bh-label">Descripción</label>
            <textarea className="bh-input bh-focus" rows={3} value={form.desc} onChange={(e) => set("desc", e.target.value)} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button type="button" className="bh-btn bh-btn-outline bh-focus" style={{ flex: 1 }} onClick={onClose}>Cancelar</button>
          <button type="submit" className="bh-btn bh-btn-primary bh-focus" style={{ flex: 1 }}>Guardar</button>
        </div>
      </form>
    </div>
  );
}
