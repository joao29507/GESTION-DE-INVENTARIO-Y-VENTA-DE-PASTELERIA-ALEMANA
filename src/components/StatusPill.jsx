const COLORS = {
  Pendiente: { bg: "#F3E6C8", fg: "#8A6A1E" },
  Preparando: { bg: "#E4D4F0", fg: "#5B3A82" },
  Listo: { bg: "#D6E9DA", fg: "#2F6B45" },
  Entregado: { bg: "#1F3B2C", fg: "#FBF3E1" },
  Cancelado: { bg: "#F0D6D2", fg: "#9C3B2E" },
};

export default function StatusPill({ status }) {
  const c = COLORS[status] || COLORS.Pendiente;
  return (
    <span
      className="bh-mono"
      style={{
        background: c.bg,
        color: c.fg,
        padding: "4px 10px",
        borderRadius: 3,
        fontSize: 12,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: ".05em",
      }}
    >
      {status}
    </span>
  );
}
