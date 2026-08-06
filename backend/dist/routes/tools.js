"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const oauth_1 = require("./oauth");
const mcpResponse_1 = require("../services/mcpResponse");
const router = (0, express_1.Router)();
router.post("/", async (req, res) => {
    const { url } = req.body;
    const token = (0, oauth_1.getAccessToken)();
    if (!token) {
        return res.status(401).json({
            success: false,
            error: "Not authenticated"
        });
    }
    try {
        const response = await axios_1.default.post(url, {
            jsonrpc: "2.0",
            id: 2,
            method: "tools/list",
            params: {}
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json, text/event-stream"
            },
            responseType: "text"
        });
        const formattedData = (0, mcpResponse_1.parseMcpResponse)(response.data);
        res.json({
            success: true,
            headers: {
                limit: response.headers["ratelimit-limit"]
                    || null,
                remaining: response.headers["ratelimit-remaining"]
                    || null,
                reset: response.headers["ratelimit-reset"]
                    || null
            },
            data: formattedData,
            raw: response.data
        });
    }
    catch (err) {
        console.error("tools/list failed:", err.response?.data ||
            err.message);
        res.status(err.response?.status ||
            500).json({
            success: false,
            error: err.response?.data ||
                err.message
        });
    }
});
exports.default = router;
