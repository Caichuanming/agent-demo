# Agent Medical Assistant (MVP)

最小可运行目标：先跑通链路（用户输入 -> Agent 决策 -> Tool 调用 -> 业务服务 -> 返回结果）。

## 项目结构

```txt
project-root/
  apps/
    web/
    server/
  packages/
    shared/
  docker-compose.yml
  package.json
  README.md
```

## 本地启动（不使用 Docker）

1. 安装依赖

```bash
pnpm install
```

2. 启动 server

```bash
pnpm --filter @project/server dev
```

3. 启动 web（新终端）

```bash
pnpm --filter @project/web dev
```

4. 打开页面

- Web: `http://localhost:3000`
- Server: `http://localhost:3001/chat`

## Docker 启动

```bash
docker compose up --build
```

启动后：

- Web: `http://localhost:3000`
- Server: `http://localhost:3001`
- MySQL: `localhost:3306`
- Redis: `localhost:6379`

## 完整启动命令顺序

```bash
cp .env.example .env
pnpm install
pnpm --filter @project/shared build
pnpm --filter @project/server dev
pnpm --filter @project/web dev
```

或一条 Docker 命令：

```bash
docker compose up --build
```

## fake LLM -> 真实 LLM 替换说明

当前 `apps/server/src/agent/adapters/fake-rule-agent.adapter.ts` 负责关键词规则。
后续替换步骤：

1. 新增 `openai-agent.adapter.ts`（实现 shared 中 `AgentModelAdapter`）。
2. 在 `AgentService` 中按 `mode=llm/auto` 选择真实 adapter。
3. 保持 `AgentDecision`、`ToolCall`、`ChatResponse` 契约不变，前端无需改动。
4. 增加超时、重试、限流和日志；必要时把 tool call 改为流式输出。

## 项目启动检查清单

- [ ] `pnpm install` 成功
- [ ] `@project/shared` 可正常被 `web/server` 引用
- [ ] `POST http://localhost:3001/chat` 返回 `ApiResult<ChatResponse>`
- [ ] 页面可发送消息并显示后端 `answer`
- [ ] `docker compose up --build` 可拉起 `web/server/mysql/redis`
- [ ] server 环境变量中可看到 `MYSQL_*` 与 `REDIS_*`
