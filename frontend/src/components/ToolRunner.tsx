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



  const properties =
    tool.inputSchema?.properties || {};



  let currentArgs:any = {};

  try {

    currentArgs =
      JSON.parse(argumentsText);

  } catch {

    currentArgs = {};

  }



  function updateField(
    key:string,
    value:any
  ){

    const updated = {

      ...currentArgs,

      [key]:value

    };


    onArgumentsChange(

      JSON.stringify(
        updated,
        null,
        2
      )

    );

  }



  return (

    <Card title="Tool Runner">


      <h3>
        {tool.name}
      </h3>


   <p className="tool-description">

  {
    tool.description ||
    "No description"
  }

</p>



      <hr />



      {
        Object.entries(properties)
        .map(
          ([key,field])=>(


          <div
            key={key}
            style={{
              marginBottom:"12px"
            }}
          >


            <label>

              {key}

            </label>


            {

              field.enum ? (

                <select

                  value={
                    currentArgs[key] || ""
                  }

                  onChange={
                    e =>
                    updateField(
                      key,
                      e.target.value
                    )
                  }

                >

                  <option value="">
                    Select
                  </option>


                  {
                    field.enum.map(
                      option=>(

                      <option
                        key={option}
                        value={option}
                      >

                        {option}

                      </option>

                    ))
                  }


                </select>


              ) : (


                <input

                  type={
                    field.type === "number"
                    ? "number"
                    : "text"
                  }


                  value={
                    currentArgs[key] || ""
                  }


                  onChange={
                    e =>
                    updateField(
                      key,
                      field.type === "number"
                      ? Number(e.target.value)
                      : e.target.value
                    )
                  }


                />


              )

            }


            <small>

              {field.description}

            </small>


          </div>


        ))

      }



      <details>

        <summary>
          Raw JSON
        </summary>


        <textarea

          rows={10}

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


      </details>



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
