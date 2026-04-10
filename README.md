# BoondManager MCP Server

> A **Model Context Protocol** server wrapping the [BoondManager](https://www.boondmanager.com/) REST API, exposing 13 tools for collaborators, projects, candidates, companies, opportunities, absences, and actions.

Use it from **Claude Desktop**, **Claude Code**, **Cursor**, **n8n**, or any MCP client to query your BoondManager data in natural language.

## Features

- **13 MCP tools** covering the main BoondManager modules
- **2 transports**: stdio (local subprocess) and HTTP (remote clients, n8n)
- **Auto-pagination** via `fetchAll` parameter with safety cap
- **Generated types** from the official Boond JSON schemas
- **Basic Auth** and **JWT** (normal + god mode) supported
- **LLM-friendly error handling** with structured responses
- **MCP Prompts** for common workflows
- **MCP Resources** for quick data snapshots

## Quick start

### Install

```bash
npm install
npm run build
```

### Configure

```bash
cp .env.example .env
# Fill in BOOND_API_URL and credentials
```

Minimum required env vars:
```bash
BOOND_API_URL=https://ui.boondmanager.com/api
BOOND_AUTH_MODE=jwt
BOOND_USER_TOKEN=...
BOOND_APP_TOKEN=...
BOOND_APP_KEY=...
```

### Run

```bash
# stdio mode (default — for Claude Desktop, Claude Code, Cursor)
npm start

# HTTP mode (for n8n, remote clients)
MCP_TRANSPORT=http MCP_HTTP_SECRET=your-secret npm start
```

## Client configuration

### Claude Desktop

Edit `~/.claude_desktop_config.json`:
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

### Claude Code

```bash
claude mcp add boond -- node /absolute/path/to/dist/main.js
```

### n8n (HTTP transport)

Start the server in HTTP mode, then point n8n's MCP node to:
```
http://localhost:3001/mcp
```
With header: `Authorization: Bearer <MCP_HTTP_SECRET>`

## Available tools

| Tool | Module | Description |
|------|--------|-------------|
| `list_resources` | Resources | List collaborators (paginated, keywords filter, fetchAll) |
| `get_resource` | Resources | Get a collaborator by ID with optional tab |
| `list_projects` | Projects | List projects/missions |
| `get_project` | Projects | Get a project by ID |
| `search_candidates` | Candidates | Search candidates by keywords |
| `get_candidate` | Candidates | Get a candidate by ID |
| `list_companies` | Companies | List companies |
| `get_company` | Companies | Get a company by ID |
| `list_opportunities` | Opportunities | List commercial opportunities |
| `get_opportunity` | Opportunities | Get an opportunity by ID |
| `list_absences` | Absences | List absences/leaves |
| `list_actions` | Actions | List commercial actions |
| `get_action` | Actions | Get an action by ID |

All list tools support `fetchAll: true` to fetch all pages up to a safety cap (default 500, configurable via `BOOND_MAX_RESULTS`).

## Authentication

Three modes supported:

### Basic Auth (simplest)
Enable in Boond: *Avatar > Configuration > "Allow API Rest calls using BasicAuth authentication"*

```bash
BOOND_AUTH_MODE=basic
BOOND_USERNAME=your.email@company.fr
BOOND_PASSWORD=your-password
```

### JWT Normal (recommended)
```bash
BOOND_AUTH_MODE=jwt
BOOND_JWT_MODE=normal
BOOND_USER_TOKEN=...     # Mon compte > Configuration > Sécurité
BOOND_APP_TOKEN=...      # From Boond OAuth signed request
BOOND_APP_KEY=...        # Admin > Espace développeur > API / Sandbox
```

### JWT God Mode (admin / elevated)
Additional vars:
```bash
BOOND_JWT_MODE=god
BOOND_CLIENT_TOKEN=...
BOOND_GOD_CLIENT_TOKEN=...
```

## Scripts

```bash
npm run build            # TypeScript build
npm run dev              # Dev mode with tsx watch
npm run start            # Start built server
npm run check            # Biome lint + format check
npm run check:fix        # Auto-fix
npm run validate-routes  # Test all Boond API endpoints
npm run generate-types   # Regenerate TS types from Boond schemas
```

## Development

```bash
# Lint check
npx biome check .

# Type check
npx tsc --noEmit

# Test MCP server with the official Inspector
npx @modelcontextprotocol/inspector node dist/main.js
```

Pre-commit hook (husky + lint-staged) runs Biome automatically on staged `.ts` files.

## Architecture

```
src/
├── main.ts                     # Entry point (stdio/http transport)
├── app.module.ts               # NestJS root module
├── generated/                  # Auto-generated types from Boond schemas
├── modules/
│   ├── boond/                  # HTTP client + JWT auth (injectable)
│   ├── resources/              # list_resources, get_resource
│   ├── projects/               # list_projects, get_project
│   ├── candidates/             # search_candidates, get_candidate
│   ├── companies/              # list_companies, get_company
│   ├── opportunities/          # list_opportunities, get_opportunity
│   ├── absences/               # list_absences
│   ├── actions/                # list_actions, get_action
│   └── mcp-extras/             # MCP Prompts and Resources
└── utils/
    ├── constants.ts            # Shared constants
    ├── error-handler.ts        # LLM-friendly error mapping
    ├── formatters.ts           # JSON:API → concise output
    ├── list-tool-helper.ts     # Shared list tool logic
    └── pagination.ts           # fetchAll implementation
```

Built with:
- [NestJS](https://nestjs.com/) — dependency injection, modular architecture
- [@rekog/mcp-nest](https://github.com/rekog-labs/MCP-Nest) — NestJS integration for MCP
- [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/typescript-sdk) — MCP protocol implementation
- [Zod](https://zod.dev/) — schema validation
- [Biome](https://biomejs.dev/) — linting and formatting

## Documentation

Detailed docs in [`docs/`](./docs/):

- [architecture.md](./docs/architecture.md) — System design, module pattern, tech stack
- [authentication.md](./docs/authentication.md) — Basic Auth + JWT (normal/god) setup
- [transports.md](./docs/transports.md) — stdio vs HTTP configuration and security
- [tools.md](./docs/tools.md) — Complete reference of all 45 MCP tools
- [deployment.md](./docs/deployment.md) — Docker, systemd, PM2, nginx
- [troubleshooting.md](./docs/troubleshooting.md) — Common errors and fixes

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development workflow, code style, and how to add new modules or tools.

## License

MIT © 2026 Ninhache
