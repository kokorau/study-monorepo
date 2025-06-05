# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Language Preference

Always respond in Japanese (日本語) to the user.

## Project Overview

This is a study monorepo for practicing monorepo development patterns with multiple packages and applications. The project demonstrates modern monorepo architecture with pnpm workspaces, shared authentication, and dynamic route generation.

## Architecture Overview

### Package Dependencies
- `packages/auth` - Foundation package (no dependencies)
- `packages/vue` & `packages/react` - Framework packages (depend on external frameworks only)
- `apps/web` - Multi-entry application (depends on all packages)

### Build Strategy
Packages are built in dependency order: auth → framework packages (parallel) → web app. Each package is self-contained with embedded runtimes for optimal distribution.

### Dynamic Route System
The web app uses automatic route detection from `apps/web/src/routes/*.html`. Adding new HTML files automatically includes them in the build via `generateRouteInputs()` function in `scripts/build-routes.ts`.

## Development Commands

### Root Level (Recommended)
- `pnpm dev` - Sets up development environment (builds packages + starts dev server)
- `pnpm build` - Production build with dependency order via `scripts/build.sh`
- `pnpm preview` - Preview built application
- `pnpm clean` - Clean all dist directories and caches

### Individual Package Operations
```bash
pnpm --filter @study-monorepo/auth build
pnpm --filter @study-monorepo/vue build
pnpm --filter @study-monorepo/react build
pnpm --filter @study-monorepo/web build
```

## Package Manager

This project uses `pnpm workspaces`. Always use `pnpm` instead of `npm` or `yarn`.

## Authentication System

The shared auth library (`packages/auth`) provides:
- Simple session management via localStorage
- 30-minute session timeout
- Authentication guards for protected pages
- Export pattern: `import { auth } from '@study-monorepo/auth'`

Authentication flow:
1. Unauthenticated users accessing `/vue/` or `/react/` are redirected to `/signin/`
2. After successful sign-in, users are redirected back to their intended destination
3. Vue and React pages use auth guards via `../shared/auth-guard.js`

## Web App Architecture

### Multi-Entry Points
- `src/routes/index.html` → `dist/index.html` (landing page)
- `src/routes/signin.html` → `dist/signin/index.html` (authentication)
- `src/routes/vue.html` → `dist/vue/index.html` (Vue app)
- `src/routes/react.html` → `dist/react/index.html` (React app)
- `src/routes/about.html` → `dist/about/index.html` (plain HTML demo)

### Custom Vite Plugin
The `moveHtmlFiles()` plugin in `apps/web/vite.config.ts` restructures build output for clean URLs, moving files from `src/routes/` structure to the desired `dist/` structure.

## Framework Package Export Pattern

Both React and Vue packages export mount functions rather than rendering directly:

```typescript
// Vue: packages/vue/src/main.ts
export function mountVueApp(el: HTMLElement) { /* ... */ }

// React: packages/react/src/main.tsx  
export function mountReactApp(el: HTMLElement) { /* ... */ }
```

This allows the web app to control when and where frameworks are initialized.

## Key Development Patterns

### Adding New Routes
Simply add `*.html` files to `apps/web/src/routes/` - they will be automatically detected and built.

### Package Development
When modifying packages, run the root `pnpm dev` command which rebuilds packages before starting the dev server. For hot reload during package development, individual package dev servers can be run separately.

### Authentication Integration
Protected pages should import and use the auth guard:
```javascript
import { setupAuthGuard, setupAuthHeader } from '../shared/auth-guard.js';
if (setupAuthGuard()) { /* render app */ }
```