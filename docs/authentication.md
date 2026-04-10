# Authentication

BoondManager supports three authentication modes. The MCP server supports all three via the `BOOND_AUTH_MODE` environment variable.

## Mode comparison

| Mode | Use case | Setup complexity | Recommended for |
|------|----------|------------------|-----------------|
| `basic` | Personal account, quick dev | ⭐ Simple | Local development |
| `jwt` (normal) | User-scoped operations | ⭐⭐ Moderate | Production user access |
| `jwt` (god) | Admin / cross-tenant | ⭐⭐⭐ Complex | Admin scripts, migrations |

## Basic Auth

The simplest mode. Uses HTTP Basic with your BoondManager username and password.

### Enable in Boond
1. Log into BoondManager
2. Click your avatar → **Configuration**
3. Enable **"Allow API Rest calls using BasicAuth authentication"**

### Configuration
```bash
BOOND_API_URL=https://ui.boondmanager.com/api
BOOND_AUTH_MODE=basic
BOOND_USERNAME=your.email@company.fr
BOOND_PASSWORD=your-boond-password
```

**Warning**: Basic Auth sends credentials on every request. Only use over HTTPS. Do not commit credentials.

## JWT (normal mode)

Signed JWT authentication scoped to a specific user. This is the recommended mode for production.

### Get the tokens

**User Token** — identifies the human user:
1. Log into Boond
2. **Mon compte → Configuration → Sécurité**
3. Copy the `User Token`

**App Token + App Key** — identifies your application:
1. **Admin → Espace développeur → API / Sandbox**
2. Create a new App registration
3. Copy the `App Token` and `App Key`

### Configuration
```bash
BOOND_API_URL=https://ui.boondmanager.com/api
BOOND_AUTH_MODE=jwt
BOOND_JWT_MODE=normal
BOOND_USER_TOKEN=<user-token>
BOOND_APP_TOKEN=<app-token>
BOOND_APP_KEY=<app-key>
```

### How it works
Each request generates a fresh JWT with:
- **Header**: `{"typ":"JWT","alg":"HS256"}`
- **Payload**: `{userToken, appToken, time, mode: "normal"}`
- **Signature**: HMAC-SHA256 with `BOOND_APP_KEY`

The JWT is sent as `X-Jwt-App-Boondmanager: <token>` header.

## JWT (god mode)

Elevated admin access. Use only for admin operations that need to act outside a specific user context (bulk imports, migrations, cross-tenant reads).

### Additional tokens

**Client Token + God Client Token** — from the OAuth install flow or Boond admin:
- **Client Token**: identifies the Boond client (organization)
- **God Client Token**: the signing key for god-mode JWTs

### Configuration
```bash
BOOND_API_URL=https://ui.boondmanager.com/api
BOOND_AUTH_MODE=jwt
BOOND_JWT_MODE=god
BOOND_USER_TOKEN=<user-token>
BOOND_APP_TOKEN=<app-token>
BOOND_APP_KEY=<app-key>
BOOND_CLIENT_TOKEN=<client-token>
BOOND_GOD_CLIENT_TOKEN=<god-client-token>
```

### How it works
In god mode, the JWT is signed with `BOOND_GOD_CLIENT_TOKEN` (not `BOOND_APP_KEY`), contains `clientToken` instead of `appToken`, and is sent as `X-Jwt-Client-Boondmanager: <token>`.

**Security**: God mode bypasses user-level permission checks. Restrict access to this mode carefully.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| 401 Unauthorized | Wrong credentials or expired token | Re-fetch User Token from Boond |
| 403 Forbidden | User lacks permission for the resource | Check role in Boond Admin |
| Invalid `authMode` | Typo in `BOOND_AUTH_MODE` | Must be exactly `basic` or `jwt` |
| Empty `BOOND_APP_KEY` | Missing env var | See configuration above |

## References

- [Boond API documentation](https://doc.boondmanager.com/api-externe/)
- Implementation: `src/modules/boond/boond.client.ts`
