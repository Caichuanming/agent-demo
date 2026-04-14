FROM node:20.20.2

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY apps/server/package.json apps/server/package.json
COPY packages/shared/package.json packages/shared/package.json

RUN pnpm install --frozen-lockfile --filter @project/server...

COPY apps/server apps/server
COPY packages/shared packages/shared

EXPOSE 3001

CMD ["pnpm", "--filter", "@project/server", "dev"]
