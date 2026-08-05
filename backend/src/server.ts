import express from "express";
import cors from "cors";

import healthRoute from "./routes/health";
import testRoute from "./routes/test";
import initializeRoute from "./routes/initialize";
import toolsRoute from "./routes/tools";
import discoveryRoute from "./routes/discovery";
import callRoute from "./routes/call";
import oauthRoute from "./routes/oauth";
import initializedRoute from "./routes/initialized";

const app = express();

app.use(cors());

app.use(express.json());


const PORT =
  process.env.PORT || 3001;


// Routes
app.use(
 "/api/initialized",
 initializedRoute
);

app.use(
  "/api/health",
  healthRoute
);

app.use(
  "/api/test",
  testRoute
);

app.use(
  "/api/initialize",
  initializeRoute
);

app.use(
  "/api/tools/list",
  toolsRoute
);

app.use(
  "/api/tools/call",
  callRoute
);

app.use(
  "/api/discovery",
  discoveryRoute
);

app.use(
  "/api/oauth",
  oauthRoute
);



app.listen(
  PORT,
  ()=>{
    console.log("");
    console.log(
      "========================================"
    );
    console.log(
      "🚀 MCP Inspector Backend"
    );
    console.log(
      "========================================"
    );
    console.log(
      `Listening on http://localhost:${PORT}`
    );
    console.log(
      "========================================"
    );
  }
);
