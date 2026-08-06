import { Router } from "express";
import axios from "axios";

import { getAccessToken } from "./oauth";
import { parseMcpResponse } from "../services/mcpResponse";


const router = Router();



router.post("/", async (req,res)=>{


  const {
    url,
    name,
    arguments: args
  } = req.body;



  const token =
    getAccessToken();



  if(!token){

    return res.status(401).json({

      success:false,

      error:"Not authenticated"

    });

  }




  try {


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

          responseType:"text"

        }

      );





    const formattedData =
      parseMcpResponse(
        response.data
      );





    res.json({

      success:true,


      headers:{

        limit:
          response.headers["ratelimit-limit"]
          || null,


        remaining:
          response.headers["ratelimit-remaining"]
          || null,


        reset:
          response.headers["ratelimit-reset"]
          || null

      },



      data:
        formattedData,



      raw:
        response.data


    });





  }
  catch(err:any){


    console.error(

      "tools/call failed:",

      err.response?.data ||
      err.message

    );



    res.status(

      err.response?.status ||
      500

    ).json({

      success:false,


      error:

        err.response?.data ||
        err.message


    });


  }


});



export default router;
