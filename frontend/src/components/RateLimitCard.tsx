import Card from "./Card";


type Props = {
  limit?: string | null;
  remaining?: string | null;
  reset?: string | null;
};


export default function RateLimitCard({
  limit,
  remaining,
  reset
}: Props) {


  function formatReset(value?: string | null){

    if(!value){
      return "Not available";
    }


    const seconds =
      Number(value);


    if(isNaN(seconds)){
      return value;
    }


    if(seconds < 60){
      return `${seconds}s`;
    }


    const minutes =
      Math.floor(seconds / 60);


    const remainingSeconds =
      seconds % 60;


    return `${minutes}m ${remainingSeconds}s`;

  }



  return (

    <Card title="Rate Limit">


      <div>

        <strong>
          Limit
        </strong>

        <p>
          {limit ?? "Not available"}
        </p>

      </div>



      <div>

        <strong>
          Remaining
        </strong>

        <p>
          {remaining ?? "Not available"}
        </p>

      </div>



      <div>

        <strong>
          Reset Window
        </strong>

        <p>
          {formatReset(reset)}
        </p>

      </div>


    </Card>

  );

}
