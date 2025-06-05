#!/bin/bash

# Build script for study-monorepo
# Builds packages in dependency order

set -e  # Exit on any error

echo "🚀 Starting build process..."

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_step() {
    echo -e "${BLUE}📦 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Clean previous builds
print_step "Cleaning previous builds..."
pnpm --recursive exec rm -rf dist

# Step 1: Build auth package (no dependencies)
print_step "Building @study-monorepo/auth..."
if pnpm --filter @study-monorepo/auth build; then
    print_success "Auth package built successfully"
else
    print_error "Failed to build auth package"
    exit 1
fi

# Step 2: Build framework packages (depend on external libraries only)
print_step "Building framework packages..."
if pnpm --filter @study-monorepo/vue build && pnpm --filter @study-monorepo/react build; then
    print_success "Framework packages built successfully"
else
    print_error "Failed to build framework packages"
    exit 1
fi

# Step 3: Build web app (depends on all packages)
print_step "Building @study-monorepo/web..."
if pnpm --filter @study-monorepo/web build; then
    print_success "Web app built successfully"
else
    print_error "Failed to build web app"
    exit 1
fi

print_success "🎉 All packages built successfully!"

# Optional: Show build output sizes
print_step "Build output summary:"
echo "📁 packages/auth/dist:"
ls -la packages/auth/dist/ 2>/dev/null || echo "  No dist directory"

echo "📁 packages/vue/dist:"
ls -la packages/vue/dist/ 2>/dev/null || echo "  No dist directory"

echo "📁 packages/react/dist:"
ls -la packages/react/dist/ 2>/dev/null || echo "  No dist directory"

echo "📁 apps/web/dist:"
ls -la apps/web/dist/ 2>/dev/null || echo "  No dist directory"

echo ""
print_success "Build completed! 🚀"