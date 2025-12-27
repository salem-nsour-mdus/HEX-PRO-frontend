export default function Header({}: { apiBase: string }) {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="mark" />
        <div className="brandText">
          <div className="brandName">MDus</div>
          <div className="brandSub">Video Generation</div>
        </div>
      </div>

      {/* <div className="envPill" title="Backend URL">
        <span className="dot" />
        <span className="mono">{apiBase}</span>
      </div> */}
    </header>
  );
}
