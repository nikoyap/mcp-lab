import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get("/api/health", (_req, res) => {
  res.json({
    status: "online",
    service: "MCP Inspector Backend",
    version: "1.0.0",
  });
});

app.post("/api/test", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      success: false,
      message: "Server URL is required",
    });
  }

  const started = Date.now();

  try {
    const response = await axios.get(url, {
      timeout: 10000,
      validateStatus: () => true,
    });

    res.json({
      success: true,
      reachable: true,
      latency: Date.now() - started,
      httpStatus: response.status,
      statusText: response.statusText,
      headers: response.headers,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    res.json({
      success: false,
      reachable: false,
      latency: Date.now() - started,
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

app.listen(PORT, () => {
  console.log("");
  console.log("================================");
  console.log("MCP Inspector Backend");
  console.log("================================");
  console.log(`Listening on http://localhost:${PORT}`);
  console.log("");
});
