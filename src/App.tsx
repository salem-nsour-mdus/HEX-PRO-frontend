// import { useRef, useState } from "react";
// import Header from "./components/Header";
// import PromptBox from "./components/PromptBox";
// import ResponsePanel from "./components/ResponsePanel";
// import VideoPanel from "./components/VideoPanel";
// import { extractVideoUrl, postChat } from "./api/client";

// import "./styles/theme.css";
// import "./styles/app.css";

// export default function App() {
//   const apiBase = (import.meta.env.VITE_API_BASE as string | undefined) ?? "http://127.0.0.1:8000";

//   const [query, setQuery] = useState("");
//   const [loading, setLoading] = useState(false);

//   // NEW: narration only (what you want to show)
//   const [narration, setNarration] = useState<string | null>(null);

//   // Optional: keep raw response for debugging (you can remove later)
//   //const [result, setResult] = useState<unknown>(null);

//   const [error, setError] = useState<string | null>(null);
//   const [videoUrl, setVideoUrl] = useState<string | null>(null);

//   const abortRef = useRef<AbortController | null>(null);

//   async function onSend() {
//     const q = query.trim();
//     if (!q || loading) return;

//     setLoading(true);
//     setError(null);
//     //setResult(null);
//     setNarration(null);
//     setVideoUrl(null);

//     // cancel any in-flight request
//     abortRef.current?.abort();
//     const controller = new AbortController();
//     abortRef.current = controller;

//     try {
//       const data = await postChat(q, { signal: controller.signal, timeoutMs: 180_000 });

//       // keep for debugging (optional)
//       //setResult(data);

//       // NEW: set narration from backend field
//       const fn = (data as any)?.final_narration;
//       setNarration(typeof fn === "string" ? fn : null);

//       // video url
//       const v = extractVideoUrl(data);
//       if (v) setVideoUrl(v);
//     } catch (e: any) {
//       setError(e?.message || "Unknown error");
//     } finally {
//       setLoading(false);
//     }
//   }

//   function onClear() {
//     setQuery("");
//     setError(null);
//     //setResult(null);
//     setNarration(null);
//     setVideoUrl(null);
//     abortRef.current?.abort();
//   }

//   return (
//     <div className="page">
//       <div className="bg" aria-hidden="true" />

//       <main className="shell">
//         <Header apiBase={apiBase} />

//         <section className="card">
//           <div className="cardInner">
//             {/* <label className="label">Prompt</label> */}

//             <PromptBox
//               value={query}
//               onChange={setQuery}
//               onSend={onSend}
//               onClear={onClear}
//               loading={loading}
//             />

//             <div className="divider" />

//             <div className="grid2">
//               {/* CHANGED: pass narration instead of result */}
//               <ResponsePanel loading={loading} error={error} narration={narration} />
//               <VideoPanel loading={loading} videoUrl={videoUrl} />
//             </div>
//           </div>
//         </section>

//         <footer className="footer">
//           <span className="muted">
          
//           </span>
//         </footer>
//       </main>
//     </div>
//   );
// }

//   // Enter sends. Shift+Enter adds a newline. Configure <span className="mono">VITE_API_BASE</span> for deployment.

import { useRef, useState } from "react";
import Header from "./components/Header";
import PromptBox from "./components/PromptBox";
import ResponsePanel from "./components/ResponsePanel";
import VideoPanel from "./components/VideoPanel";
import { extractVideoUrl, postChat } from "./api/client";

import { Routes, Route, useNavigate } from "react-router-dom";
import PromptsPage from "./pages/PromptsPage";

import "./styles/theme.css";
import "./styles/app.css";

export default function App() {
  const apiBase =
    (import.meta.env.VITE_API_BASE as string | undefined) ?? "http://127.0.0.1:8000";

  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [narration, setNarration] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  async function onSend() {
    const q = query.trim();
    if (!q || loading) return;

    setLoading(true);
    setError(null);
    setNarration(null);
    setVideoUrl(null);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const data = await postChat(q, { signal: controller.signal, timeoutMs: 180_000 });

      const fn = (data as any)?.final_narration;
      setNarration(typeof fn === "string" ? fn : null);

      const v = extractVideoUrl(data);
      if (v) setVideoUrl(v);
    } catch (e: any) {
      setError(e?.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  function onClear() {
    setQuery("");
    setError(null);
    setNarration(null);
    setVideoUrl(null);
    abortRef.current?.abort();
  }

  // ✅ Put your existing UI inside this component for the "/" route
  const ChatUI = (
    <div className="page">
      <div className="bg" aria-hidden="true" />

      <main className="shell">
        <Header apiBase={apiBase} />

        

        <section className="card">
          <div className="cardInner">
            <PromptBox
              value={query}
              onChange={setQuery}
              onSend={onSend}
              onClear={onClear}
              loading={loading}
            />

            <div className="divider" />

            <div className="grid2">
              <ResponsePanel loading={loading} error={error} narration={narration} />
              <VideoPanel loading={loading} videoUrl={videoUrl} />
            </div>
          </div>
        </section>
        <div
  style={{
    display: "flex",
    justifyContent: "center",
    marginTop: 20,
  }}
>
  <button
    className="btnPrimary"
    onClick={() => navigate("/prompts")}
    disabled={loading}
  >
    View Prompts
  </button>
</div>


        <footer className="footer">
          <span className="muted"></span>
        </footer>
      </main>
    </div>
  );

  // ✅ Routing
  return (
    <Routes>
      <Route path="/" element={ChatUI} />
      <Route path="/prompts" element={<PromptsPage />} />
    </Routes>
  );
}
