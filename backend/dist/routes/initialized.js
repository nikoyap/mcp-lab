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
    const sessionId = (0, mcpSession_1.getSessionId)();
    if (!token) {
        return res.status(401).json({
            success: false,
            error: "Not authenticated"
        });
    }
    try {
        await axios_1.default.post(url, {
            jsonrpc: "2.0",
            method: "notifications/initialized"
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json, text/event-stream",
                ...(sessionId && {
                    "mcp-session-id": sessionId
                })
            }
        });
        (0, mcpSession_1.setInitialized)(true);
        res.json({
            success: true,
            initialized: true,
            sessionId
        });
    }
    catch (err) {
        console.error("Initialized notification failed:", err.response?.data ||
            err.message);
        res.status(err.response?.status || 500).json({
            success: false,
            error: err.response?.data ||
                err.message
        });
    }
});
exports.default = router;
