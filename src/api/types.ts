// export type AgentResponse = Record<string, unknown>;

// export type ChatRequest = {
//   query: string;
// };
export type AgentResponse = {
  final_narration: string | null;
  video_url: string | null;
  error?: string;
};

export type ChatRequest = {
  query: string;
};
