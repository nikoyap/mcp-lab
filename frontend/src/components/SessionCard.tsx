import Card from "./Card";

type Props = {
  connected: boolean;
  loading: boolean;
  onInitialize: () => void;
};

export default function SessionCard({
  connected,
  loading,
  onInitialize,
}: Props) {
  return (
    <Card title="Session">
      <label>Status</label>

      <strong>
        {connected ? "Connected" : "Not Connected"}
      </strong>

      <button
        disabled={!connected || loading}
        onClick={onInitialize}
      >
        {loading ? "Initializing..." : "Initialize"}
      </button>
    </Card>
  );
}
