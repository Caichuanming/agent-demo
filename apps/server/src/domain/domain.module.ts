import { Module } from "@nestjs/common";

import { DoctorDomainService } from "./doctor-domain.service.js";
import { OrderDomainService } from "./order-domain.service.js";

@Module({
  providers: [OrderDomainService, DoctorDomainService],
  exports: [OrderDomainService, DoctorDomainService]
})
export class DomainModule {}
