FROM node:22-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN --mount=type=cache,target=/root/.npm \
  npm ci --ignore-scripts --no-audit --no-fund

FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json ./
COPY prisma.config.ts ./
COPY tsconfig.json tsconfig.build.json ./
COPY src ./src

ENV POSTGRES_URL=postgresql://build:build@localhost:5432/build
RUN npm run db:generate

ENV NODE_ENV=production
ENV APP_PORT=3000
RUN npm run build

FROM node:22-alpine AS runner

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 expressjs

WORKDIR /app

ENV NODE_ENV=production
ENV APP_PORT=3000

COPY package.json package-lock.json prisma.config.ts ./
COPY --from=builder /app/src/prisma ./src/prisma

RUN --mount=type=cache,target=/root/.npm \
  npm ci --omit=dev --ignore-scripts --no-audit --no-fund \
  && npm install prisma@7.10.0 --no-save --ignore-scripts --no-audit --no-fund \
  && npm cache clean --force

COPY --from=builder --chown=expressjs:nodejs /app/dist ./dist
COPY --from=builder --chown=expressjs:nodejs /app/src/prisma/generated ./src/prisma/generated

RUN chown -R expressjs:nodejs /app

USER expressjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null "http://127.0.0.1:${APP_PORT}/api/v1/health-checks" || exit 1

CMD ["sh", "-c", "npm run db:migrate:deploy && npm run start:prod"]
