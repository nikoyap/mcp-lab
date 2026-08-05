import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    // Step 1 - Protected Resource Metadata
    const prm = await axios.get(
      "https://mcp.clickup.com/.well-known/oauth-protected-resource/mcp"
    );

    const authorizationServers =
      prm.data.authorization_servers ?? [];

    let authMetadata = null;

    // Step 2 - Authorization Server Metadata
    if (authorizationServers.length > 0) {
      const issuer = authorizationServers[0].replace(/\/$/, "");

      const auth = await axios.get(
        `${issuer}/.well-known/oauth-authorization-server`
      );

      authMetadata = auth.data;
    }

    res.json({
      success: true,
      protectedResource: prm.data,
      authorizationServer: authMetadata,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      response: error.response?.data,
    });
  }
});

export default router;
