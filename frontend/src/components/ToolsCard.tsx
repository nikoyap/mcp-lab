import {
  useState
} from "react";

import Card from "./Card";


type Tool = {
  name:string;
};


type Props = {

  enabled:boolean;

  loading:boolean;

  tools:Tool[];

  selectedTool:string;

  onSelectTool:
    (value:string)=>void;

  onListTools:
    ()=>void;

};



export default function ToolsCard({

  enabled,

  loading,

  tools,

  selectedTool,

  onSelectTool,

  onListTools

}:Props){


  const [
    search,
    setSearch
  ] = useState("");



  const filteredTools =
    tools.filter(
      tool =>
        tool.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );



  return (

    <Card title="Tools">


      <button

        onClick={
          onListTools
        }

        disabled={
          !enabled ||
          loading
        }

      >

        {
          loading
          ? "Loading..."
          : "List Tools"
        }

      </button>



      <label>

        Search Tools

      </label>


      <input

        type="text"

        placeholder="Search by keyword..."

        value={
          search
        }

        onChange={
          e =>
          setSearch(
            e.target.value
          )
        }

      />



      <label>

        Available Tools (
        {
          filteredTools.length
        }
        )

      </label>



      <select

        disabled={
          filteredTools.length === 0
        }

        value={
          selectedTool
        }

        onChange={
          e =>
          onSelectTool(
            e.target.value
          )
        }

      >

        <option value="">

          Select a tool

        </option>


        {
          filteredTools.map(
            tool => (

              <option

                key={
                  tool.name
                }

                value={
                  tool.name
                }

              >

                {
                  tool.name
                }

              </option>

            )
          )
        }


      </select>


    </Card>

  );

}
