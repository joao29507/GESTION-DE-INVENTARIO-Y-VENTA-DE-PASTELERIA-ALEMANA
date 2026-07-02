import { Check, AlertTriangle } from "lucide-react";

export default function Toast({ toast }) {
  if (!toast) return null;
  const isErr = toast.type === "error";
  return (
    <div className="bh-toast" style={{ background: isErr ? "#9C3B2E" : "#1F3B2C", color: "#FBF3E1" }}>
      {isErr ? <AlertTriangle size={16} /> : <Check size={16} />}
      {toast.msg}
    </div>
  );
}
