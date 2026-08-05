import Card from "./Card";


type Props = {
  response: string;
};


export default function ResponseCard({
  response
}: Props) {


  let data:any = null;


  try {

    const parsed =
      JSON.parse(response);


    // unwrap backend response
    data =
      parsed.data || parsed;


  } catch {

    data = response;

  }



  function downloadLog(){

    const log =
`MCP Inspector Response Log
==========================

Generated:
${new Date().toISOString()}


Response:

${JSON.stringify(
  data,
  null,
  2
)}
`;


    const blob =
      new Blob(
        [log],
        {
          type:"text/plain"
        }
      );


    const url =
      URL.createObjectURL(blob);


    const link =
      document.createElement("a");


    link.href =
      url;


    link.download =
      `mcp-response-${Date.now()}.log`;


    link.click();


    URL.revokeObjectURL(url);

  }



  function renderResults(){

    if(
      !data?.results ||
      !Array.isArray(data.results)
    ){

      return null;

    }


    return (

      <div className="results-list">

        {
          data.results.map(
            (item:any,index:number)=>(

              <div
                className="result-item"
                key={index}
              >

                <h4>
                  {item.name}
                </h4>


                {
                  item.status && (

                    <p>
                      <strong>Status:</strong>{" "}
                      {item.status}
                    </p>

                  )
                }



                {
                  item.hierarchy?.project && (

                    <p>
                      <strong>Space:</strong>{" "}
                      {
                        item.hierarchy.project.name
                      }
                    </p>

                  )
                }



                {
                  item.hierarchy?.subcategory && (

                    <p>
                      <strong>List:</strong>{" "}
                      {
                        item.hierarchy.subcategory.name
                      }
                    </p>

                  )
                }



                {
                  item.custom_id && (

                    <p>
                      <strong>ID:</strong>{" "}
                      {item.custom_id}
                    </p>

                  )
                }



                {
                  item.url && (

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open Task
                    </a>

                  )
                }


              </div>

            )
          )
        }

      </div>

    );

  }



  return (

    <Card title="Response">


      <button
        onClick={downloadLog}
      >
        Download Log
      </button>



      {
        data?.overview && (

          <div className="response-summary">

            <h3>
              ✅ Completed
            </h3>


            <p>
              {data.overview}
            </p>

          </div>

        )
      }



      {
        renderResults()
      }



      {
        !data?.results && (

          <pre className="response-output">

            {
              JSON.stringify(
                data,
                null,
                2
              )
            }

          </pre>

        )
      }



    </Card>

  );

}
