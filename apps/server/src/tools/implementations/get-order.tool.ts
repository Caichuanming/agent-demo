import { Injectable } from "@nestjs/common";

import type { GetOrderArgs, Order } from "@project/shared";

import { OrderDomainService } from "../../domain/order-domain.service.js";
import type { ToolHandler } from "../tool-handler.interface.js";

@Injectable()
export class GetOrderTool implements ToolHandler<"getOrder"> {
  readonly name = "getOrder" as const;

  constructor(private readonly orderDomain: OrderDomainService) {}

  async execute(args: GetOrderArgs): Promise<Order> {
    return this.orderDomain.findOrder(args);
  }
}
