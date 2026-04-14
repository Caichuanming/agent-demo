import { randomUUID } from "node:crypto";

import type { ApiError, ApiMeta, ApiResult } from "@project/shared";

function createMeta(): ApiMeta {
  return {
    requestId: randomUUID(),
    timestamp: new Date().toISOString(),
    version: process.env.APP_VERSION ?? "v1"
  };
}

export function ok<T>(data: T): ApiResult<T> {
  return {
    success: true,
    data,
    meta: createMeta()
  };
}

export function fail<T = never>(error: ApiError): ApiResult<T> {
  return {
    success: false,
    error,
    meta: createMeta()
  };
}
