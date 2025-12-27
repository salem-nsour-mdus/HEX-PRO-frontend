import type { AgentResponse, ChatRequest } from "./types";

const RAW_BASE = (import.meta.env.VITE_API_BASE as string | undefined) ?? "http://127.0.0.1:8000";
const API_BASE = RAW_BASE.replace(/\/+$/, "");

export function makeAbsoluteUrl(maybeRelative: string): string {
  if (/^https?:\/\//i.test(maybeRelative)) return maybeRelative;
  const path = maybeRelative.startsWith("/") ? maybeRelative : `/${maybeRelative}`;
  return `${API_BASE}${path}`;
}

export function extractVideoUrl(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;

  const p = payload as Record<string, any>;

  // Direct keys (recommended: video_url)
  const directCandidates = [
    p.video_url,
    p.videoUrl,
    p.video,
    p.output_video_url,
    p.outputVideoUrl,
    p.url,
  ];

  // Nested common keys
  const nestedCandidates: any[] = [];
  if (p.result && typeof p.result === "object") {
    const r = p.result as Record<string, any>;
    nestedCandidates.push(
      r.video_url,
      r.videoUrl,
      r.video,
      r.output_video_url,
      r.outputVideoUrl,
      r.url
    );
  }
  if (p.data && typeof p.data === "object") {
    const d = p.data as Record<string, any>;
    nestedCandidates.push(d.video_url, d.videoUrl, d.output_video_url, d.url);
  }

  const found = [...directCandidates, ...nestedCandidates].find(
    (x) => typeof x === "string" && x.trim().length > 0
  ) as string | undefined;

  return found ? makeAbsoluteUrl(found.trim()) : null;
}

export async function postChat(query: string, opts?: { signal?: AbortSignal; timeoutMs?: number }) {
  const controller = new AbortController();
  const signal = opts?.signal ?? controller.signal;

  const timeoutMs = opts?.timeoutMs ?? 120_000; // allow long generation
  const t = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const body: ChatRequest = { query };

    const res = await fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal,
    });

    const data = (await res.json().catch(() => ({}))) as AgentResponse;

    if (!res.ok) {
      const msg = typeof (data as any)?.error === "string" ? (data as any).error : `HTTP ${res.status}`;
      throw new Error(msg);
    }

    if (typeof (data as any)?.error === "string") {
      throw new Error((data as any).error);
    }

    return data;
  } finally {
    window.clearTimeout(t);
  }
}
