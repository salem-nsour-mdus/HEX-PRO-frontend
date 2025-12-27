export default function VideoPanel({
  loading,
  videoUrl,
}: {
  loading: boolean;
  videoUrl: string | null;
}) {
  return (
    <div className="panel">
      <div className="panelTitle">Generated Video</div>

      {!videoUrl && !loading && (
        <div className="empty">
          No video yet. When the backend returns <span className="mono">video_url</span> (or similar),
          it will appear here.
        </div>
      )}

      {loading && (
        <div className="empty">Waiting for the video output…</div>
      )}

      {videoUrl && (
        <div className="videoWrap">
          <video className="video" src={videoUrl} controls playsInline />
          <div className="videoMeta">
            <a className="link" href={videoUrl} target="_blank" rel="noreferrer">
              Open / Download video
            </a>
            {/* <div className="mono small">{videoUrl}</div> */}
          </div>
        </div>
      )}
    </div>
  );
}
