# Architecture

## Overview

BoondManager MCP Server is a **NestJS application** that exposes BoondManager's REST API as **Model Context Protocol (MCP)** tools. It runs either as a local subprocess (stdio) or as an HTTP server (for remote clients like n8n).

## Tech stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Language | TypeScript (ESM) | Strong typing for API contracts |
| Framework | NestJS 11 | Modular architecture, DI, guards |
| MCP integration | [@rekog/mcp-nest](https://github.com/rekog-labs/MCP-Nest) | Native `@Tool()`, `@Prompt()`, `@Resource()` decorators |
| MCP SDK | [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/typescript-sdk) | Reference implementation |
| Validation | [Zod](https://zod.dev) | Runtime schema validation for tool inputs |
| Transpile | [SWC](https://swc.rs) | ~100ms builds with decorator metadata |
| Type check | TypeScript `tsc --noEmit` | Strict type checking in CI |
| Lint / format | [Biome](https://biomejs.dev) 2.4 | Fast, all-in-one |

## Directory structure

```
src/
├── main.ts                         # Entry point — transport selection
├── app.module.ts                   # NestJS root module (AppModule.forTransport)
│
├── generated/                      # Auto-generated from Boond JSON schemas
│   ├── boond-schemas.ts            # Raw types from json-schema-to-typescript
│   ├── helpers.ts                  # BoondListResponse, attribute type extraction
│   └── index.ts                    # Barrel export
│
├── modules/
│   ├── boond/                      # HTTP client + JWT auth (@Global module)
│   │   ├── boond.client.ts         # BoondClient with retry, content-type guards
│   │   ├── boond.module.ts         # Provider factory with env validation
│   │   └── boond.types.ts          # JSON:API base types
│   │
│   ├── resources/                  # one directory per Boond domain
│   ├── candidates/
│   ├── projects/
│   ├── ...                         # 21 domain modules total
│   │
│   └── mcp-extras/                 # MCP Prompts and Resources (not tools)
│       ├── prompts.ts              # @Prompt decorators
│       └── resources.ts            # @Resource decorators
│
└── utils/
    ├── constants.ts                # DEFAULT_PAGE_SIZE, MAX_FETCH_ALL_RESULTS
    ├── error-handler.ts            # HTTP status → LLM-friendly messages
    ├── formatters.ts               # JSON:API → concise output
    ├── list-tool-helper.ts         # executeListTool() — shared list pattern
    ├── pagination.ts               # fetchAllPages() with safety cap
    ├── retry.ts                    # withRetry() exponential backoff
    └── write-tool-helper.ts        # executeCreateTool / Update / Delete
```

## Request flow (stdio)

```
Claude Desktop           MCP Server                BoondManager API
      │                       │                           │
      │  initialize           │                           │
      │──────────────────────>│                           │
      │                       │  (load env + DI graph)    │
      │                       │                           │
      │  list_tools           │                           │
      │──────────────────────>│                           │
      │  <── 45 tools         │                           │
      │                       │                           │
      │  call_tool            │                           │
      │  {name:"list_         │                           │
      │   resources"}         │                           │
      │──────────────────────>│                           │
      │                       │  BoondClient.get()        │
      │                       │  (JWT signed header)      │
      │                       │──────────────────────────>│
      │                       │  (retry on 429/5xx)       │
      │                       │  <── JSON:API response    │
      │                       │                           │
      │                       │  formatList()             │
      │                       │  (flatten attributes)     │
      │                       │                           │
      │  <── tool response    │                           │
      │                       │                           │
```

## Module pattern

Every domain module follows the same 2-file pattern:

**`<module>.tools.ts`** — Injectable service with `@Tool()` decorated methods.
**`<module>.module.ts`** — NestJS `@Module()` registering the service as a provider.

Example for a read-only module:
```typescript
@Injectable()
export class ResourcesTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({ name: "list_resources", description: "...", parameters: z.object(...) })
  async listResources(params) {
    return executeListTool<ResourceAttributes>(this.boond, config, params);
  }
}
```

Adding a new module requires:
1. Run `npm run generate-types` to refresh types from Boond schemas
2. Create `src/modules/<name>/<name>.tools.ts` + `<name>.module.ts`
3. Register `<Name>Module` in `src/app.module.ts`

## Key design decisions

### Why NestJS?
Dependency injection keeps `BoondClient` (and its auth state) as a singleton, injected cleanly into every module. Adding a new tool never requires touching the root `McpServer` instance.

### Why @rekog/mcp-nest over hand-rolled SDK wrapper?
It provides `@Tool`, `@Resource`, `@Prompt` decorators that integrate with NestJS's metadata system. Without it, we'd have to manually register every tool on the MCP server at bootstrap.

### Why SWC instead of tsc for builds?
SWC preserves decorator metadata (critical for NestJS DI) while being ~20x faster than tsc for transpilation. `tsc --noEmit` still runs in CI for strict type checking.

### Why a separate `executeListTool` helper?
All 24 list tools had duplicate code for pagination, error handling, and formatting. The shared helper reduces the average tool to ~40 lines and enforces consistent behavior.

### Why generate types from Boond JSON schemas?
The Boond API returns JSON:API responses with hundreds of attributes per entity. Generating types from the official schemas means:
- Tool attributeKeys are validated by the compiler
- Schema changes in Boond are detected at build time
- No manual type maintenance

## See also

- [authentication.md](./authentication.md) — JWT and Basic Auth setup
- [transports.md](./transports.md) — stdio vs HTTP configuration
- [tools.md](./tools.md) — complete tool reference
- [deployment.md](./deployment.md) — production deployment
- [troubleshooting.md](./troubleshooting.md) — common issues
