import Card from "./Card";

type Props = {
  response: string;
};

export default function ResponseCard({
  response,
}: Props) {
  return (
    <Card title="Response">

      <div className="response-container">

        <div className="response-header">

          <div>
            <h3>
              Raw MCP response
            </h3>
          </div>

          <div className="response-actions">

            <button className="active">
              Raw
            </button>

            <button>
              Pretty
            </button>

          </div>

        </div>


        <pre className="response-box">
          {response}
        </pre>


      </div>

    </Card>
  );
}
