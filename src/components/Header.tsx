export default function Header({}: { apiBase: string }) {
  return (
    <header className="topbar">
      <div className="brand">
         <img
          src="/logo_mdus.png"
          alt="MDus.AI logo"
          className="logoOnly"
        />
        <div className="brandText">
          <div className="brandName">MDus.ai</div>
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
