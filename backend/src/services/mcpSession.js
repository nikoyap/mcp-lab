"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSessionId = setSessionId;
exports.getSessionId = getSessionId;
exports.setInitialized = setInitialized;
exports.isInitialized = isInitialized;
exports.setServerInfo = setServerInfo;
exports.getServerInfo = getServerInfo;
let sessionId = null;
let initialized = false;
let serverInfo = null;
function setSessionId(id) {
    sessionId = id;
}
function getSessionId() {
    return sessionId;
}
function setInitialized(value) {
    initialized = value;
}
function isInitialized() {
    return initialized;
}
function setServerInfo(info) {
    serverInfo = info;
}
function getServerInfo() {
    return serverInfo;
}
//# sourceMappingURL=mcpSession.js.map