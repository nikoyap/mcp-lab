"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const health_1 = __importDefault(require("./routes/health"));
const test_1 = __importDefault(require("./routes/test"));
const initialize_1 = __importDefault(require("./routes/initialize"));
const tools_1 = __importDefault(require("./routes/tools"));
const discovery_1 = __importDefault(require("./routes/discovery"));
const call_1 = __importDefault(require("./routes/call"));
const oauth_1 = __importDefault(require("./routes/oauth"));
const initialized_1 = __importDefault(require("./routes/initialized"));
const activity_1 = __importDefault(require("./routes/activity"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = process.env.PORT || 3001;
// Routes
app.use("/api/activity", activity_1.default);
app.use("/api/initialized", initialized_1.default);
app.use("/api/health", health_1.default);
app.use("/api/test", test_1.default);
app.use("/api/initialize", initialize_1.default);
app.use("/api/tools/list", tools_1.default);
app.use("/api/tools/call", call_1.default);
app.use("/api/discovery", discovery_1.default);
app.use("/api/oauth", oauth_1.default);
app.listen(PORT, () => {
    console.log("");
    console.log("========================================");
    console.log("🚀 MCP Inspector Backend");
    console.log("========================================");
    console.log(`Listening on http://localhost:${PORT}`);
    console.log("========================================");
});
