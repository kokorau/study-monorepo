#!/bin/bash

# Development script for study-monorepo
# Builds packages and starts dev server

set -e

echo "🔧 Setting up development environment..."

# Color codes
BLUE='\033[0;34m'
GREEN='\033[0;32m'
NC='\033[0m'

print_step() {
    echo -e "${BLUE}📦 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Build packages first
print_step "Building packages..."
pnpm --filter @study-monorepo/auth build
pnpm --filter @study-monorepo/vue build  
pnpm --filter @study-monorepo/react build

print_success "Packages built successfully!"

# Start dev server
print_step "Starting development server..."
pnpm --filter @study-monorepo/web dev