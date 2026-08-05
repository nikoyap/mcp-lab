import Card from "./Card";

type Tool = {
  name: string;
};

type Props = {
  enabled: boolean;
  loading: boolean;
  tools: Tool[];
  selectedTool: string;
  onSelectTool: (value: string) => void;
  onListTools: () => void;
};

export default function ToolsCard({
  enabled,
  loading,
  tools,
  selectedTool,
  onSelectTool,
  onListTools,
}: Props) {
  return (
    <Card title="Tools">
      <button
        onClick={onListTools}
        disabled={!enabled || loading}
      >
        {loading ? "Loading..." : "List Tools"}
      </button>

      <label>Available Tools</label>

      <select
        disabled={tools.length === 0}
        value={selectedTool}
        onChange={(e) => onSelectTool(e.target.value)}
      >
        <option value="">Select a tool</option>

        {tools.map((tool) => (
          <option
            key={tool.name}
            value={tool.name}
          >
            {tool.name}
          </option>
        ))}
      </select>
    </Card>
  );
}
