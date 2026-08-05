import Card from "./Card";

type Props = {
  enabled: boolean;
  loading: boolean;
  tool: string;
  argumentsText: string;
  onToolChange: (value: string) => void;
  onArgumentsChange: (value: string) => void;
  onExecute: () => void;
};

export default function ExecuteCard({
  enabled,
  loading,
  tool,
  argumentsText,
  onToolChange,
  onArgumentsChange,
  onExecute,
}: Props) {
  return (
    <Card title="Execute">
      <label>Tool</label>

      <input
        value={tool}
        onChange={(e) => onToolChange(e.target.value)}
        placeholder="post_comment_to_task"
      />

      <label>Arguments (JSON)</label>

      <textarea
        rows={10}
        value={argumentsText}
        onChange={(e) =>
          onArgumentsChange(e.target.value)
        }
      />

      <button
        disabled={!enabled || loading}
        onClick={onExecute}
      >
        {loading ? "Executing..." : "Execute"}
      </button>
    </Card>
  );
}
