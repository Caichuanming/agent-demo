FROM node:20.20.2

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY apps/web/package.json apps/web/package.json
COPY packages/shared/package.json packages/shared/package.json

RUN pnpm install --frozen-lockfile --filter @project/web...

COPY apps/web apps/web
COPY packages/shared packages/shared

EXPOSE 3000

CMD ["pnpm", "--filter", "@project/web", "dev"]
