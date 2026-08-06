"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMcpResponse = parseMcpResponse;
function parseMcpResponse(raw) {
    try {
        const line = raw
            .split("\n")
            .find(item => item.startsWith("data:"));
        if (!line) {
            return raw;
        }
        const parsed = JSON.parse(line
            .replace("data:", "")
            .trim());
        const content = parsed
            ?.result
            ?.content;
        if (!content) {
            return parsed;
        }
        const text = content
            .map((item) => item.text)
            .filter(Boolean)
            .join("\n");
        if (!text) {
            return parsed;
        }
        try {
            return JSON.parse(text);
        }
        catch {
            return {
                message: text
            };
        }
    }
    catch {
        return raw;
    }
}
