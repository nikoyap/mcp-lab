import { Router } from "express";
import axios from "axios";

import { getAccessToken } from "./oauth";

import {
  getSessionId
} from "../services/mcpSession";

import {
  addActivity
} from "../services/activity";


const router = Router();


router.post("/", async (req, res) => {

  const { url } = req.body;


  const token =
    getAccessToken();


  const sessionId =
    getSessionId();


  if (!token) {

    return res.status(401).json({
      success: false,
      error: "Not authenticated"
    });

  }


  try {

    const start =
      Date.now();


    const response =
      await axios.post(

        url,

        {
          jsonrpc: "2.0",

          id: 2,

          method: "tools/list",

          params: {}

        },

        {

          headers: {

            Authorization:
              `Bearer ${token}`,

            "Content-Type":
              "application/json",

            Accept:
              "application/json, text/event-stream",

            ...(sessionId && {
              "mcp-session-id":
                sessionId
            })

          },

          responseType:
            "text"

        }

      );


    let data:any;


    try {

      let raw =
        response.data;


      // Parse MCP SSE response
      if (
        typeof raw === "string" &&
        raw.includes("data:")
      ) {

        const jsonLine =
          raw
            .split("\n")
            .find(
              (line:string) =>
                line.startsWith("data:")
            );


        if(jsonLine){

          raw =
            jsonLine
              .replace(
                "data:",
                ""
              )
              .trim();

        }

      }


      data =
        JSON.parse(raw);


    } catch {

      data =
        response.data;

    }


    // Record activity
    addActivity({

      method:
        "tools/list",

      status:
        response.status,

      latency:
        Date.now() - start,

      timestamp:
        new Date().toISOString()

    });


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


    addActivity({

      method:
        "tools/list",

      status:
        err.response?.status || 500,

      latency:
        0,

      timestamp:
        new Date().toISOString(),

      error:
        err.message

    });


    console.error(
      "tools/list failed:",
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
