import { Router } from "express";
import axios from "axios";

import { getAccessToken } from "./oauth";

import {
  getSessionId,
  setInitialized
} from "../services/mcpSession";


const router = Router();


router.post("/", async (req, res) => {

  const { url } = req.body;

  const token = getAccessToken();

  const sessionId = getSessionId();


  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Not authenticated"
    });
  }


  try {

    await axios.post(

      url,

      {
        jsonrpc: "2.0",
        method: "notifications/initialized"
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

        }
      }

    );


    setInitialized(true);


    res.json({

      success: true,

      initialized: true,

      sessionId

    });


  } catch (err: any) {

    console.error(
      "Initialized notification failed:",
      err.response?.data ||
      err.message
    );


    res.status(
      err.response?.status || 500
    ).json({

      success: false,

      error:
        err.response?.data ||
        err.message

    });

  }

});


export default router;
