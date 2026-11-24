# ---- deps: install dependencies once, shared by dev and build stages ----
FROM node:22-slim AS deps

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# ---- dev: what docker-compose runs locally (hot reload via bind mount) ----
FROM deps AS dev

WORKDIR /app

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

# ---- builder: production build (standalone output, see next.config.ts) ----
FROM deps AS builder

WORKDIR /app

COPY . .
RUN npm run build

# ---- runner: minimal production image, no source/build toolchain ----
FROM node:22-slim AS runner

WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000

RUN groupadd --system --gid 1001 nodejs \
    && useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
