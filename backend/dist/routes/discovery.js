"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const router = (0, express_1.Router)();
router.get("/", async (_req, res) => {
    try {
        // Step 1 - Protected Resource Metadata
        const prm = await axios_1.default.get("https://mcp.clickup.com/.well-known/oauth-protected-resource/mcp");
        const authorizationServers = prm.data.authorization_servers ?? [];
        let authMetadata = null;
        // Step 2 - Authorization Server Metadata
        if (authorizationServers.length > 0) {
            const issuer = authorizationServers[0].replace(/\/$/, "");
            const auth = await axios_1.default.get(`${issuer}/.well-known/oauth-authorization-server`);
            authMetadata = auth.data;
        }
        res.json({
            success: true,
            protectedResource: prm.data,
            authorizationServer: authMetadata,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            response: error.response?.data,
        });
    }
});
exports.default = router;
