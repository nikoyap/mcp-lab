import { Router } from "express";
import axios from "axios";

const router = Router();

router.post("/", async (req, res) => {
  const { url, token } = req.body;

  if (!url) {
    return res.status(400).json({
      success: false,
      message: "Server URL is required",
    });
  }

  const requestBody = {
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: {
      protocolVersion: "2025-06-18",
      capabilities: {},
      clientInfo: {
        name: "MCP Inspector",
        version: "1.0.0",
      },
    },
  };

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json, text/event-stream",
  };

  if (token && token.trim() !== "") {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await axios.post(url, requestBody, {
      headers,
      timeout: 15000,
      validateStatus: () => true,
    });

    return res.json({
      success: response.status >= 200 && response.status < 300,
      httpStatus: response.status,
      statusText: response.statusText,
      headers: response.headers,
      body: response.data,
    });
  } catch (error: any) {
    return res.json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
