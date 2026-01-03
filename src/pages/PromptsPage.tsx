import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE =
  (import.meta.env.VITE_API_BASE as string | undefined) ??
  "http://127.0.0.1:8000";

export default function PromptsPage() {
  const navigate = useNavigate();
  const [prompts, setPrompts] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/prompts`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load prompts");
        return r.json();
      })
      .then(setPrompts)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <div style={{ padding: 24, maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>System Prompts</h1>
        <button className="btnPrimary" onClick={() => navigate("/")}>
          ← Back
        </button>
      </div>

      {error && <div style={{ color: "red" }}>{error}</div>}
      {!prompts && !error && <div>Loading prompts…</div>}

      {prompts &&
  Object.entries(prompts).map(([key, value]) => (
    <div key={key} className="panel" style={{ height: "auto", marginBottom: 16 }}>
      <div className="panelTitle">
        <span>{key}</span>
      </div>

      <div className="panelBody" style={{ overflow: "visible", paddingRight: 0 }}>
        <div
  className="narrationText"
  style={{
    fontFamily: "var(--mono)",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    overflowWrap: "anywhere",
  }}
>
  {value}
</div>

      </div>
    </div>
  ))}

    </div>
  );
}
