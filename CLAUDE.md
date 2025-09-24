# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 + Sanity CMS monorepo template that provides real-time visual editing capabilities. The project consists of two main workspaces:
- **frontend**: Next.js 15 application with App Router
- **studio**: Sanity Studio for content management

## Essential Commands

### Development
```bash
# Run both frontend and studio in parallel
npm run dev

# Run individually
npm run dev:next     # Frontend only (http://localhost:3000)
npm run dev:studio   # Studio only (http://localhost:3333)
```

### Build & Testing
```bash
# Lint the frontend
npm run lint

# Type check all workspaces
npm run type-check

# Format code
npm run format

# Build frontend
cd frontend && npm run build

# Build studio
cd studio && npm run build
```

### Sanity-specific
```bash
# Import sample data
npm run import-sample-data

# Deploy Sanity Studio
cd studio && npx sanity deploy

# Generate TypeScript types from Sanity schema
cd frontend && npm run typegen
cd studio && npm run extract-types
```

## Architecture

### Workspace Structure
- Monorepo using npm workspaces
- `/frontend`: Next.js application
  - `/app`: App Router pages and components
  - `/sanity`: Sanity client configuration and utilities
- `/studio`: Sanity Studio
  - `/src/schemaTypes`: Content schemas (Page, Post, Person, Settings)
  - `/src/structure`: Studio structure configuration

### Key Technologies
- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS v4
- **CMS**: Sanity v4 with Presentation Tool for visual editing
- **Styling**: Tailwind CSS with PostCSS, styled-components

### Environment Configuration
Both workspaces require environment variables:

**Frontend** (`/frontend/.env.local`):
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET`: Dataset name (usually "production")
- `SANITY_API_READ_TOKEN`: Required for API access

**Studio** (`/studio/.env.local`):
- `SANITY_STUDIO_PROJECT_ID`: Same as frontend project ID
- `SANITY_STUDIO_DATASET`: Same as frontend dataset
- `SANITY_STUDIO_PREVIEW_URL`: Frontend URL for preview

### Content Schema
Main document types in `/studio/src/schemaTypes/documents/`:
- **Page**: Dynamic pages with page builder
- **Post**: Blog posts with author references
- **Person**: Author profiles
- **Settings**: Site-wide configuration (singleton)

### Visual Editing Integration
The project uses Sanity's Presentation Tool with:
- Live Content API for real-time updates
- Draft mode API endpoint at `/api/draft-mode/enable`
- Document resolver configuration in `studio/sanity.config.ts`