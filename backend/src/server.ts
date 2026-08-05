import express from "express";
import cors from "cors";

import healthRoute from "./routes/health";
import testRoute from "./routes/test";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;

app.use("/api/health", healthRoute);
app.use("/api/test", testRoute);

app.listen(PORT, () => {
  console.log("");
  console.log("================================");
  console.log("MCP Inspector Backend");
  console.log("================================");
  console.log(`Listening on http://localhost:${PORT}`);
  console.log("");
});
