import { useState } from "react";

import "./App.css";

import Card from "./components/Card";
import ConnectionCard from "./components/ConnectionCard";

export default function App() {
  const [url, setUrl] = useState("https://mcp.clickup.com/mcp");

  const [token, setToken] = useState("");

  const [response, setResponse] = useState(
    "Waiting for requests..."
  );

  const [loading, setLoading] = useState(false);

  const [connected, setConnected] = useState(false);

  async function connect() {
    setLoading(true);

    try {
      const res = await fetch("/api/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          token,
        }),
      });

      const json = await res.json();

      setConnected(json.success);

      setResponse(JSON.stringify(json, null, 2));
    } catch (err: any) {
      setConnected(false);

      setResponse(err.message);
    }

    setLoading(false);
  }

  return (
    <div className="app">
      <header className="header">
        <h1>MCP Inspector</h1>

        <p>ClickUp MCP Diagnostic Tool</p>
      </header>

      <ConnectionCard
        url={url}
        token={token}
        loading={loading}
        onUrlChange={setUrl}
        onTokenChange={setToken}
        onConnect={connect}
      />

      <Card title="Session">
        <p>Status</p>

        <strong>
          {connected ? "Connected" : "Not Connected"}
        </strong>

        <button disabled>
          Initialize
        </button>
      </Card>

      <Card title="Tools">
        <button disabled>
          List Tools
        </button>

        <p>No tools loaded.</p>
      </Card>

      <Card title="Execute">
        <label>Tool</label>

        <select disabled>
          <option>No tools</option>
        </select>

        <label>Arguments (JSON)</label>

        <textarea
          rows={8}
          defaultValue={"{}"}
        />

        <button disabled>
          Execute
        </button>
      </Card>

      <Card title="Response">
        <pre>{response}</pre>
      </Card>
    </div>
  );
}
