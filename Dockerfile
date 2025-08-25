# --- Stage 1: Build the application ---
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Install deps for pnpm
RUN apk add --no-cache libc6-compat

# Install pnpm globally
RUN npm install -g pnpm

# Copy dependency files and install
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile

# Copy source and generate Prisma client
COPY . .
RUN pnpm prisma generate

# Build the NestJS app
RUN pnpm run build


# --- Stage 2: Production image ---
FROM node:20-alpine

WORKDIR /usr/src/app

# Minimal runtime dependencies
RUN npm install -g pnpm
# Copy built artifacts and runtime deps only
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /usr/src/app/prisma ./prisma

EXPOSE 8000

# By default just start the app (docker-compose overrides this)
CMD ["pnpm", "run", "start:dev"]
