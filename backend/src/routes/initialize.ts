import { Router } from "express";
import axios from "axios";

import { getAccessToken } from "./oauth";

import {
  setSessionId,
  setServerInfo
} from "../services/mcpSession";


const router = Router();


router.post("/", async (req, res) => {

  const { url } = req.body;


  const token =
    getAccessToken();


  if (!token) {

    return res.status(401).json({
      success:false,
      error:
        "Not authenticated. Please login with ClickUp first."
    });

  }


  try {

    const response =
      await axios.post(

        url,

        {
          jsonrpc:"2.0",

          id:1,

          method:"initialize",

          params:{

            protocolVersion:
              "2025-06-18",

            capabilities:{},

            clientInfo:{

              name:
                "MCP Inspector",

              version:
                "1.0.0"

            }

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


    const session =
      response.headers[
        "mcp-session-id"
      ];


    if(session){

      setSessionId(session);

    }


    let parsed:any = null;


    try {

      parsed =
        JSON.parse(
          response.data
        );

    } catch {

      parsed =
        response.data;

    }


    if(
      parsed?.result?.serverInfo
    ){

      setServerInfo(
        parsed.result.serverInfo
      );

    }


    res.json({

      success:true,

      sessionId:
        session || null,

      data:
        parsed

    });


  } catch(err:any){


    console.error(
      "Initialize failed:",
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
