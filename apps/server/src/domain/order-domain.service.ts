import { Injectable } from "@nestjs/common";

import type { GetOrderArgs, Order } from "@project/shared";

@Injectable()
export class OrderDomainService {
  async findOrder(args: GetOrderArgs): Promise<Order> {
    const orderNo = args.orderNo ?? "MOCK20260414001";

    return {
      id: "order_mock_1",
      orderNo,
      patientName: args.patientName ?? "张三",
      amountCny: 128.5,
      status: "paid",
      createdAt: new Date().toISOString()
    };
  }
}
