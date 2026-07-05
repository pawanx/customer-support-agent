import "./Reasoning.css";

export default function Reasoning({ logs }) {
  return (
    <div className="reasoning-panel">
      <div className="reasoning-header">
        <h2>Agent Reasoning</h2>
      </div>

      <div className="reasoning-body">
        {logs.length === 0 ? (
          <p className="empty">Waiting for a request...</p>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="reasoning-card">
              <div className="step">✓ {log.step}</div>
              <div className="details">{log.details}</div>
              <div className="time">{log.time}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}