import Card from "./Card";

type Tool = {
  name: string;
  description?: string;
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
    <Card title="Tools Explorer">

      <button
        onClick={onListTools}
        disabled={!enabled || loading}
      >
        {loading
          ? "Loading tools..."
          : "Refresh Tools"}
      </button>


      <div className="tool-summary">

        <strong>
          {tools.length}
        </strong>

        {" "}
        Available Tools

      </div>


      <select
        disabled={tools.length === 0}
        value={selectedTool}
        onChange={(e)=>
          onSelectTool(e.target.value)
        }
      >

        <option value="">
          Select a tool
        </option>


        {tools.map((tool)=>(

          <option
            key={tool.name}
            value={tool.name}
          >
            {tool.name}
          </option>

        ))}

      </select>


      {tools.length > 0 && (

  <div className="tool-list">

    {tools.slice(0,10).map((tool)=>(

      <div
        key={tool.name}
        className={
          selectedTool === tool.name
            ? "tool-item selected"
            : "tool-item"
        }

        onClick={() =>
          onSelectTool(tool.name)
        }
      >

        🔧 {tool.name}

      </div>

    ))}


    {tools.length > 10 && (

      <div className="tool-more">

        + {tools.length - 10} more tools

      </div>

    )}

  </div>

)}

    </Card>
  );
}
