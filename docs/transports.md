# Transports

The MCP server supports two transports: **stdio** (default) and **HTTP** (Streamable HTTP). Select with `MCP_TRANSPORT=stdio|http`.

## stdio transport

The default. Used by MCP clients that spawn the server as a subprocess (Claude Desktop, Claude Code, Cursor).

### How it works
- Client starts the server as a child process: `node dist/main.js`
- Communication happens over stdin/stdout using JSON-RPC
- Server exits when the parent closes stdin
- No network port, no authentication — parent process isolation is the security boundary

### Configuration
```bash
# Default — no config needed
npm start

# Or explicitly:
MCP_TRANSPORT=stdio npm start
```

### Client setup

**Claude Desktop** — edit `~/.claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "boond": {
      "command": "node",
      "args": ["/absolute/path/to/dist/main.js"],
      "env": {
        "BOOND_API_URL": "https://ui.boondmanager.com/api",
        "BOOND_AUTH_MODE": "jwt",
        "BOOND_USER_TOKEN": "...",
        "BOOND_APP_TOKEN": "...",
        "BOOND_APP_KEY": "..."
      }
    }
  }
}
```

**Claude Code**:
```bash
claude mcp add boond -- node /absolute/path/to/dist/main.js
```

**Cursor** — add to `.cursor/mcp.json`:
```json
{
  "mcpServers": {
    "boond": {
      "command": "node",
      "args": ["/absolute/path/to/dist/main.js"]
    }
  }
}
```

## HTTP transport (Streamable HTTP)

For remote clients (n8n, custom integrations, multi-user deployments).

### How it works
- Server starts an Express app listening on `MCP_HTTP_PORT` (default 3001)
- Binds to `MCP_HTTP_HOST` (default `127.0.0.1` — localhost only!)
- Handles MCP protocol at `POST /mcp`
- Optional bearer token auth via `MCP_HTTP_SECRET`

### Configuration
```bash
# Local development (no auth)
MCP_TRANSPORT=http npm start
# → MCP server listening on http://127.0.0.1:3001/mcp
# ⚠️ Warning logged: MCP_HTTP_SECRET not set

# Production (public bind + auth)
MCP_TRANSPORT=http \
MCP_HTTP_HOST=0.0.0.0 \
MCP_HTTP_PORT=3001 \
MCP_HTTP_SECRET=$(openssl rand -hex 32) \
npm start
```

### Client setup

**n8n** — use the MCP Client node:
- URL: `http://your-server:3001/mcp`
- Header: `Authorization: Bearer <MCP_HTTP_SECRET>`

**curl** smoke test:
```bash
curl -X POST http://localhost:3001/mcp \
  -H "Authorization: Bearer <MCP_HTTP_SECRET>" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

### Security model

HTTP mode has no built-in auth **by default**. The endpoint is wide open unless you set `MCP_HTTP_SECRET`. Options:

**Option 1 — Bearer token (built-in)**
```bash
MCP_HTTP_SECRET=$(openssl rand -hex 32)
```
Clients must send `Authorization: Bearer <secret>`.

**Option 2 — Behind a reverse proxy**
Run the server on localhost only (`MCP_HTTP_HOST=127.0.0.1`) and put nginx/Caddy in front with its own auth.

**Option 3 — Network-level**
Run behind a VPN or in a private VPC. Bind to `0.0.0.0` only inside the trusted network.

**Never expose the endpoint publicly without at least Option 1.**

## Choosing a transport

| Scenario | Transport |
|----------|-----------|
| Claude Desktop / Claude Code on developer laptop | stdio |
| Cursor integration | stdio |
| n8n workflow automation | HTTP |
| Multi-user team deployment | HTTP + reverse proxy |
| CI / scripts calling tools programmatically | HTTP |
| Kubernetes deployment | HTTP |

## Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `MCP_TRANSPORT` | `stdio` | `stdio` or `http` |
| `MCP_HTTP_PORT` | `3001` | HTTP port (http mode only) |
| `MCP_HTTP_HOST` | `127.0.0.1` | Bind address (http mode only) |
| `MCP_HTTP_SECRET` | unset | Bearer token for /mcp auth |

## Implementation

- Transport selection: `src/main.ts`
- AppModule factory: `src/app.module.ts` (`AppModule.forTransport(mode)`)
- Based on `@rekog/mcp-nest` `McpTransportType`
