"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const router = (0, express_1.Router)();
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
        const response = await axios_1.default.get(url, {
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
    }
    catch (error) {
        return res.json({
            success: false,
            reachable: false,
            latency: Date.now() - started,
            error: error.message,
            timestamp: new Date().toISOString(),
        });
    }
});
exports.default = router;
//# sourceMappingURL=test.js.map