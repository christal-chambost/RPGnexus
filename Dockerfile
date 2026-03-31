# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Generate Prisma client and build
RUN pnpm prisma generate
RUN pnpm run build

# Production stage
FROM node:22-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files and install production dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# Copy prisma files and generate client in production stage
COPY prisma ./prisma
COPY prisma.config.ts ./prisma.config.ts
RUN pnpm prisma generate

# Copy built application from builder
COPY --from=builder /app/.next ./.next
RUN mkdir -p ./public
COPY --from=builder /app/public ./public

# Expose port
EXPOSE 3000

# Run migrations then start
CMD ["sh", "-c", "pnpm prisma migrate deploy && pnpm start"]
