# @project/web

最小可运行 Next.js 聊天页面（App Router + TypeScript）。

## 功能

- 输入框 + 发送按钮
- 消息列表
- 调用后端 `POST /chat`
- 显示结构化结果中的 `answer`

## 启动

在仓库根目录执行：

```bash
pnpm install
pnpm --filter @project/web dev
```

默认端口：`http://localhost:3000`

## 环境变量

- `NEXT_PUBLIC_API_BASE_URL`：后端地址，默认 `http://localhost:3001`
