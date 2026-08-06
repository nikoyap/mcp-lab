"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const oauth_1 = require("./oauth");
const mcpSession_1 = require("../services/mcpSession");
const router = (0, express_1.Router)();
router.post("/", async (req, res) => {
    const { url } = req.body;
    const token = (0, oauth_1.getAccessToken)();
    if (!token) {
        return res.status(401).json({
            success: false,
            error: "Not authenticated. Please login with ClickUp first."
        });
    }
    try {
        const response = await axios_1.default.post(url, {
            jsonrpc: "2.0",
            id: 1,
            method: "initialize",
            params: {
                protocolVersion: "2025-06-18",
                capabilities: {},
                clientInfo: {
                    name: "MCP Inspector",
                    version: "1.0.0"
                }
            }
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json, text/event-stream"
            },
            responseType: "text"
        });
        const session = response.headers["mcp-session-id"];
        if (session) {
            (0, mcpSession_1.setSessionId)(session);
        }
        let parsed = null;
        try {
            parsed =
                JSON.parse(response.data);
        }
        catch {
            parsed =
                response.data;
        }
        if (parsed?.result?.serverInfo) {
            (0, mcpSession_1.setServerInfo)(parsed.result.serverInfo);
        }
        res.json({
            success: true,
            sessionId: session || null,
            data: parsed
        });
    }
    catch (err) {
        console.error("Initialize failed:", err.response?.data ||
            err.message);
        res.status(err.response?.status || 500)
            .json({
            success: false,
            error: err.response?.data ||
                err.message
        });
    }
});
exports.default = router;
