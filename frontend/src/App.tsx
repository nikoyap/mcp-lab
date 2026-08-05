import { useState } from "react";

import "./App.css";

import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";

import ConnectionCard from "./components/ConnectionCard";
import SessionCard from "./components/SessionCard";
import ToolsCard from "./components/ToolsCard";
import ResponseCard from "./components/ResponseCard";
import ToolRunner from "./components/ToolRunner";
import RateLimitCard from "./components/RateLimitCard";


type Tool = {
  name: string;
  description?: string;
  inputSchema?: any;
};



export default function App() {


  const [url,setUrl] =
    useState(
      "https://mcp.clickup.com/mcp"
    );


  const [response,setResponse] =
    useState(
      "Waiting for requests..."
    );


  const [loading,setLoading] =
    useState(false);

  const [initializing,setInitializing] =
    useState(false);

  const [listingTools,setListingTools] =
    useState(false);

  const [executing,setExecuting] =
    useState(false);



  const [connected,setConnected] =
    useState(false);



  const [tools,setTools] =
    useState<Tool[]>([]);



  const [selectedTool,setSelectedTool] =
    useState("");



  const selectedToolData =
    tools.find(
      tool =>
        tool.name === selectedTool
    );



  const [argumentsText,setArgumentsText] =
    useState("{}");



  const [rateLimit,setRateLimit] =
    useState({

      limit:null as string | null,

      remaining:null as string | null,

      reset:null as string | null

    });





  function updateRateLimit(json:any){

    if(json?.headers){

      setRateLimit({

        limit:
          json.headers.limit || null,

        remaining:
          json.headers.remaining || null,

        reset:
          json.headers.reset || null

      });

    }

  }






  async function connect(){

    setLoading(true);


    try{

      const res =
        await fetch(
          "/api/test",
          {
            method:"POST",
            headers:{
              "Content-Type":
                "application/json"
            },
            body:JSON.stringify({
              url
            })
          }
        );


      const json =
        await res.json();


      setConnected(
        json.success
      );


      updateRateLimit(json);


      setResponse(
        JSON.stringify(
          json,
          null,
          2
        )
      );


    }catch(err:any){

      setResponse(
        err.message
      );

    }


    setLoading(false);

  }







  async function initialize(){

    setInitializing(true);


    try{

      const res =
        await fetch(
          "/api/initialize",
          {
            method:"POST",
            headers:{
              "Content-Type":
                "application/json"
            },
            body:JSON.stringify({
              url
            })
          }
        );


      const json =
        await res.json();


      setConnected(
        json.success
      );


      updateRateLimit(json);


      setResponse(
        JSON.stringify(
          json,
          null,
          2
        )
      );


    }catch(err:any){

      setResponse(
        err.message
      );

    }


    setInitializing(false);

  }








  async function listTools(){

    setListingTools(true);


    try{


      const res =
        await fetch(
          "/api/tools/list",
          {
            method:"POST",
            headers:{
              "Content-Type":
                "application/json"
            },
            body:JSON.stringify({
              url
            })
          }
        );



      const json =
        await res.json();



      console.log(
        "FULL TOOL RESPONSE:",
        json
      );



      updateRateLimit(json);



      let discoveredTools:any[] = [];



      if(
        typeof json.data === "string"
      ){


        const line =
          json.data
            .split("\n")
            .find(
              (item:string)=>
                item.startsWith("data:")
            );



        if(line){


          const parsed =
            JSON.parse(
              line
                .replace(
                  "data:",
                  ""
                )
                .trim()
            );


          discoveredTools =
            parsed?.result?.tools || [];

        }


      }
      else {


        discoveredTools =
          json?.data?.result?.tools ||
          json?.data?.tools ||
          [];

      }



      console.log(
        "DISCOVERED TOOLS:",
        discoveredTools
      );



      setTools(

        discoveredTools.map(
          (tool:any)=>({

            name:
              tool.name,

            description:
              tool.description,

            inputSchema:
              tool.inputSchema

          })
        )

      );



      setResponse(
        JSON.stringify(
          json,
          null,
          2
        )
      );



    }catch(err:any){

      setResponse(
        err.message
      );

    }


    setListingTools(false);

  }








  async function executeTool(){


    setExecuting(true);



    let parsed:any = {};



    try{

      parsed =
        JSON.parse(
          argumentsText
        );

    }catch{

      setResponse(
        "Invalid JSON arguments"
      );

      setExecuting(false);

      return;

    }




    try{


      const res =
        await fetch(
          "/api/tools/call",
          {
            method:"POST",
            headers:{
              "Content-Type":
                "application/json"
            },
            body:JSON.stringify({

              url,

              name:selectedTool,

              arguments:parsed

            })
          }
        );



      const json =
        await res.json();



      updateRateLimit(json);



      setResponse(
        JSON.stringify(
          json,
          null,
          2
        )
      );



    }catch(err:any){

      setResponse(
        err.message
      );

    }


    setExecuting(false);

  }







  return (

    <div className="app-layout">


      <Sidebar />


      <main className="main">


        <Hero />



        <div className="dashboard-grid">


          <ConnectionCard

            url={url}

            token=""

            loading={loading}

            onUrlChange={setUrl}

            onTokenChange={()=>{}}

            onConnect={connect}

          />



          <SessionCard

            connected={connected}

            loading={initializing}

            onInitialize={initialize}

          />



          <ToolsCard

            enabled={connected}

            loading={listingTools}

            tools={tools}

            selectedTool={selectedTool}

            onSelectTool={
              setSelectedTool
            }

            onListTools={
              listTools
            }

          />


        </div>





        <div className="bottom-grid">


          <ToolRunner

            tool={
              selectedToolData
            }

            argumentsText={
              argumentsText
            }

            onArgumentsChange={
              setArgumentsText
            }

            loading={
              executing
            }

            onExecute={
              executeTool
            }

          />



          <ResponseCard

            response={
              response
            }

          />



          <RateLimitCard

            limit={
              rateLimit.limit
            }

            remaining={
              rateLimit.remaining
            }

            reset={
              rateLimit.reset
            }

          />


        </div>



      </main>


    </div>

  );

}
