# Contributing

Thanks for your interest in contributing to the BoondManager MCP Server. This guide covers the development workflow and conventions.

## Setup

```bash
git clone git@github.com:Ninhache/MCP-Boondmanager.git
cd MCP-Boondmanager
npm install
cp .env.example .env   # fill in Boond credentials
npm run dev            # runs with tsx watch
```

## Workflow

1. **Create a feature branch** from `main`: `feat/my-feature`, `fix/something`, `chore/task`, or `docs/topic`
2. **Make your changes** with small, logical commits
3. **Run checks locally**:
   ```bash
   npm run check       # biome lint + format
   npm run typecheck   # tsc --noEmit
   npm run build       # SWC build
   ```
4. **Open a PR** against `main` — CI runs lint + build + typecheck
5. **Review**: PRs get a code review before merge. Use `@reviewer` for substantial changes.
6. **Merge**: squash merge after CI is green and review is clean

## Branch protection

- `main` is protected: no direct pushes, no force-push, no deletion
- All PRs must pass the 3 CI checks (Lint, Build, Type check)
- Use `gh pr merge --squash --delete-branch`

## Commit conventions

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat: …` — new feature
- `fix: …` — bug fix
- `chore: …` — tooling, deps, config
- `docs: …` — documentation only
- `refactor: …` — code change that neither adds a feature nor fixes a bug
- `test: …` — tests

Reference issues/PRs when relevant: `feat(actions): add delete_action (closes #32)`

## Code style

- **Biome** handles all formatting + linting. Run `npm run check:fix` to auto-fix.
- **Pre-commit hook** (husky + lint-staged) runs Biome on staged files automatically
- Code is strict TypeScript — no `any`, no implicit types, no ignored type errors
- French tool descriptions (user-facing), English code comments

## Adding a new module

1. **Add the module to the type generator**:
   ```typescript
   // scripts/generate-types.ts
   const MODULES = [
     // ... existing
     "my-new-module",
   ];
   ```
2. **Regenerate types**: `npm run generate-types`
3. **Add attribute type to `src/generated/helpers.ts`**:
   ```typescript
   export type MyNewModuleAttributes = ExtractAttributes<SchemasMyNewModuleSearchJson>;
   ```
4. **Create the module files**:
   - `src/modules/my-new-module/my-new-module.tools.ts` (read `companies.tools.ts` as a reference)
   - `src/modules/my-new-module/my-new-module.module.ts`
5. **Register in `src/app.module.ts`**
6. **Run `npm run typecheck` and `npm run build`**
7. **Add an entry in `docs/tools.md`**

## Adding a new tool to an existing module

1. Add the `@Tool()` decorated method to the module's `<module>.tools.ts`
2. Use `executeListTool` for list operations, `executeCreateTool`/`executeUpdateTool`/`executeDeleteTool` for writes
3. Write tools require `annotations: { readOnlyHint: false, destructiveHint: true|false }`
4. Add a French description with an example user question
5. Update `docs/tools.md`

## Testing

The project currently has **no automated tests** — this is a known gap (tracked in an issue). Until tests are added:

1. **Manual test via MCP Inspector**:
   ```bash
   npm run build
   npx @modelcontextprotocol/inspector node dist/main.js
   ```
3. **Manual test via Claude Code**:
   ```bash
   claude mcp add boond -- node $(pwd)/dist/main.js
   ```

## Release / publish

The project is not yet published to npm. See [deployment.md](./docs/deployment.md) for self-hosting.

## Getting help

- Check [docs/](./docs/) first — architecture, auth, transports, troubleshooting
- Browse [existing issues](https://github.com/Ninhache/MCP-Boondmanager/issues)
- Open a new issue if you're stuck

## Code of conduct

Be kind. Review feedback should be technical, not personal. We're all here to build something useful.
