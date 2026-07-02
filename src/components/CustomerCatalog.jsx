import { useState } from "react";
import { Search } from "lucide-react";
import { CATEGORIES } from "../data/constants.js";
import ProductCard from "./ProductCard.jsx";

export default function CustomerCatalog({ products, onAdd }) {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("Todas");
  const filtered = products.filter(
    (p) => (cat === "Todas" || p.category === cat) && p.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div style={{ padding: 26, maxWidth: 1180, margin: "0 auto" }}>
      <h2 className="bh-serif" style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>Nuestra vitrina</h2>
      <p style={{ fontSize: 13.5, color: "#6b5c3f", marginBottom: 18 }}>Recién horneado cada mañana, directo desde nuestro obrador.</p>

      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
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

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 16 }}>
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={onAdd} />
        ))}
        {filtered.length === 0 && <p style={{ color: "#8a7a54" }}>No se encontraron productos.</p>}
      </div>
    </div>
  );
}
