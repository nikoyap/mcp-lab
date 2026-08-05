import Card from "./Card";

type ConnectionCardProps = {
  url: string;
  token: string;
  loading: boolean;
  onUrlChange: (value: string) => void;
  onTokenChange: (value: string) => void;
  onConnect: () => void;
};

export default function ConnectionCard({
  url,
  token,
  loading,
  onUrlChange,
  onTokenChange,
  onConnect,
}: ConnectionCardProps) {
  return (
    <Card title="Connection">
      <label>Server URL</label>

      <input
        value={url}
        onChange={(e) => onUrlChange(e.target.value)}
        placeholder="https://mcp.clickup.com/mcp"
      />

      <label>Bearer Token</label>

      <input
        type="password"
        value={token}
        onChange={(e) => onTokenChange(e.target.value)}
        placeholder="Optional"
      />

      <button
        onClick={onConnect}
        disabled={loading}
      >
        {loading ? "Connecting..." : "Connect"}
      </button>
    </Card>
  );
}
