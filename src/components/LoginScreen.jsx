import { useState } from "react";
import { Loader2 } from "lucide-react";
import { STORE_NAME, TAGLINE } from "../data/constants.js";

export default function LoginScreen({ onLogin, onRegister }) {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    if (mode === "login") await onLogin(username.trim(), password);
    else await onRegister(username.trim(), password, name.trim());
    setBusy(false);
  }

  return (
    <div className="bh-root" style={{ display: "flex", minHeight: "100vh" }}>
      <div
        style={{
          flex: "1 1 46%",
          background: "linear-gradient(160deg, var(--forest) 0%, var(--forest-dark) 100%)",
          color: "var(--parchment-light)",
          padding: "56px 48px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "100vh",
        }}
      >
        <div>
          <div className="bh-logo" style={{ fontSize: 40, lineHeight: 1 }}>{STORE_NAME}</div>
          <div className="bh-mono" style={{ fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", opacity: .75, marginTop: 10 }}>{TAGLINE}</div>
        </div>

        <div>
          <div style={{ display: "inline-block", transform: "rotate(-4deg)" }}>
            <div
              className="bh-mono"
              style={{
                border: "3px solid var(--gold-light)",
                color: "var(--gold-light)",
                borderRadius: 8,
                padding: "10px 18px",
                fontWeight: 700,
                letterSpacing: ".1em",
                fontSize: 13,
                textTransform: "uppercase",
              }}
            >
              Ofenfrisch · Seit 1987
            </div>
          </div>
          <p className="bh-serif" style={{ fontSize: 26, lineHeight: 1.4, marginTop: 28, maxWidth: 420, fontWeight: 500, fontStyle: "italic" }}>
            "Cada Torte, cada Brezel, horneado como en la Selva Negra."
          </p>
        </div>

        <div className="bh-mono" style={{ fontSize: 12, opacity: .6 }}>
          Sistema de gestión de inventario y ventas
        </div>
      </div>

      <div style={{ flex: "1 1 54%", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ width: "100%", maxWidth: 380 }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 24, background: "#e9dbb4", borderRadius: 4, padding: 4 }}>
            <button
              className="bh-btn bh-focus"
              onClick={() => setMode("login")}
              style={{ flex: 1, padding: "9px 0", background: mode === "login" ? "var(--forest)" : "transparent", color: mode === "login" ? "var(--cream)" : "var(--forest)" }}
            >
              Iniciar sesión
            </button>
            <button
              className="bh-btn bh-focus"
              onClick={() => setMode("register")}
              style={{ flex: 1, padding: "9px 0", background: mode === "register" ? "var(--forest)" : "transparent", color: mode === "register" ? "var(--cream)" : "var(--forest)" }}
            >
              Crear cuenta
            </button>
          </div>

          <h2 className="bh-serif" style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>
            {mode === "login" ? "Bienvenido de nuevo" : "Crea tu cuenta de cliente"}
          </h2>
          <p style={{ fontSize: 13.5, color: "#6b5c3f", marginBottom: 22 }}>
            {mode === "login" ? "Accede como administrador o como cliente." : "Regístrate para comprar en nuestra tienda."}
          </p>

          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {mode === "register" && (
              <div>
                <label className="bh-label">Nombre completo</label>
                <input className="bh-input bh-focus" value={name} onChange={(e) => setName(e.target.value)} placeholder="Anna Weber" required />
              </div>
            )}
            <div>
              <label className="bh-label">Usuario</label>
              <input className="bh-input bh-focus" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="usuario" required autoComplete="username" />
            </div>
            <div>
              <label className="bh-label">Contraseña</label>
              <input
                className="bh-input bh-focus"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete={mode === "login" ? "current-password" : "new-password"}
              />
            </div>
            <button className="bh-btn bh-btn-gold bh-focus" type="submit" disabled={busy} style={{ marginTop: 6, padding: "12px 0" }}>
              {busy ? <Loader2 size={16} className="bh-spin" /> : mode === "login" ? "Entrar" : "Crear cuenta"}
            </button>
          </form>

          <div
            className="bh-mono"
            style={{ marginTop: 22, fontSize: 11.5, color: "#8a7a54", background: "#efe3c2", padding: "10px 12px", borderRadius: 4, border: "1px dashed #cbb98a" }}
          >
            Demo admin → usuario: <b>admin</b> · contraseña: <b>admin123</b>
            <br />
            (Registra una cuenta nueva para entrar como cliente)
          </div>
        </div>
      </div>
    </div>
  );
}
