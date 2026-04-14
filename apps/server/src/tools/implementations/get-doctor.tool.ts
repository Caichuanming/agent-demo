import { Injectable } from "@nestjs/common";

import type { Doctor, GetDoctorArgs } from "@project/shared";

import { DoctorDomainService } from "../../domain/doctor-domain.service.js";
import type { ToolHandler } from "../tool-handler.interface.js";

@Injectable()
export class GetDoctorTool implements ToolHandler<"getDoctor"> {
  readonly name = "getDoctor" as const;

  constructor(private readonly doctorDomain: DoctorDomainService) {}

  async execute(args: GetDoctorArgs): Promise<Doctor> {
    return this.doctorDomain.findDoctor(args);
  }
}
