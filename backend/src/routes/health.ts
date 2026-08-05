import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    status: "online",
    service: "MCP Inspector Backend",
    version: "1.0.0",
  });
});

export default router;
