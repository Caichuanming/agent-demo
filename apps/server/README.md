# @project/server

最小可运行 NestJS 服务端骨架，当前实现目标：

- `POST /chat`
- 输入 `{ message: string }`
- rule-based agent 决策（fake LLM）
- 调用 `getOrder` / `getDoctor` tool
- 返回结构化 `ApiResult<ChatResponse>`

## 目录说明

```txt
src/
  app.module.ts
  main.ts
  common/
  config/
  chat/      # controller + 应用编排 service
  agent/     # fake/rule adapter + decision service
  tools/     # tool registry + tools
  domain/    # mock 业务服务
```

## 启动

1. 在仓库根目录安装依赖：

```bash
pnpm install
```

2. 启动 server（开发模式）：

```bash
pnpm --filter @project/server dev
```

3. 请求示例：

```bash
curl -X POST http://localhost:3001/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"帮我查一下订单 123456"}'
```

## 规则说明

- 文本包含“订单” -> `getOrder`
- 文本包含“医生” -> `getDoctor`
- 其他 -> 默认回复

## 扩展预留（已在结构上预留）

- 真实 LLM：`agent` 层可替换 adapter
- MySQL / Redis：`domain` 与 `config` 可接入真实存储
- Agent 执行日志：可在 `chat.service` 与 `tools-registry` 增加日志切面
- 流式响应：后续可在 controller 增加 SSE / chunked response
