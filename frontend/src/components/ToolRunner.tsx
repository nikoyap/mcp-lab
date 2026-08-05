import Card from "./Card";


type Tool = {
  name: string;
  description?: string;

  inputSchema?: {
    properties?: Record<
      string,
      {
        type?: string;
        description?: string;
        enum?: string[];
      }
    >;

    required?: string[];
  };
};


type Props = {
  tool?: Tool;

  argumentsText: string;

  onArgumentsChange:
    (value:string)=>void;

  loading:boolean;

  onExecute:()=>void;
};


export default function ToolRunner({

  tool,

  argumentsText,

  onArgumentsChange,

  loading,

  onExecute

}:Props){


  if(!tool){

    return (

      <Card title="Tool Runner">

        <p>
          Select a tool to execute
        </p>

      </Card>

    );

  }


  return (

    <Card title="Tool Runner">


      <h3>
        {tool.name}
      </h3>


      <p>

        {tool.description ||
          "No description available"}

      </p>


      <label>
        Arguments JSON
      </label>


      <textarea

        rows={12}

        value={
          argumentsText
        }

        onChange={
          e =>
          onArgumentsChange(
            e.target.value
          )
        }

      />


      <button

        disabled={loading}

        onClick={
          onExecute
        }

      >

        {
          loading
          ? "Executing..."
          : "Execute Tool"
        }

      </button>


    </Card>

  );

}
