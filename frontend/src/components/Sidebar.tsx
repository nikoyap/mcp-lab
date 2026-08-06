export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          ⚡
        </div>

        <div>
          <h2>MCP Inspector</h2>
          <p>ClickUp MCP Tool</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <a className="active">Dashboard</a>
{/*
        <a>Connection</a>
        <a>Tools</a>
        <a>Execute</a>
        <a>History</a>
        <a>Settings</a>
*/}
      </nav>

      <div className="system-card">
        <div className="status-dot" />

        <div>
          <strong>System Status</strong>
          <p>Healthy</p>
        </div>

        <hr />

        <p>Version</p>
        <strong>1.0.0</strong>
      </div>
    </aside>
  );
}
