#!/bin/bash

# Run Prisma migrations
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate

# Start Next.js development server
npm run dev