import { Router } from "express";
import axios from "axios";

import { getAccessToken } from "./oauth";

import {
  getSessionId
} from "../services/mcpSession";


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


  // Handle MCP SSE response
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


    if (jsonLine) {

      raw =
        jsonLine.replace(
          "data:",
          ""
        ).trim();

    }

  }


  data =
    JSON.parse(raw);


} catch {

  data =
    response.data;

}


    res.json({

      success:true,

      sessionId,

      data

    });


  } catch(err:any){


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
