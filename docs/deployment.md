# Deployment

## Overview

The MCP server is a Node.js application. It has no database or external state. Deployment boils down to:
1. Build the TypeScript code
2. Set environment variables
3. Run `node dist/main.js`

## Build

```bash
npm ci
npm run build      # SWC → dist/
npm run typecheck  # tsc --noEmit (CI only)
```

Build output is in `dist/`. Entry point: `dist/main.js`.

## Local development

```bash
npm run dev        # tsx watch src/main.ts (hot reload)
```

Uses `tsx` to run TypeScript directly, no build step.

## stdio (local subprocess)

This is the default. The MCP client (Claude Desktop, Claude Code, Cursor) spawns the server as needed. No daemon required.

See [transports.md](./transports.md#client-setup) for client config examples.

## HTTP (server daemon)

### Docker

Create a `Dockerfile`:
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./
ENV NODE_ENV=production
ENV MCP_TRANSPORT=http
ENV MCP_HTTP_HOST=0.0.0.0
ENV MCP_HTTP_PORT=3001
EXPOSE 3001
CMD ["node", "dist/main.js"]
```

Build and run:
```bash
docker build -t boond-mcp-server .
docker run -p 3001:3001 \
  -e BOOND_API_URL=https://ui.boondmanager.com/api \
  -e BOOND_AUTH_MODE=jwt \
  -e BOOND_USER_TOKEN=... \
  -e BOOND_APP_TOKEN=... \
  -e BOOND_APP_KEY=... \
  -e MCP_HTTP_SECRET=$(openssl rand -hex 32) \
  boond-mcp-server
```

### systemd

Create `/etc/systemd/system/boond-mcp.service`:
```ini
[Unit]
Description=BoondManager MCP Server
After=network.target

[Service]
Type=simple
User=boond-mcp
WorkingDirectory=/opt/boond-mcp-server
ExecStart=/usr/bin/node /opt/boond-mcp-server/dist/main.js
Restart=on-failure
RestartSec=5
EnvironmentFile=/etc/boond-mcp/env

[Install]
WantedBy=multi-user.target
```

Create `/etc/boond-mcp/env` (mode `0600`, owned by `boond-mcp`):
```bash
BOOND_API_URL=https://ui.boondmanager.com/api
BOOND_AUTH_MODE=jwt
BOOND_USER_TOKEN=...
BOOND_APP_TOKEN=...
BOOND_APP_KEY=...
MCP_TRANSPORT=http
MCP_HTTP_HOST=127.0.0.1
MCP_HTTP_PORT=3001
MCP_HTTP_SECRET=...
```

Enable and start:
```bash
sudo systemctl daemon-reload
sudo systemctl enable --now boond-mcp
sudo systemctl status boond-mcp
```

### PM2

```bash
npm install -g pm2
pm2 start dist/main.js --name boond-mcp --env production
pm2 save
pm2 startup  # auto-restart on boot
```

Environment via `ecosystem.config.cjs`:
```javascript
module.exports = {
  apps: [{
    name: "boond-mcp",
    script: "./dist/main.js",
    env_production: {
      NODE_ENV: "production",
      MCP_TRANSPORT: "http",
      MCP_HTTP_HOST: "127.0.0.1",
      MCP_HTTP_PORT: "3001",
      BOOND_API_URL: "https://ui.boondmanager.com/api",
      BOOND_AUTH_MODE: "jwt",
      // secrets from process.env, not hardcoded:
      BOOND_USER_TOKEN: process.env.BOOND_USER_TOKEN,
      BOOND_APP_TOKEN: process.env.BOOND_APP_TOKEN,
      BOOND_APP_KEY: process.env.BOOND_APP_KEY,
      MCP_HTTP_SECRET: process.env.MCP_HTTP_SECRET,
    },
  }],
};
```

## Reverse proxy (nginx)

When exposing HTTP mode publicly, always put a reverse proxy in front:

```nginx
server {
    listen 443 ssl http2;
    server_name mcp.example.com;

    ssl_certificate /etc/letsencrypt/live/mcp.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/mcp.example.com/privkey.pem;

    location /mcp {
        proxy_pass http://127.0.0.1:3001/mcp;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # Streaming support (SSE)
        proxy_buffering off;
        proxy_read_timeout 300s;
    }
}
```

## Monitoring

The server logs to stderr in JSON format (default NestJS logger). Pipe to your log aggregator (Loki, CloudWatch, Datadog) as you would any Node.js process.

Healthcheck endpoint: none currently — planned. For now, use `curl -s http://localhost:3001/mcp -X POST -d '{}'` and check the HTTP status.

## Environment variables

See [.env.example](../.env.example) for the full list. Minimum required:

| Variable | Required | Description |
|----------|----------|-------------|
| `BOOND_API_URL` | Yes | Base URL of Boond API |
| `BOOND_AUTH_MODE` | Yes | `basic` or `jwt` |
| `BOOND_USER_TOKEN` | JWT only | Personal user token |
| `BOOND_APP_TOKEN` | JWT only | Application token |
| `BOOND_APP_KEY` | JWT only | App signing key |
| `MCP_TRANSPORT` | No | `stdio` (default) or `http` |
| `MCP_HTTP_SECRET` | HTTP prod | Bearer token for /mcp auth |

## Hardening checklist

- [ ] `MCP_HTTP_HOST=127.0.0.1` unless deliberately exposing
- [ ] `MCP_HTTP_SECRET` set to a 32+ character random value
- [ ] Environment file permissions: `0600`, owned by service user
- [ ] Run as non-root user (`User=boond-mcp` in systemd)
- [ ] Behind a reverse proxy with TLS if public
- [ ] Log aggregation configured
- [ ] Backup strategy for `.env` (not in git)
