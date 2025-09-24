#!/bin/bash
set -e

# Set Sanity environment variables in Vercel
echo "Setting up environment variables in Vercel..."

# Use non-interactive method
echo "pyqdmhmt" | vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID production --force 2>/dev/null || true
echo "umcorg" | vercel env add NEXT_PUBLIC_SANITY_DATASET production --force 2>/dev/null || true
echo "2024-10-28" | vercel env add NEXT_PUBLIC_SANITY_API_VERSION production --force 2>/dev/null || true
echo "skytZko5xi5OAjcNGgZXYRfPMyO1YDVkIb2Ow1tNJj4j8PE1NAUBLf2IUbEa70B9B2ZaXQV31bWxw4qAjl7y9Y5VUDjooAlrUGaXKGgzdM8GKDxO0Inc5N63uKuPuJ16jqGqQVjvk5cm5u7sYR4oOS1rmeCHV9Qmu5rNSGUQ34XOBsoGOK06" | vercel env add SANITY_API_READ_TOKEN production --force 2>/dev/null || true

echo "Environment variables setup complete"
