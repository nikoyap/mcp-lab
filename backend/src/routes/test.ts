import { Router } from "express";
import axios from "axios";

const router = Router();

router.post("/", async (req, res) => {
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

    return res.json({
      success: true,
      reachable: true,
      latency: Date.now() - started,
      httpStatus: response.status,
      statusText: response.statusText,
      headers: response.headers,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return res.json({
      success: false,
      reachable: false,
      latency: Date.now() - started,
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

export default router;
