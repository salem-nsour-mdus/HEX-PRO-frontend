// function prettyJson(v: unknown) {
//   try {
//     return JSON.stringify(v, null, 2);
//   } catch {
//     return String(v);
//   }
// }

// export default function ResponsePanel({
//   loading,
//   error,
//   result,
// }: {
//   loading: boolean;
//   error: string | null;
//   result: unknown;
// }) {
//   return (
//     <div className="panel">
//       <div className="panelTitle">Response</div>

//       {error && (
//         <div className="alert">
//           <div className="alertTitle">Request failed</div>
//           <div className="alertBody">{error}</div>
//         </div>
//       )}

//       {!error && result == null && !loading && (
//         <div className="empty">
//           The agent JSON response will appear here.
//         </div>
//       )}

//       {loading && (
//         <div className="empty">
//           Working… generation may take time depending on the pipeline.
//         </div>
//       )}

//       {!error && result != null && <pre className="json">{prettyJson(result)}</pre>}
//     </div>
//   );
// }
export default function ResponsePanel({
  loading,
  error,
  narration,
}: {
  loading: boolean;
  error: string | null;
  narration: string | null;
}) {
  return (
    <div className="panel">
      <div className="panelTitle">Final Narration</div>

      <div className="panelBody">
        {loading ? (
          <div className="empty">
            Generating narration… this may take a moment.
          </div>
        ) : error ? (
          <div className="alert">
            <div className="alertTitle">Request failed</div>
            <div className="alertBody">{error}</div>
          </div>
        ) : narration ? (
          <div className="narrationText">{narration}</div>
        ) : (
          <div className="empty">
            Final narration will appear here.
          </div>
        )}
      </div>
    </div>
  );
}
