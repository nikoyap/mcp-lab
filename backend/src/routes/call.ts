import { Router } from "express";
import axios from "axios";

import { getAccessToken } from "./oauth";

const router = Router();


function parseMcpResponse(raw: string) {

  try {

    const dataLine =
      raw
        .split("\n")
        .find(
          line =>
            line.startsWith("data:")
        );


    if (!dataLine) {

      return raw;

    }


    const json =

      JSON.parse(
        dataLine
          .replace(
            "data:",
            ""
          )
          .trim()
      );


    const text =
      json
        ?.result
        ?.content?.[0]
        ?.text;


    if (text) {

      try {

        return JSON.parse(text);

      } catch {

        return text;

      }

    }


    return json;


  } catch {

    return raw;

  }

}



router.post("/", async (req, res) => {

  const {
    url,
    name,
    arguments: args
  } = req.body;


  const token =
    getAccessToken();



  if (!token) {

    return res.status(401).json({

      success:false,

      error:
        "Not authenticated"

    });

  }



  try {

    const start =
      Date.now();


    const response =
      await axios.post(

        url,

        {
          jsonrpc:"2.0",

          id:3,

          method:"tools/call",

          params:{

            name,

            arguments:
              args || {}

          }

        },


        {

          headers:{

            Authorization:
              `Bearer ${token}`,

            "Content-Type":
              "application/json",

            Accept:
              "application/json, text/event-stream"

          },


          responseType:
            "text"

        }

      );



    const parsed =
      parseMcpResponse(
        response.data
      );



    console.log(
      "tools/call latency:",
      Date.now() - start,
      "ms"
    );



    res.json({

  success:true,

  headers: {

    limit:
      response.headers["ratelimit-limit"] || null,

    remaining:
      response.headers["ratelimit-remaining"] || null,

    reset:
      response.headers["ratelimit-reset"] || null

  },

  data:
    response.data

});



  } catch(err:any){


    console.error(

      "tools/call failed:",

      err.response?.data ||
      err.message

    );



    res.status(

      err.response?.status || 500

    )
    .json({

      success:false,

      error:
        err.response?.data ||
        err.message

    });


  }


});


export default router;
