# Troubleshooting

## Startup errors

### `BOOND_API_URL environment variable is required`
**Cause**: `.env` not loaded or `BOOND_API_URL` missing.
**Fix**: Copy `.env.example` to `.env` and fill in values. If running via a supervisor (systemd, PM2, Docker), make sure the env file is passed to the process.

### `Invalid BOOND_AUTH_MODE "xyz": must be "basic" or "jwt"`
**Cause**: Typo in `BOOND_AUTH_MODE`.
**Fix**: Must be exactly `basic` or `jwt` (lowercase, no quotes in .env).

### `Basic Auth requires BOOND_USERNAME and BOOND_PASSWORD`
**Cause**: `BOOND_AUTH_MODE=basic` but credentials missing.
**Fix**: Set both env vars, or switch to JWT mode.

### `JWT Auth requires BOOND_USER_TOKEN, BOOND_APP_TOKEN, and BOOND_APP_KEY`
**Cause**: `BOOND_AUTH_MODE=jwt` but one or more JWT tokens missing.
**Fix**: See [authentication.md](./authentication.md#jwt-normal-mode) to obtain all three tokens.

### `Invalid MCP_TRANSPORT "xyz": must be "stdio" or "http"`
**Cause**: Typo in `MCP_TRANSPORT`.
**Fix**: Must be exactly `stdio` or `http`.

### `Invalid MCP_HTTP_PORT "xyz": must be an integer in 1-65535`
**Cause**: `MCP_HTTP_PORT` not a valid port number.
**Fix**: Set to a positive integer between 1 and 65535. Default is 3001.

### `Invalid BOOND_MAX_RESULTS "xyz"`
**Cause**: `BOOND_MAX_RESULTS` is empty or non-numeric.
**Fix**: Must be a positive integer. Remove the variable to use the default (500).

## Runtime errors

### `Identifiants Boond invalides ou expirés` (401)
**Cause**: Credentials rejected by Boond.
**Fix**:
- Basic Auth: check username/password and that BasicAuth is enabled in Boond (Avatar → Configuration)
- JWT: re-fetch tokens from Boond (they may have expired). Tokens typically rotate when a user changes their password.

### `Accès refusé — vérifier les permissions du compte` (403)
**Cause**: The authenticated user lacks permission for the requested module.
**Fix**: Check the user's role in Boond Admin → Roles. Some modules (invoices, accounts) require admin permissions.

### `Ressource introuvable dans Boond` (404)
**Cause**: The ID doesn't exist, or the endpoint path is wrong.
**Fix**:
- Verify the ID exists via a list call first (e.g. `list_resources` before `get_resource`)
- Boond IDs are numeric and tenant-scoped — an ID from one tenant won't exist in another

### `Rate limit atteint — réessayer dans quelques secondes` (429)
**Cause**: Too many requests in a short time.
**Fix**: The server auto-retries with exponential backoff (see [retry](#retry-behavior) below). If you still hit this, reduce `fetchAll` usage or increase `BOOND_MAX_RETRIES`.

### `fetchAllPages expected array response from /xyz`
**Cause**: An endpoint returned a single object where a list was expected (API drift or wrong path).
**Fix**:
1. Check if Boond changed the response shape — regenerate types with `npm run generate-types`
2. If the endpoint is legitimately single-object, don't use `fetchAll` on it
3. Cross-reference the expected route shape in `docs/boond-routes.json`

## MCP client issues

### Claude Desktop doesn't see the tools
1. Check `~/.claude_desktop_config.json` syntax (valid JSON, absolute paths)
2. Restart Claude Desktop completely after editing config
3. Check Claude Desktop logs: `~/Library/Logs/Claude/mcp-server-boond.log` (macOS)
4. Run the command manually: `node /absolute/path/to/dist/main.js` — it should wait for input without crashing

### Claude Code `mcp list` shows `failed to connect`
1. Run `node dist/main.js` in a terminal and confirm it doesn't exit with an error
2. Check env vars are set in the same shell or in the MCP config
3. Try stdio mode explicitly: `MCP_TRANSPORT=stdio node dist/main.js`

### MCP Inspector shows "Tool call failed"
1. Open the browser dev console and check the response payload
2. The error is usually a Boond API error with the real message in the `content` field
3. Common: 401 (credentials) or missing required parameter (Zod validation)

### n8n can't connect to HTTP endpoint
1. Verify the server is actually listening: `curl -X POST http://localhost:3001/mcp`
2. Check `MCP_HTTP_HOST` — if set to `127.0.0.1`, n8n on another host can't reach it
3. If `MCP_HTTP_SECRET` is set, n8n must send `Authorization: Bearer <secret>`
4. Check firewall rules

## Build issues

### SWC build fails with "decorator metadata not emitted"
**Cause**: `.swcrc` misconfigured.
**Fix**: Ensure `.swcrc` has:
```json
{
  "jsc": {
    "transform": {
      "legacyDecorator": true,
      "decoratorMetadata": true
    }
  }
}
```

### `tsc --noEmit` fails but `npm run build` succeeds
**Cause**: SWC is less strict than tsc — the build output is wrong.
**Fix**: Run `npm run typecheck` in CI (already configured). Fix the type errors it reports.

### Biome complains about generated files
**Cause**: `src/generated/boond-schemas.ts` has generated artifacts.
**Fix**: Already handled — `biome.json` scopes to `src/**` which includes generated. The generated header has `/* eslint-disable */` which Biome respects. If this breaks, re-run `npm run generate-types`.

## Retry behavior

The BoondClient auto-retries on:
- **429** Rate Limit (respects `Retry-After` header)
- **502/503/504** Server errors
- **Network errors** (no HTTP status)

Configurable via `BOOND_MAX_RETRIES` (default 3). Backoff: 1s → 2s → 4s → 8s (capped at 30s).

The following are **not** retried (business errors):
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 422 Unprocessable Entity
- 500 Internal Server Error (too generic, might be a real bug in the payload)

## Getting more diagnostic info

Check generated types are up to date:
```bash
npm run generate-types
git diff src/generated/
```

If there's a diff, Boond changed their schema — commit the updated types and adjust any affected tools.

## Still stuck?

1. Check the [open issues](https://github.com/Ninhache/MCP-Boondmanager/issues)
2. Open a new issue with:
   - The full error message
   - Steps to reproduce
   - Output of `node --version` and `npm --version`
   - Contents of your `.env` (with secrets redacted)
