# MCP Inspector

A developer diagnostic dashboard for testing, inspecting, and troubleshooting **Model Context Protocol (MCP)** server integrations.

MCP Inspector allows developers to connect to MCP servers, inspect available tools, execute MCP tool calls, and view raw protocol responses for debugging.

---

## Overview

When an MCP client (such as Claude, Cursor, or other AI assistants) reports that a tool is not working, debugging can be difficult because the failure could occur at multiple layers:

- Authentication
- MCP connection
- Tool discovery
- Request parameters
- Server response

MCP Inspector provides a visual interface to diagnose these issues.

Example troubleshooting workflow:
